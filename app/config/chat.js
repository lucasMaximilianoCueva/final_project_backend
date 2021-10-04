const mongoose = require("mongoose");
const logger = require("../helpers/pino.js");

const Schema = mongoose.Schema;

class ChatDB {
  constructor() {
    this.chatSchema = new Schema({
      author: String,
      time: String,
      text: String,
    });

    this.chatDAO = mongoose.model("messages", this.chatSchema);
  }

  insert(items) {
    return this.chatDAO.create(items);
  }
  async list() {
    return await this.chatDAO.find({});
  }
}

const chat = new ChatDB();

module.exports = { chat };
