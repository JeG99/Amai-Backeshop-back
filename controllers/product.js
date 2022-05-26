const productModel = require('../models/product')

function product_list(response){
    productModel.find({}).exec(function(err,res){
        if(err)
            response.send(err)
        else
            response.send({products: res})
    })
}

function createProduct(name,price,photo,description,response){
    const new_product = new productModel({product_name: name, price: price, img: photo, description: description});
    productModel.find({product_name: name}).exec(function(err,res){
        if(err){
            response.send(err)
        } else if(res.length === 0){
            new_product.save()
            response.send({result: "New product added to catalog"})
        } else {
            response.send({result: "Product already exists"})
        }
    })
}

function deleteProduct(name,response){
    productModel.deleteOne({product_name:name}).exec(function(err,res){
        if(err)
            response.send(err)
        else
            response.send({result: "Product deleted"})
    })
}

module.exports = {
    product_list,
    createProduct,
    deleteProduct
}