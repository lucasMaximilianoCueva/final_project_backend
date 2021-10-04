const { Router } = require("express");
const { getInfoController } = require("../controller/info.js");

const routerInfo = new Router();

routerInfo.get("/info", getInfoController);

module.exports = routerInfo;