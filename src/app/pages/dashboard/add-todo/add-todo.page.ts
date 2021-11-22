import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestapiService } from 'src/app/services/api/requestapi.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/loader/spinner.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage implements OnInit {
  id: any;
  todo: FormGroup;
  show: boolean = false;

  constructor(
    private spinner: SpinnerService,
    private activated: ActivatedRoute,
    private api: RequestapiService
  ) {
    this.todoForm();
  }

  todoForm() {
    this.todo = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }
  ngOnInit() {}
  addTodoDetail() {
    this.show = true;

    this.id = this.activated.params.subscribe((params) => {
      this.id = params.id;
      const payload = {
        name: this.todo.value.name,
        project_id: this.id,
      };
      this.api
        .PostRequest(payload, 'tasks')
        .then((data: any) => {
          this.spinner.ToastMakerError(data.success, 'success');
          console.log(data);
          this.show = false;
        })
        .catch((err) => {
          this.show = false;
        });
    });
  }
}
