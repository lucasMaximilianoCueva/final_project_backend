const mongoose = require("mongoose");

const Schema = mongoose.Schema;

class CheckoutDB {
  constructor() {
    this.chatSchema = new Schema({
      buyer: {
        name: String,
        surName: String,
        phone: String,
        email: String,
      },
      items: [
        {
          id: String,
          title: String,
          quantity: Number,
          price: Number,
        },
      ],
      total: Number,
      date: String,
      stateOrder: String,
    });

    this.chatDAO = mongoose.model("order", this.chatSchema);
  }

  insert(items) {
    return this.chatDAO.create(items);
  }
  async list() {
    return await this.chatDAO.find({});
  }
}

const checkout = new CheckoutDB();

module.exports = { checkout };
