import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api/todos';
  todos: Todo[] = [
    new Todo(0,'my first to do', false),
    new Todo(1,'lorem ipsum lorem ipsum lorem ipsum lorem ipsum ', true),
  ];
  constructor(private http: HttpClient) {}

  getAllTodos() {
    //return this.todos;
    return this.http.get<Todo[]>(this.apiUrl).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw new Error('Error al obtener los To-Dos del servidor.');
      })
    );
  }
  getCompletedTodos() {
    return this.todos.filter(todo => !todo.completed);
  }
  addTodo(newTodo: any): Observable<any>  {
    //this.todos.push(todo);
    return this.http.post(this.apiUrl, newTodo);
  }

  updateTodo(index: number, updatedTodo: Todo) {
    this.todos[index] = updatedTodo;
  }

  deleteTodo(todoId: number) {
    //this.todos.splice(index, 1);
    const url = `${this.apiUrl}/${todoId}`;
    return this.http.delete(url);

  }
  deleteCompletedTodos() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }
}
