'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

const Blog = require('../model/blog.js');
const server = require('../lib/server.js');

let tempBlog;
const API_URL = process.env.API_URL;

describe('testing blog router', () => {
  before(server.start);
  after(server.stop);

  describe('testing POST routes', () => {
    after(() => Blog.remove({}));

    let newPost = {
      title: 'Somewhere in Seattle',
      content: 'this is a story about a girl..',
      authorName: 'Izabella A. Baer',
    };

    it('should respond with a new blog and a 200 status', () => {
      return superagent.post(`${API_URL}/api/blogs`)
        .send(newPost)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.content).toExist();
          expect(res.body.title).toEqual(newPost.title);
          expect(res.body.content).toEqual(newPost.content);
        });
    });

    it('should respond with a 400 because no body', () => {
      return superagent.post(`${API_URL}/api/blogs`)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    it('should respond with a 409 because it has the same author name twice and the model says it should be unique', () => {
      return superagent.post(`${API_URL}/api/blogs`)
        .send(newPost)
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });
  });

  describe('testing GET routes', () => {
    var tempBlog;

    afterEach(() => Blog.remove({}));
    beforeEach(() => {
      return new Blog({
        title: 'Coding in Seattle',
        content: 'and she became a coder',
        authorName: 'I. Baer',
      })
        .save()
        .then(blog => {
          tempBlog = blog;
        });
    });

    it('should respond with a blog and a 200', () => {
      console.log('tempBlog', tempBlog);
      return superagent.get(`${API_URL}/api/blogs/${tempBlog._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempBlog._id);
          expect(res.body.content).toEqual(tempBlog.content);
          expect(res.body.title).toEqual(tempBlog.title);
          expect(res.body.authorName).toEqual(tempBlog.authorName);
        });
    });

    it('should respond with a 404 not found', () => {
      return superagent.get(`${API_URL}/api/blogs/74830274`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('testing PUT routes', () => {
    afterEach(() => Blog.remove({}));
    beforeEach(() => {
      return new Blog({
        title: 'Coding in Seattle',
        content: 'and she became a coder',
        authorName: 'I. Baer',
      })
        .save()
        .then(blog => {
          tempBlog = blog;
        });
    });

    it('should respond with a 200', () => {
      console.log('tempBlog', tempBlog);
      return superagent.put(`${API_URL}/api/blogs/${tempBlog._id}`)
        .send({content: 'now shes a hackmaster at Microsoft'})
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempBlog._id);
          expect(res.body.content).toEqual('now shes a hackmaster at Microsoft');
          expect(res.body.title).toEqual(tempBlog.title);
          expect(res.body.authorName).toEqual(tempBlog.authorName);
        });
    });

    it('should respond with a 400', () => {
      console.log('tempBlog', tempBlog);
      return superagent.put(`${API_URL}/api/blogs/${tempBlog._id}`)
        .send({content: 'because she is the queen of her life'})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    it('should respond with a 404', () => {
      return superagent.put(`${API_URL}/api/blogs/8493222`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('testing DELETE routes', () => {
    afterEach(() => Blog.remove({}));
    beforeEach(() => {
      return new Blog({
        title: 'Coding in Seattle',
        content: 'and she became a coder',
        authorName: 'I. Baer',
      })
        .save()
        .then(blog => {
          tempBlog = blog;
        });
    });

    it('should a 204', () => {
      console.log('tempBlog', tempBlog);
      return superagent.delete(`${API_URL}/api/blogs/${tempBlog._id}`)
        .then(res => {
          expect(res.status).toEqual(204);
        });
    });

    it('should respond with a 404', () => {
      console.log('tempBlog', tempBlog);
      return superagent.delete(`${API_URL}/api/blogs/0439818}`)
        .catcjh(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
});

































// YAAAAAAS KWEEN
