import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RequestapiService } from 'src/app/services/api/requestapi.service';
import { SpinnerService } from 'src/app/services/loader/spinner.service';
@Component({
  selector: 'app-task-modals',
  templateUrl: './task-modals.page.html',
  styleUrls: ['./task-modals.page.scss'],
})
export class TaskModalsPage implements OnInit {
  show: boolean = false;
  task: FormGroup;
  constructor(
    private modalController: ModalController,
    private api: RequestapiService,
    private loader: SpinnerService,
    private router:Router
  ) {
    this.taskForm();
  }

  taskForm() {
    this.task = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      begin_at: new FormControl('', Validators.required),
      end_at: new FormControl('', Validators.required),
    });
  }
  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }

  addNewTask() {
    this.show = true;
    if (this.task.valid) {

      const payload = {
        name: this.task.get('name').value,
        description: this.task.get('description').value,
        end_at: this.task.get('end_at').value,
        begin_at: this.task.get('begin_at').value,
        domain_id: 1,
      };

      this.api
        .PostRequest(payload, 'projects')
        .then((task:any) => {
          this.loader.ToastMakerError(task.message,'success')
          this.show=false;
          this.router.navigate(['/task']);
        })
        .catch((err) => {
          this.show=false;
          console.log(err);
        });
    } else {
      this.loader.ToastMakerError('Please fill all the fields', 'danger');
    }
  }
}
