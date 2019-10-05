var mongoose = require("./db.js");
var Schema=mongoose.Schema;
var ArticleSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  cid: {
    //分类id
    type: Schema.Types.ObjectId
  },
  author_id: {
    type: Schema.Types.ObjectId
  },
  author_name: {
    type: String,
    default: "A"
  },
  description: String,
  content: String
});

module.exports = mongoose.model("Article", ArticleSchema, 'article');
