const mongoose = require("mongoose");
const Schema = mongoose.Schema

const productsSchema = new Schema({
    title: String,
    description: String,
    timestamp: String,
    thumbnail: String,
    code: Number,
    price: Number,
    stock: Number,
  });

const productsDAO = mongoose.model("items", productsSchema);

module.exports = { productsDAO };