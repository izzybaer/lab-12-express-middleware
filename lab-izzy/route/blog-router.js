'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();

const Blog = require('../model/blog.js');

const blogRouter = module.exports = new Router();

blogRouter.post('/api/blogs', jsonParser, (req, res, next) => {
  console.log('hit POST /api/blogs');

  new Blog(req.body)
    .save()
    .then(blog => res.json(blog))
    .catch(next);
});

blogRouter.get('/api/blogs/:id', (req, res, next) => {
  console.log('hit GET /api/blogs');

  Blog.findById(req.params.id)
    .then(blog => res.json(blog))
    .catch(next);
});

blogRouter.put('/api/blogs/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/blogs');

  let options = {
    runValidators: true,
    new: true,
  };

  Blog.findByIdAndUpdate(req.params.id, req.body, options)
    .then(blog => res.json(blog))
    .catch(next);
});

blogRouter.delete('/api/blogs/:id', (req, res, next) => {
  console.log('hit DELETE /api/blogs/:id');

  Blog.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
