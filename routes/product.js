var products = [];

var Product = function(id, item, image, price) {
    this.Id = id;
    this.Item = item;
    this.Image = image;
    this.Price = price;
};

/*Cloudant connection*/
var cradle = require('cradle');
var c = new(cradle.Connection)(
    'https://tonywu90.cloudant.com',
    443,
    {
        secure: true,
        auth: { username: 'timsedisraceinglitenglan', password: 'f0UegysQUGvyyASi581fqqts' }
    }
);
var db = c.database('products');

/*Localhost connection*/
//var cradle = require('cradle');
//var db = new(cradle.Connection)().database('product');

db.view('product/all', function(err, res) {
    if(!err){
        res.forEach(function(row) {
            products.push(new Product(row.id, row.item, row.image, row.price));
        });
    } else {
        console.log(err.message);
    }
});

exports.list = function(req, res) {
    res.render('products', { products: products, title: 'Products' });
};