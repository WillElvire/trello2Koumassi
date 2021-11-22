import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private toast:ToastController,private alert :AlertController,private loading:LoadingController) { }

  async AlertSimpleWithLoader( message ){

    this.showloader('chargement');

    setTimeout( () =>{this.alert.create( {animated:true,mode:'ios',message:message,} ).then(( u )=> u.present())},1000)

  }
   AlertWithInput( message ){

    this.alert.create( {animated:true,mode:'ios',message:message,} ).then((u)=>u.present())

  }
   AlertSimple( message ){

    this.alert.create( { animated:true,mode:'ios',message:message, } ).then((u)=>u.present())

  }
  showloader( message ){

    this.loading.create( { spinner:"circles",message:message,cssClass:'large',mode:'ios',translucent:true,duration:500, } ).then((u)=>u.present())

  }

  loaderSimple(){

    this.loading.create( { spinner:"circles",cssClass:'large',mode:'ios',translucent:true,duration:100, } ).then((u)=>u.present())

  }

  ToastMaker( message ){

    this.toast.create( {

      message:message,

      color:'success',

      duration:2000,

      mode:'ios',

      animated:true,

      position:'bottom'

    } ).then((u)=>u.present())
  }

  ToastMakerError( message,color ){

    this.toast.create({

      message:message,

      color:color,

      duration:2000,

      mode:'ios',

      animated:true,

      position:'bottom'

    }).then((u)=>u.present())
  }

}
