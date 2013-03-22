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
        auth: { username: 'lfaingusheargaingeshdrel', password: 'xEKSRHXSveDk3Wi8nINushVH' }
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

exports.profile = function(req, res) {
    var user = lookup[req.params.id];
    res.render('profile', { title: 'Member Profile', user: user });
};

exports.edit = function(req, res) {
    var id = req.params.id;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var phone = req.body.phone;
    var username = req.body.username;
    var password = req.body.password;
    var new_user = { firstname: firstname, lastname: lastname, phone: phone, username: username, password: password };
    db.merge(id, new_user, function (err) {
        if(!err) {
            res.redirect('/users');
        } else {
            res.send(err.message);
        }
    });
};