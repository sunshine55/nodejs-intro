//var products = [];
//
//var Product = function(id, item, image, price) {
//    this.Id = id;
//    this.Item = item;
//    this.Image = image;
//    this.Price = price;
//};
//
///*Cloudant connection*/
//var cradle = require('cradle');
//var c = new(cradle.Connection)(
//    'https://tonywu90.cloudant.com',
//    443,
//    {
//        secure: true,
//        auth: { username: 'timsedisraceinglitenglan', password: 'f0UegysQUGvyyASi581fqqts' }
//    }
//);
//var db = c.database('products');
//
///*Localhost connection*/
////var cradle = require('cradle');
////var db = new(cradle.Connection)().database('product');
//
//exports.list = function(req, res) {
//    db.view('product/all', function(err, docs) {
//        if(!err){
//            docs.forEach(function(doc) {
//                products.push(new Product(doc.id, doc.item, doc.image, doc.price));
//            });
//            res.render('products', { title: 'Products', products: products });
//        } else {
//            res.send(err.message);
//        }
//    });
//};

var products = [];
var mongodb = null;

var Product = function(id, item, image, price) {
    this.Id = id;
    this.Item = item;
    this.Image = image;
    this.Price = price;
};

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://timsedisraceinglitenglan:f0UegysQUGvyyASi581fqqts@dharma.mongohq.com:10051/hvndemo2', function(err, db) {
    mongodb = db;
    db.close();
});

exports.list = function(req, res) {
    var collection = mongodb.collection('product');
    collection.find().toArray(function(err, docs) {
        if(!err) {
            docs.forEach(function(doc) {
                var prod = new Product(doc.ObjectID, doc.item, doc.image, doc.price);
                products.push(prod);
            });
            res.render('products', { title: 'Products', products: products});
        } else {
            res.send(err.message);
        }
    });
};