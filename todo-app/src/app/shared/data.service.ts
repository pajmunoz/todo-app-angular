import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private serverUrl = 'localhost:3000/todos';
  todos: Todo[] = [
    new Todo('my first to do', false),
    new Todo('lorem ipsum lorem ipsum lorem ipsum lorem ipsum ', true),
  ];
  constructor(private http: HttpClient) {}

  getAllTodos() {
    //return this.todos;
    return this.http.get<Todo[]>(this.serverUrl).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw new Error('Error al obtener los To-Dos del servidor.');
      })
    );
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
