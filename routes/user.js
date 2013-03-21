var users = [];
var lookup = {};

var User = function(id, firstname, lastname, phone, username, password, rev) {
    this.Id = id;
    this.Firstname = firstname;
    this.Lastname = lastname;
    this.Phone = phone;
    this.Username = username;
    this.Password = password;
    this.Rev = rev;
};

/*Cloudant connection*/
var cradle = require('cradle');
var c = new(cradle.Connection)(
    'https://tonywu90.cloudant.com',
    443,
    {
        secure: true,
        auth: { username: 'tonstinksheyourniessinge', password: 'PUuPs0Sv3CB4wlPAcn21xDyf' }
    }
);
var db = c.database('member');

/* Localhost conneciton */
//var cradle = require('cradle');
//var db = new(cradle.Connection)().database('member');

exports.list = function(req, res) {
    db.view('member/all', function(err, dbres) {
        if(!err) {
            users = lookup = [];
            dbres.forEach(function(row) {
                var user = new User(row.id, row.firstname, row.lastname, row.phone, row.username, row.password, row.rev);
                users.push(user);
                lookup[user.Id] = user;
            });
            res.render('users', { title: 'Members', users: users});
        } else {
            console.log(err.message);
        }
    });
};

exports.delete = function(req, res) {
    var user = lookup[req.params.id];
    db.remove(user.Id, user.Rev, function (err) {
        if(!err) {
    		res.redirect('/users');
        } else {
            console.log(err.message);
        }
    });
};