import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { DataService } from '../shared/data.service';

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
  todos : Todo[] | undefined
  todosLength: Number = 0;
  submittedValue=''

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

  constructor(@Inject(DOCUMENT) private document: Document, private dataService: DataService) {}

  ngOnInit() {
    this.todos=  this.dataService.getAllTodos();
    this.todosLength = this.todos.length
    const value = localStorage.getItem(this.storage);
    if (value) {
      this.value = JSON.parse(value);
    }
  }
  onSubmit(submittedValue: string){
    this.submittedValue = submittedValue;
    console.log('submitted',submittedValue)
    this.dataService.addTodo(new Todo(submittedValue))
  }
}
