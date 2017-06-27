'use strict';

const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {type: String, required: true},
  authorName: {type: String, required: true, unique: true},
  content: {type: String, required: true},
});


const Blog = module.exports = mongoose.model('blog', blogSchema);
