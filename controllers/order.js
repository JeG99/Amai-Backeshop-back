const orderModel = require("../models/order")

function order_list(response){
    orderModel.find({}).exec(function(err,res){
        if(err)
            response.send(err)
        else
            response.send({orders: res})
    })
}

function createOrder(productList,totalprice,response){
    const new_order = new orderModel({product_list: productList, total_price: totalprice});
    new_order.save()
}

module.exports = {
    order_list,
    createOrder
}