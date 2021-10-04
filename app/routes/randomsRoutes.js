const { Router } = require("express");

const {
    getRandomDataController,
} = require("../controller/randoms.js");

const routerRandoms = new Router();

routerRandoms.get("/", getRandomDataController);

module.exports = routerRandoms;