var Todo = require('./models/Todo');

const todoBuilder = body => {
  let todo = new Todo({
    task: body.task
    //code: shortid.generate().slice(3)
  });
  return user;
};

module.exports.todos = async (req, res) => {
  let response;
  try {
    response = await Todo.find({});
  } catch (ex) {
    console.error(ex);
    res.send(ex);
  }
  /*response = response.map(todo => {
    return {
      task:todo.task
    };
  });*/
  res.send(response);
};

module.exports.add = async (req, res) => {
  //let db = req.db;
  //let response = await todoBuilder(req.body).save(err => {});
  try {
    let response = await todoBuilder(req.body).save(err => {
      if (err) throw err;
    });
    console.log(response);
    res.status(200).send('User created succesfully');
  } catch (ex) {
    res.status(500).send('Internal server error');
    console.error(ex);
  }
};
