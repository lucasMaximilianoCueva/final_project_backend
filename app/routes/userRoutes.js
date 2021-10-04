const { Router } = require("express");
const {
    getUserController,
    logoutFacebookController,
    registerLocalController,
    loginLocalController,
    checkoutDataController,
    getCheckoutDataController
} = require("../controller/user.js");

const routerUser = new Router();

routerUser.get("/", getUserController);
routerUser.post("/register", registerLocalController);
routerUser.post("/login", loginLocalController);
routerUser.post("/checkout", checkoutDataController);
routerUser.get("/order", getCheckoutDataController)
routerUser.get("/logout", logoutFacebookController);

module.exports = routerUser;