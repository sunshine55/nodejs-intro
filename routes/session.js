var hash = require('./pass').hash;

var users = {
    admin: { name: 'admin' }
};

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)
hash('admin123456', function(err, salt, hash){
    if (err) throw err;
    // store the salt & hash in the "db"
    users.admin.salt = salt;
    users.admin.hash = hash;
});

// Authenticate using our plain-object database of doom!
function authenticate(name, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);
    var user = users[name];
    // query the db for the given username
    if (!user) return fn(new Error('cannot find user'));
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we
    // found the user
    hash(pass, user.salt, function(err, hash){
        if (err) return fn(err);
        if (hash == user.hash) return fn(null, user);
        fn(new Error('invalid password'));
    })
};

exports.restrict = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.render('403');
    }
};

exports.login = function(req, res) {
    authenticate(req.body.username, req.body.password, function(err, user){
        if (user) {
            // Regenerate session when signing in
            // to prevent fixation
            req.session.regenerate(function(){
                // Store the user's primary key
                // in the session store to be retrieved,
                // or in this case the entire user object
                req.session.user = user;
                res.redirect('/users');
            });
        } else {
            req.session.error = 'Authentication failed, please check your Username and Password';
            res.redirect('/');
        }
    });
};

exports.logout = function(req, res, next) {
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(function(){
        res.redirect('/');
    });
};