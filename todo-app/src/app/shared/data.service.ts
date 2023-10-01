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

  }
  addTodo(newTodo: any): Observable<any> {
    //this.todos.push(todo);
    return this.http.post(this.apiUrl, newTodo);
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    const todoId = updatedTodo.id;

    // Devuelve el resultado de la solicitud PUT como un observable
    return this.http.put<Todo>(`${this.apiUrl}/${todoId}`, updatedTodo).pipe(
      catchError((error: any) => {
        console.error('Error al actualizar el To-Do:', error);
        throw new Error('Error al actualizar el To-Do en el servidor.');
      })
    );
  }

  deleteTodo(todoId: number) {
    //this.todos.splice(index, 1);
    const url = `${this.apiUrl}/${todoId}`;
    return this.http.delete(url);
  }
  deleteCompletedTodos() {

  }
}
