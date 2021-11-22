import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, NgModel } from '@angular/forms';
import { ErrorTranslatorService } from './../../../services/error/transalator/error-translator.service';
import { SpinnerService } from './../../../services/loader/spinner.service';
import { RequestapiService } from './../../../services/api/requestapi.service';
import { ModalController, NavParams } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
})
export class CodeComponent implements OnInit {


  loader=false;

  constructor(private router:Router,private notification :NotificationService,private errorT:ErrorTranslatorService,private spinner:SpinnerService,private api:RequestapiService,private modal:ModalController) {


  }

  ngOnInit() {

  }


  validate(){


    const code = document.getElementsByTagName('input');

    const value = code[0].value;

    console.log(value);


    if(!value){

      this.spinner.ToastMakerError('Le code de validation est réqui','danger');

    }else{

      this.checkCode(value);
    }

  }

  close(){

    this.modal.dismiss();

  }


  checkCode(text: any){

    this.loader=true;

    const payload={

      code:text,

    };

    this.api.PostRequest(payload,'withdrawal').then((codeResult: any)=>{

      this.loader=false;

      console.log()

      if(codeResult.success){


        this.spinner.ToastMaker(` ${codeResult.success} `);

        this.router.navigate(['/success']);

        this.notification.sendNotification('Commande validée avec succès');

      }else{

        this.spinner.ToastMakerError(codeResult.error,'danger');
      }

    }).catch((error: HttpErrorResponse)=>{

      this.loader=false;
      //const logger=  error.error.message ? error.error.message: error.message;

      console.log(error)

      //this.spinner.AlertSimpleWithLoader('Merci de verifier le code entré');

      this.errorT.ErrorStatusLooker(error);


    });


  }


}
