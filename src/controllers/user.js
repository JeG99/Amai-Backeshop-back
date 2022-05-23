const userModel = require('../models/user');

function test() {
    userModel.find({}).exec(function(err, res) {
        if(err)
            return console.log(err);
        else
            return console.log(res);
    });
}

function signup(email, name, pass) {
    const new_user = new userModel({name: name, email: email, pass: pass});
    userModel.find({email: email}).exec(function(err, res) {
        if(err) 
            return console.log(err);
        else if(res.length === 0) {
            new_user.save();
            return {'res': 'Account succesfully created'};
        }
        else {
            return {'err': "Account already exists"};
        }
    });
}

function login(email, pass) {
    userModel.find({email: email, pass: pass}).exec(function(err, res) {
        if(err)
            return console.log(err);
        else if(res.length === 0)
            return "Wrong email or password";
        else
            return res;
    });
}

function remove(email, pass) {
    userModel.updateOne({email: email, pass: pass}, {deleted: true}).exec(function(err, res) {
        if(err)
            return console.log(err);
        else
            return res.modifiedCount > 0; // true o false
    });
}

function change_pass(email, old_pass, new_pass) {
    userModel.updateOne({email: email, pass: old_pass}, {pass: new_pass}).exec(function(err, res) {
        if(err)
            return console.log(err);
        else
            return res.modifiedCount > 0;
    });
}

module.exports = {
    test,
    signup, 
    login,
    remove,
    change_pass
}