var users = [];

var User = function(firstname, lastname, phone, username, password) {
    this.Firstname = firstname;
    this.Lastname = lastname;
    this.Phone = phone;
    this.Username = username;
    this.Password = password;
};

/*Cloudant connection*/
var cradle = require('cradle');
var c = new(cradle.Connection)(
    'https://tonywu90.cloudant.com',
    443,
    {
        secure: true,
        auth: { username: 'rustspellyaressezenentom', password: 'MwRWHCIG0KpGCVmeKkeACAEW' }
    }
);
var db = c.database('member');

/*Localhost connection*/
//var cradle = require('cradle');
//var db = new(cradle.Connection)().database('member');

/*CRUD*/
db.view('member/all', function(err, res) {
    if(!err){
        res.forEach(function(row) {
            users.push(new User(row.firstname, row.lastname, row.phone, row.username, row.password));
        });
    } else {
        console.log(err.message);
    }
});

exports.list = function(req, res) {
    res.render('users', {"users": users, "title": "Members"});
};