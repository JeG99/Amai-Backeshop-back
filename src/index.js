const express = require('express');
const mongoose = require('mongoose');
const Router  = require('./routes/routes');

// User controller
const { test, signup, login, remove, change_pass } = require('./controllers/user');

// Env variables
const env = require('./.env');

const app = express();

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
/*
app.get('/login', (req, res) => {
    const auth = cont.login(req.body.email, req.body.pass);
    res.send({ auth: auth });
});*/

app.get('/signup', (req, res) => {
    const result = signup(req.body.email, req.body.name, req.body.pass);
    console.log(result);
    res.send(result);
});
