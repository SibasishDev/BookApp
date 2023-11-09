const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      },
    summary: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  BookSchema.index({ title: 1, author: 1 }, { unique: true });
  

  module.exports = mongoose.model("Book",BookSchema);