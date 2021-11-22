import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { NativestorageService } from './../storage/nativestorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  authSubjet = new Observable((observer)=>{
    this.storage.GetItem('user').then((user)=>{
      const information = JSON.parse(user)
      if(information){
        observer.next(information)
      }else{
        observer.error('we can\'t  observe')
      }
    })
  });

  userAuth:any;
  constructor(private storage :NativestorageService) {

  }
}
