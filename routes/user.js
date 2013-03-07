var users = [
    {
        "FirstName": "Matt",
        "LastName": "Jenkins",
        "Username": "matt",
        "Password": "123",
        "Phone": "810-200-3636"
    },
    {
        "FirstName": "Jade",
        "LastName": "Connor",
        "Username": "jade",
        "Password": "456",
        "Phone": "810-300-4636"
    },
    {
        "FirstName": "Jack",
        "LastName": "Black",
        "Username": "jack",
        "Password": "789",
        "Phone": "810-201-3646"
    }
];

exports.list = function(req, res) {
    res.render('users', {"users": users, "title": "Members"});
};

exports.verify = function(req, res) {
    if((req.body.username == "admin") && (req.body.password == "admin123456")) {
        res.render('users', {"users": users, "title": "Members"});
    }
    res.send("Oops! Wrong username or password, please check them again.");
};