const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors(bodyParser.json()));
app.use(cors({ origin: 'http://localhost:3000' }));

const todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la aplicación To-Do!');
  });

app.post('/todos', (req, res) => {
  const newTodo = req.body;
  newTodo.id = Date.now();
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const index = todos.findIndex(todo => todo.id === parseInt(todoId));
  if (index !== -1) {
    todos.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: 'To-Do not found' });
  }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
