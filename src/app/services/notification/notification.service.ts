import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { LocalNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor() {

  }


  identifiant(){

    return  Number(Math.random()*2500);
  }

  sendNotification(text){

    LocalNotifications.schedule({

      notifications:[
        {
          title: 'Notification',
          body: text,
          id: this.identifiant(),
          smallIcon:'/assets/icon/ciprel.png',
          attachments:[
            {id:'face',url:'res://public/assets/icon/ciprel.png' }
          ]

        }
      ]

    });
  }


}
