'use strict';
var Todo = require('./models/Todo.js');

module.exports = function(app) {
  app.route('/api/get').get(function(req, res) {
    Todo.find({}, function(err, todos) {
      res.send(todos);
    });
  });

  app.route('/api/get/more').get(function(req, res) {
    Todo.find({user:'aidnurs'}, function(err, todos) {
      res.send(todos);
    });
  });

  app.route('/api/post').post(function(req, res) {
    var input = req.body.input;
    var login = req.body.login;
    var tmrw = new Todo({
      user: login,
      task: input
    });
    tmrw.save(function(err, tmrw) {
      if (err) {
        throw err;
      }
    });
    res.send(tmrw);
  });

  app.route('/api/put').put(function(req, res) {
    Todo.findById(req.body.id, function(err, todo) {
      todo.task = req.body.input;
      todo.save(function(err) {});
      res.sendStatus(200);
    });
  });

  app.route('/api/delete').delete(function(req, res) {
    var input = req.body.input;
    Todo.findOneAndRemove({ task: input }, function(err) {});
    res.sendStatus(200);
  });
};
