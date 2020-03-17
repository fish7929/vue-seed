/*
 * dev-server.js
 * Copyright (C) 2016 tristan <tristan@tristan-VirtualBox>
 *
 * Distributed under terms of the MIT license.
 */

"use strict";

var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var jsonFileBase = './mock';
function isFunction(obj) {
    return Object.prototype.toString.call(obj) == '[object Function]';
}
function route(fileName) {
    return function (req, res) {
        var fn = getMockJsonUrl(req.originalUrl);
        var args = process.argv;
        if (isFunction(fn)) fn = fn(req);
        setTimeout(function () {
            jsonFromFile(res, fn);
        }, 500);
    };
}

function getMockJsonUrl(url) {
    var p = path.join(jsonFileBase, url.split('?')[0]);   //增加前缀和去掉？后面的所有值
    p += '.json';
    return p;
}

function jsonFromFile(res, fileName) {
    fs.readFile(fileName, { encoding: 'utf8' }, function (err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.json(JSON.parse(data));
    });
}
function convertUrl(r) {
    var p = path.join(jsonFileBase, r.replace(/\/:[^\/]+(?=[\/$])/g, ''));
    if (p[p.length - 1] == '/') p = p.substr(0, p.length - 1);
    p += '.json';
    return p;
}

function gets(router, routes) {
    routes.forEach(function (r) {
        // console.log(arguments);
        // var p = convertUrl(r);
        // router.use(r, route(p));
        router.use(r, route(r));
    });
}


app.use(function (req, res, next) {
    console.log(req.originalUrl);
    next();
});
app.use(cors({
    origin: '*',
    exposedHeaders: 'access-token'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var router = express.Router();
app.use('/', router);
/**
 * get 方法
 */
//测试
gets(router, [
    '/vdian/commodity/get',
    '/vdian/login/logout',
    '/vdian/merch/queryMerchantStatus',
    '/vdian/merch/get',
    '/vdian/bank-codes/get',
    '/vdian/order/list',
    '/vdian/order/querySettleRecord',
    '/vdian/order/querySettleRemitStatus'
]);

/**
 * post 方法
 */
//登录
var Login = '/vdian/login/mobileAuth';
router.post(Login, function (req, res) {
    jsonFromFile(res, getMockJsonUrl(req.originalUrl));
});
//发送短信验证码
var SendSmsCode = '/vdian/login/sendSmsCode';
router.post(SendSmsCode, function (req, res) {
    jsonFromFile(res, getMockJsonUrl(req.originalUrl));
});

//上传图片
var UploadPic = '/vdian/upload/pic';
router.post(UploadPic, function (req, res) {
    jsonFromFile(res, getMockJsonUrl(req.originalUrl));
});

//个人入网
var PersonNetIn = '/vdian/merch/personNetIn';
router.post(PersonNetIn, function (req, res) {
    jsonFromFile(res, getMockJsonUrl(req.originalUrl));
});

//下单
var CeateOrder = '/vdian/order/create';
router.post(CeateOrder, function (req, res) {
    jsonFromFile(res, getMockJsonUrl(req.originalUrl));
});

//更换银行卡
var ChangeBankCard = '/vdian/merch/updateSettleCard';
router.post(ChangeBankCard, function (req, res) {
    jsonFromFile(res, getMockJsonUrl(req.originalUrl));
});

var server = app.listen(8686, function () {
    var address = server.address();
    console.log('api server is running at:' + address.port);
});


