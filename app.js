var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , product = require('./routes/product')
    , session = require('./routes/session')
    , http = require('http')
    , path = require('path');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('secretcookie'));
    app.use(express.session());
    app.use(function(req, res, next){
        var err = req.session.error;
        delete req.session.error;
        delete req.session.success;
        res.locals.message = 'Please login with your Username and Password.';
        if (err) res.locals.message = err;
        next();
    });
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/session/login', session.login);
app.get('/session/logout', session.logout);
app.get('/products', session.restrict, product.list);
app.get('/profile', session.restrict, user.profile);
app.get('/users/:id/delete', session.restrict, user.delete);
app.post('/users/:id/edit', session.restrict, user.edit);
app.get('/users', session.restrict, user.list);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});