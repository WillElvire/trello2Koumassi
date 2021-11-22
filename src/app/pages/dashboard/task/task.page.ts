import { Component, OnInit } from '@angular/core';
import { RequestapiService } from 'src/app/services/api/requestapi.service';
import { ModalController } from '@ionic/angular';
import { TaskModalsPage } from './../../../shared/task-modals/task-modals.page';
import { Router } from '@angular/router';
import { NativestorageService } from 'src/app/services/storage/nativestorage.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  constructor(
    private router: Router,
    private api: RequestapiService,
    private modal: ModalController,
    private storage: NativestorageService
  ) {
    setTimeout(() => {
      this.getTask();
    }, 100);
  }

  task = [];
  ngOnInit() {}

  getTask() {
    this.api.FetchInformation('projects').then((task) => {
      console.log(task);
      this.task = task;
    });
  }

  async AddProjet() {
    this.router.navigate(['/add-task']);
  }

  addTodo() {
    this.router.navigate(['/add-todo']);
  }

  logout() {
    this.storage.RemoveArray(['user', 'token']);
    this.router.navigate(['/login']);
  }
}
