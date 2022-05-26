const userModel = require('../models/user');

function user_list(response) {
    userModel.find({}).exec(function(err, res) {
        if(err)
            response.send(err);
        else
            response.send({users: res});
    });
}

function signup(email, name, pass, response) {
    const new_user = new userModel({name: name, email: email, pass: pass});
    userModel.find({email: email}).exec(function(err, res) {
        if(err) 
            response.send(err);
        else if(res.length === 0) {
            new_user.save()
            response.send({acc: "Account created"});
        }
        else
            response.send({acc: "Account already exists"});
    });
}

function login(email, pass, response) {
    userModel.find({email: email, pass: pass}).exec(function(err, res) {
        if(err)
            response.send(err);
        else if(res.length === 0)
            response.send({auth: false});
        else
            response.send(JSON.stringify({auth: res[0]}));
    });
}

function remove(email, pass, response) {
    userModel.updateOne({email: email, pass: pass}, {deleted: true}).exec(function(err, res) {
        if(err)
            response.send(err);
        else
            response.send(res.modifiedCount > 0); // true o false
    });
}

function change_pass(email, old_pass, new_pass, response) {
    userModel.updateOne({email: email, pass: old_pass}, {pass: new_pass}).exec(function(err, res) {
        if(err)
            response.send(err);
        else
            response.send(res.modifiedCount > 0);
    });
}

module.exports = {
    user_list,
    signup, 
    login,
    remove,
    change_pass
}