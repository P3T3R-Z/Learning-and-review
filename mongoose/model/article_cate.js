var mongoose = require("./db.js");

var ArticleCateSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  
  description: String,
  addtime: Date
});

module.exports = mongoose.model("Articlecate", ArticleCateSchema, 'articlecate');
