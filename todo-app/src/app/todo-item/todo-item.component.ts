import { Component, EventEmitter, Input } from '@angular/core';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input()
  todo!: Todo;
  //@Input() todoClicked: EventEmitter<void> = new EventEmitter();

  toggleCompleted(todo:Todo) {
    todo.completed = !todo.completed
  }
}
