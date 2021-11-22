import { Injectable } from '@angular/core';
import { AppState, Plugins} from '@capacitor/core';
import { NativestorageService } from './../storage/nativestorage.service';
import { DateHelper } from './../utilities/hour';
import { NotificationService } from './../notification/notification.service';
import { PermissionsRequestResult } from '@capacitor/core/dist/esm/definitions';
const { App, BackgroundTask } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class BackgroundModeService {


  plat = [ ];

  task;

  constructor(private notification : NotificationService,private date : DateHelper,private storage :NativestorageService) {


    this.storage.GetObject('commande').then((dishes)=>{

      this.plat = JSON.parse(dishes)

    })

  }

  finishTask(){

    BackgroundTask.finish({taskId : this.task})

  }


  startBackgroundMode( ){



    App.addListener('appStateChange', ( (state : AppState) =>{

      if(!state.isActive){

        console.log('is active');


        let count = 0 ;

        this.task = BackgroundTask.beforeExit( async ()=>{

          this.notification.sendNotification("Vous avez une commande à valider aujourd'hui")

          this.plat.forEach((plat)=>{

            if(plat.day == this.date.getDay() ){

              count +=1

            }

          })

          if(count ! = 0 ){

            this.notification.sendNotification("Vous avez une commande à valider aujourd'hui")

          }


        })

        BackgroundTask.finish({taskId : this.task})


      }
       else{
         console.log('is inactive');

       }

    })

    )

  }
}
