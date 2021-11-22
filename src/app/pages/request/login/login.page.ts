import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormrequestService } from './../../../services/request/formrequest.service';
import { SpinnerService } from './../../../services/loader/spinner.service';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/services/auth/auth.state'
import { CredentialsService } from 'src/app/services/auth/credentials.service'
import { ErrorTranslatorService } from './../../../services/error/transalator/error-translator.service';

@Component({

  selector: 'app-login',

  templateUrl: './login.page.html',

  styleUrls: ['./login.page.scss'],

})
export class LoginPage implements OnInit {

  Form: FormGroup;

  show: boolean = false;

  constructor(

    private Looker: FormrequestService,

    private spinner: SpinnerService,

    private router: Router,

    private authStateService: AuthStateService,

    private credentials: CredentialsService,
    private errorT: ErrorTranslatorService

  ) {
    this.ConstructForm();
  }

  ngOnInit() {
  }



  ConstructForm() {

    return this.Form = new FormGroup({

      email: new FormControl('', Validators.required),

      password: new FormControl('', Validators.required)

    })
  }

  validate() {

    this.show = true;

    return this.Looker._isValid(this.Form) ? this.InformationLooker() : this.LookUp();

  }

  LookUp() {

    this.show = false;

    this.spinner.ToastMakerError('Merci de remplir tous  les champs', 'danger')

  }

  InformationLooker() {

    const email = this.Looker._getValue(this.Form, 'email');

    const password = this.Looker._getValue(this.Form, 'password');

    console.log(email, password);


    this.authStateService.login(email, password).subscribe((data: any) => {

      const payload = { user: { ...data.user }, token: data.token };

      this.credentials.setCredentials(payload)

      this.authStateService.setUser(payload.user)

      this.authStateService.setToken(payload.token)

      this.show = false;

      this.router.navigate(['/task']);

      this.spinner.ToastMaker(`Bienvenue ${data.user.username}`);

    }, (error) => {

      this.show = false;

      console.log(error);

      error.error.message == undefined ? this.errorT.ErrorStatusLooker(error) : this.spinner.ToastMakerError(`${error.error.message}`, 'danger')

    });


  }

}
