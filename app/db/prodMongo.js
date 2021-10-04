const moment = require("moment");
const { productsDAO } = require("../models/productSchema.js");

class ProdMongo {
  constructor() {
    this.PRODUCTS_DB = [];
    this.timeStamp = moment().format("DD/MM/YYYY h:mm:ss a");
    this.codeProd = Math.round(Math.random() * 10000);
    this.productsDAO = productsDAO;
  }

  list() {
    return this.productsDAO.find({});
  }

  insert(items) {
    const newProd = {
      ...items,
      timestamp: this.timeStamp,
      code: this.codeProd,
    };
    return this.productsDAO.create(newProd);
  }

  listById(id) {
    return this.productsDAO.find({
      _id: id,
    });
  }

  deleteById(id) {
    return this.productsDAO.deleteOne({
      _id: id,
    });
  }

  updateById(id, data) {
    return this.productsDAO.updateOne(
      {
        _id: id,
      },
      {
        $set: data,
      }
    );
  }
}

module.exports = ProdMongo;
