import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { RequestapiService } from './../../../services/api/requestapi.service';
import { SpinnerService } from './../../../services/loader/spinner.service';
import { ErrorTranslatorService } from './../../../services/error/transalator/error-translator.service';

@Component({
  selector: 'app-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.scss'],
})
export class EditableComponent implements OnInit {
  data: any;
  form: FormGroup;
  loader = false;
  constructor(
    private errorT: ErrorTranslatorService,
    private spinner: SpinnerService,
    private api: RequestapiService,
    private modal: ModalController,
    private nav: NavParams
  ) {}

  ngOnInit() {
    this.data = this.nav.get('data');
    this.InitForm();
  }

  InitForm() {
    this.form = new FormGroup({
      firstname: new FormControl(this.data.firstname),
      lastname: new FormControl(this.data.lastname),
      email: new FormControl(this.data.email),
      phone: new FormControl(this.data.phone),
    });
  }

  validate() {
    this.loader = true;
    this.api
      .PostRequest(this.form.value, `update/user`)
      .then(() => {
        this.spinner.ToastMaker('vos informations ont bien été modifié');
        this.modal.dismiss({ isTrue: true });
        this.loader = false;
      })
      .catch((error) => {
        this.errorT.ErrorStatusLooker(error);
        this.loader = false;
      });
  }

  close() {
    this.modal.dismiss();
  }
}
