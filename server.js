const express = require('express');
const cors = require('cors');
const bp = require('body-parser')
const mongoose = require('mongoose');
const Router  = require('./routes/routes');
const { user_list, signup, login, remove, change_pass } = require('./controllers/user');
const { product_list, createProduct, deleteProduct } = require('./controllers/product');
const { order_list, createOrder, user_orders, close_orders } = require('./controllers/order');

// Env variables
const env = require('./.env');
const app = express();

app.use(bp.json())
//app.use(bp.urlencoded({ extended: false }))
app.use(cors());
app.use(express.json());

mongoose.connect(
    `mongodb+srv://${env.username}:${env.password}@${env.cluster}.mongodb.net/${env.dbname}?retryWrites=true&w=majority`
)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(env.port, () => {console.log(`Server is running at port ${env.port}`)});

app.get('/express_backend', (req, res) => {
    res.send({ express: 'BACKEND CONNECTED'});
});

app.get('/user_list', (req, res) => {
    user_list(res);
});

app.post('/signup', (req, res) => {
    signup(req.body.email, req.body.name, req.body.pass, res);
});

app.post('/login', (req, res) => {
    login(req.body.email, req.body.pass, res);
});

app.post('/remove', (req, res) => {
    remove(req.body.email, req.body.pass, res);
});

app.post('/change_pass', (req, res) => {
    change_pass(req.body.email, req.body.old_pass, req.body.new_pass, res);
});

app.get('/product_list', (req, res) => {
    product_list(res);
});

app.post('/create_product', (req, res) => {
    createProduct(req.body.product_name, req.body.price, req.body.photo, req.body.description, res);
});

app.post('/delete_product', (req, res) => {
    console.log(req.body);
    deleteProduct(req.body.name, res);
});

app.post('/create_order', (req, res) => {
    createOrder(req.body.uid, req.body.product_name, req.body.price, req.body.state, res)
});

app.post('/user_orders', (req, res) => {
    user_orders(req.body.uid, req.body.state, res);
});

app.post('/close_orders', (req, res) => {
    close_orders(req.body.uid, res);
});