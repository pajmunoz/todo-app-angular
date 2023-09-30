import { Component, EventEmitter, Input } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { DataService } from '../shared/data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  todos!: Todo[];
  @Input()
  todo!: Todo;
  @Input() index!: number;
  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
  }

  onFormSubmit(form: NgForm) {
    const newValue = form.value.newTodoValue;
    const todoIndex = this.index;
    this.todo.text = newValue;
    console.log(todoIndex, this.todo.text);
  }
}
