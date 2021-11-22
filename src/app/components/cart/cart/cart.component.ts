import { Component, Input, OnInit } from '@angular/core';

import { NavParams, ModalController, AlertController } from '@ionic/angular';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { RequestapiService } from './../../../services/api/requestapi.service';

import { SpinnerService } from './../../../services/loader/spinner.service';


import { Router } from '@angular/router';

import { NativestorageService } from 'src/app/services/storage/nativestorage.service';

import { NotificationService } from 'src/app/services/notification/notification.service';

import { CredentialsService } from './../../../services/auth/credentials.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  dishes=[];

  user:any;

  value:any;

  loader=false;

  loader2=false;

  button=false;


 constructor(private alert : AlertController,private credential:CredentialsService,private notification :NotificationService,private router:Router,private spinner:SpinnerService,private api:RequestapiService,private storage:NativestorageService,private params:NavParams,private modal :ModalController ) {



 }


 addToCard(dish_id,day,id){

  this.alert.create({

    message:` Disponibilité du plat`,

    keyboardClose:true,

    mode:'ios',

    buttons: [
     {
        text: 'Jour',

        cssClass:'mybutton',

        handler: () => {

          this.StoreDishe(dish_id,day,id,true)
        }
      },
      {
        text: 'Nuit',

        cssClass:'mybutton',

        handler: () => {

          this.StoreDishe(dish_id,day,id,false)
        }
      },
      {
        text: 'Annuler',

        role: 'cancel',

        cssClass: 'mybutton',

      },

    ]
  }).then((u)=>u.present());
}






  ngOnInit() {

    this.InitValues();

    this.user = this.credential.getUser();

  }

  StoreDishe(dish_id,day,id,morning:Boolean){

    this.loader=true;

    const body={

     dish_id,
     day,
     user_id:this.user.id,
     morning:morning

    }




    this.api.PostRequest(body,'commande').then( ()=>{

      this.loader=false;

      this.dishes=this.dishes.filter((el,index,dishes)=> index!==id)

      this.Storage(this.dishes)

      this.button=true;

      this.spinner.ToastMaker('Félicitation votre commande à été prise en compte')

      this.notification.sendNotification('Félicitation votre commande à été prise en  compte')


    }).catch((error)=>{


      this.spinner.AlertSimple(error.error.message?error.error.message:error.error.error)

      this.loader=false;

    })
  }


  StoreDishes(){

    this.loader2=true;

    let body=[];

    this.dishes.forEach((values)=>{

      body.push({dish_id:values.id,day:values.day,user_id:4445})

    });

    this.api.PostRequest(body,'commande').then((success)=>{

      this.loader2=false;

      this.dishes=[];

      this.spinner.ToastMaker('Félicitation votre commande à été prise en compte')

    }).catch((error)=>{

      this.loader2=false;

    })


  }

  Storage(items){

    this.storage.StoreObject('commande',items);

  }

  Commande(){

    this.router.navigate( ['/commande'] )

    this.modal.dismiss();

  }

  Remove(id){

    this.dishes=this.dishes.filter((el,index,dishes)=> index!==id)

    this.Storage(this.dishes)

  }

  Close(){

   this.modal.dismiss({plat:this.dishes});

  }

  InitValues(){

    this.storage.GetObject('commande').then((information)=>{

      if(information){

        this.dishes=JSON.parse(information);

      }

    })

  }



}
