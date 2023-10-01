import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { DataService } from '../shared/data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {
  private class = 'dark';
  private storage = 'darkMode';
  iconName = '';
  state = 'off';
  taskState = '';
  todos!: Todo[];
  todosLength: Number = 0;
  showValidationErrors: boolean = false;
  filter: 'all' | 'completed' | 'active' = 'all';

  @Input()
  get value(): boolean {
    return this.document.body.classList.contains(this.class);
  }

  set value(isDark: boolean) {
    localStorage.setItem(this.storage, isDark.toString());

    if (isDark) {
      this.iconName = 'sun';
      this.state = 'off';
      this.document.body.classList.add(this.class);
    } else {
      this.iconName = 'moon';
      this.state = 'on';
      this.document.body.classList.remove(this.class);
    }
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private dataService: DataService
  ) {
    this.refreshTodos();
  }
  getAllTodos(){
    this.dataService.getAllTodos().subscribe(
      (todos) => {
        this.todos = todos;
        this.todosLength = this.todos.length;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  ngOnInit() {
    this.getAllTodos();
    const value = localStorage.getItem(this.storage);
    if (value) {
      this.value = JSON.parse(value);
    }
  }
  onSubmit(form: NgForm) {

    const newTodo = {
      text: form.value.text,
      completed: false,
    };
    form.invalid
      ? (this.showValidationErrors = true)
      //: this.dataService.addTodo(new Todo(form.value.id,form.value.text));
      :this.dataService.addTodo(newTodo).subscribe(
        (response) => {

          this.getAllTodos();
          this.todosLength = this.todos.length;
          setTimeout(() => (this.showValidationErrors = false), 1000);
          form.reset();
        },
        (error) => {
          console.error('Error al agregar el To-Do:', error);
        }
      );
  }
  delete(todo: Todo) {
    //const index = this.todos?.indexOf(todo);
    this.dataService.deleteTodo(todo.id).subscribe(
      () => {
        this.refreshTodos();
      },
      (error) => {
        console.error('Error al eliminar el To-Do:', error);
      }
    );
    this.getAllTodos();
    this.todosLength = this.todos.length;
  }
  setFilter(filter: 'all' | 'completed' | 'active') {
    this.filter = filter;
  }
  filteredTodos() {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    }
    return this.todos;
  }
  deleteCompletedTodos() {
    this.dataService.deleteCompletedTodos();
     this.getAllTodos();
    this.todosLength = this.todos.length;
    this.todos = this.todos.filter(todo => !todo.completed);
  }
  private refreshTodos() {
    this.dataService.getAllTodos().subscribe(
      (todos) => {
        this.todos = todos;
      },
      (error) => {
        console.error('Error al obtener los To-Dos:', error);
      }
    );
  }
}
