const logger = require("../helpers/pino.js");
const moment = require("moment");
const User = require("../models/user.js");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isAuth } = require("../middlewares/auth.js");
const { checkout } = require("../config/checkout.js")
const {
  sendMailEthereal
} = require("../helpers/nodemailer.js"); 

async function getUserController(req, res) {
  if (req.user) {
    res.json({
      name: req.user.displayName || req.user.name || "usarname",
      photo: "user-photo", // req.user.photos[0].value
      email: req.user.username || "user-email", // req.user.emails[0].value
      fname: req.user.name,
      lastname: req.user.lastname,
      adress: req.user.adress,
      age: req.user.age,
      phone: req.user.phone,
      avatar: req.user.avatar,
    });
  } else {
    logger.warn('not logged');
    res.json("not logged");
  }
}

async function logoutFacebookController(req, res) {
  req.logout();
  res.redirect("/");
}

async function registerLocalController(req, res) {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        name: req.body.name,
        lastname: req.body.lastname,
        adress: req.body.adress,
        age: req.body.age,
        phone: req.body.phone,
        password: hashedPassword,
        avatar: req.body.avatar,
      });
      await newUser.save();
      res.send("User Created");

      const infoEthereal = await sendMailEthereal({
        to: "antoinette.stokes99@ethereal.email",
        subject: `new register: "${newUser.username}"`,
        html: `User: '${newUser.username}' register at ${moment().format(
          "DD/MM/YYYY h:mm:ss a"
        )}`,
      });
      logger.info(infoEthereal);
    }
  });
}

async function loginLocalController(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, async (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        logger.info(req.user);
      });
    }
  })(req, res, next);
}

async function checkoutDataController(req, res) {
  if (isAuth) {
    const data = req.body;

    const infoEthereal = await sendMailEthereal({
      to: `${data.buyer.email}`,
      subject: `new order from: "${data.buyer.name}, email: ${data.buyer.email}"`,
      html: `Hola ${data.buyer.name} ${data.buyer.surName}! el detalle de tu pedido: Vehículo marca "${data.items[0].title}" (${data.items[0].quantity}), por un total de $${data.total}.`,
    });

    checkout.insert(data).then((list) => {
      logger.info(list)
    })

    res.json(data);
  } else {
    logger.warn('does not have permissions', req.url, req.method);
    res.send(
      `"error" : 'does not have permissions', "description": route = '${req.url}' method = '${req.method}' not authorized`
    );
  }
}

async function getCheckoutDataController(req, res) {
  if (isAuth) {
    checkout.list().then((list) => {
      res.json(list);
    })
  } else {
    logger.warn('does not have permissions', req.url, req.method);
    res.send(
      `"error" : 'does not have permissions', "description": route = '${req.url}' method = '${req.method}' not authorized`
    );
  }
}

module.exports = {
  getUserController,
  logoutFacebookController,
  registerLocalController,
  loginLocalController,
  checkoutDataController,
  getCheckoutDataController
};

