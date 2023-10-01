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
  deleteTodo: EventEmitter<void> = new EventEmitter();

  constructor(private dataService: DataService) {}
  ngOnInit() {
    // Obtiene la lista de todos a través del servicio y suscríbete para obtener los datos
    this.dataService.getAllTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
  }

  onFormSubmit(form: NgForm) {
    if (form.valid) {
      const updatedTodo: Todo = {
        id: this.todo.id,
        text: form.value.newTodoValue,
        completed: form.value.completed,
      };

      const indexToUpdate = this.todos.findIndex(
        (todo) => todo.id === updatedTodo.id
      );

      if (indexToUpdate !== -1) {
      this.dataService.updateTodo(updatedTodo).subscribe((response) => {
        // Actualiza this.todo con los datos actualizados del servidor
        this.todo = response;

        // Actualiza el formulario con los nuevos valores
        form.setValue({
          newTodoValue: this.todo.text

        });

        console.log('Todo actualizado en el servidor:', response);
      });
    } else {
      console.error('No se encontró el elemento a actualizar en la lista.');
    }
    }else{
      (this.showValidationErrors = true)
    }
  }

  onDeleteTodo() {
    this.deleteTodo.emit();
  }
}
