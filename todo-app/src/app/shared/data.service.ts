import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  todos: Todo[] = [

      new Todo('my first to do'),
      new Todo('lorem ipsum lorem ipsum lorem ipsum lorem ipsum ')


  ];
  constructor() { }
  getAllTodos(){
    return this.todos
  }
  addTodo(todo:Todo){
    this.todos.push(todo)
  }

  UpdateTodo(index:number, updatedTodo:Todo){
    this.todos[index]=updatedTodo
  }

  DeleteTodo(index:number){
    this.todos.splice(index, 1)
  }
}
