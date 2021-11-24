'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./app/routes/index.js');
require('dotenv').config();

//setup
const app = express();
app.use(bodyParser.urlencoded({ extended: true})); //cấu hình sử dụng body x-www-form-urlencoded
app.use(bodyParser.json()); //cấu hình sử dụng body json
app.use(cors()); // cấu hình cort
route(app); //khai báo routes

// simple route
app.get("/", (req, res) => {
    throw new Error("hello error!");
})

// fix error
function errorLogger(error, req, res, next){  // ghi nhận lỗi
    console.error(error); // hoặc bất kỳ thư viện lạ
    next(error,message); // chuyển đến phần trung gian tiếp theo
}

function errorResponder(error, req, res, next){ // responding to client
    if(error.type == 'redirect')
    res.redirect('/error');
    else if(error.type == 'time-out') // // arbitrary condition check
    res.status(408).send(error);
    else
    next(error);
}

function failSafeHandler(error, req, res, next){
    res.status(500).send(error);
}

app.use(errorLogger);
app.use(errorResponder);
app.use(failSafeHandler);


app.listen(process.env.PORT, function(){
    console.log(`listening on port ${process.env.PORT}`);
    console.log(`http://localhost:${process.env.PORT}`);
})