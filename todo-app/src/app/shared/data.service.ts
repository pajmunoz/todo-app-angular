import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  todos: Todo[] = [
    new Todo('my first to do', false),
    new Todo('lorem ipsum lorem ipsum lorem ipsum lorem ipsum ', true),
  ];
  constructor() {}
  getAllTodos() {
    return this.todos;
  }
  getCompletedTodos() {
    return this.todos.filter(todo => !todo.completed);
  }
  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  updateTodo(index: number, updatedTodo: Todo) {
    this.todos[index] = updatedTodo;
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);

  }
  deleteCompletedTodos() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }
}
