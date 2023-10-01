const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

const todos = [
    /*{ id: 0, text: 'Say hello', completed: true },
    { id: 1, text: 'My friend', completed: false },*/
];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la aplicación To-Do!');
  });

app.post('/api/todos', (req, res) => {
  const newTodo = req.body;
  newTodo.id = Date.now();
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const updatedTodo = req.body;

  // Encuentra el índice del todo a actualizar en el arreglo
  const index = todos.findIndex(todo => todo.id === parseInt(todoId));

  if (index !== -1) {
    // Actualiza el todo con los datos enviados en el cuerpo de la solicitud
    todos[index] = updatedTodo;
    res.json(updatedTodo);
  } else {
    res.status(404).json({ message: 'To-Do not found' });
  }
});

app.delete('/api/todos/:id', (req, res) => {
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
