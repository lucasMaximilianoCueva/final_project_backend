const { Router } = require("express");
const cors = require("cors");
const {
    getDataController,
    getDataByIdController,
    postDataController,
    putDataController,
    deleteDataController
} = require("../controller/product.js");

const routerProd = new Router();

routerProd.get("/", getDataController);
routerProd.get("/:id", cors(), getDataByIdController);
routerProd.post("/", postDataController);
routerProd.put("/:id", putDataController);
routerProd.delete("/:id", deleteDataController);

module.exports = routerProd;