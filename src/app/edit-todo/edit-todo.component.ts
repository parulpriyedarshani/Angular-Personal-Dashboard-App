import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

  todo: Todo

  constructor(private route: ActivatedRoute, private todoService: TodoService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    // to get the present todo id to get its content in the edit todo box
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const todoId = paramMap.get('id')
      this.todo = this.todoService.getTodo(todoId)
    })
  }

  onFormSubmit(form: NgForm) {
    // to update the todo
    if (form.invalid) return
    this.todoService.updatedTodo(this.todo.id, form.value)
    this.router.navigateByUrl("/todos")
    this.notificationService.show('Todo Updated!')
  }

}
