import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { NgForm } from '@angular/forms';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  isModified: boolean = false;
  showValidationErrors: boolean = false;
  todos!: Todo[];
  @Input()
  todo!: Todo;
  @Input() index!: number;
  @Output()
  deleteTodo: EventEmitter<void> = new EventEmitter

  constructor(private dataService: DataService) {}

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
  }

  onFormSubmit(form: NgForm) {

    const newValue = form.value.newTodoValue;
    const todoIndex = this.index;
    form.invalid
      ? (this.showValidationErrors = true)
      : (this.todo.text = newValue);

      form.valid?this.isModified=true:{}
      setTimeout(() => this.isModified=false, 1000);
    console.log(form);
  }
  onDeleteTodo(){
    this.deleteTodo.emit()
  }
}
