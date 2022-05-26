const express = require('express');
const cors = require('cors');
const bp = require('body-parser')
const mongoose = require('mongoose');
const Router  = require('./routes/routes');
const { user_list, signup, login, remove, change_pass } = require('./controllers/user');

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