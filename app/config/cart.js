const moment = require("moment");
const mongoose = require("mongoose");
const pino = require("pino");

const logger = pino({
  prettyPrint: { colorize: true },
});

const Schema = mongoose.Schema;

class CartDB {
  constructor() {
    this.CART_DB = [];
    this.nextCartDb = 0;
    this.timeStamp = moment().format("DD/MM/YYYY h:mm:ss a");
    this.codeProd = Math.round(Math.random() * 10000);
    this.cartSchema = new Schema({
      title: String,
      description: String,
      timestamp: String,
      thumbnail: String,
      code: Number,
      price: Number,
      stock: Number,
    });

    this.cartDAO = mongoose.model("cart", this.cartSchema);
  }

  getCart() {
    return this.cartDAO.find({});
  }

  getCartId(id) {
    return this.cartDAO.find({ _id: id });
  }

  postCart(data) {
    const newProd = { ...data, timestamp: this.timeStamp, code: this.codeProd };
    return this.cartDAO.create(newProd);
  }

  deleteCartItem(id) {
    return this.cartDAO.deleteOne({ _id: id });
  }
}

const cartDb = new CartDB();

module.exports = { cartDb };
