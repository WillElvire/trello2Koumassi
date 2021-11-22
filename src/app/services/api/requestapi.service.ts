import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams}from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NativestorageService } from './../storage/nativestorage.service';
import { UserModel } from './../../interfaces/user/user-model';
import { Observable, Subject } from 'rxjs';
import { CredentialsService } from 'src/app/services/auth/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class RequestapiService {


  server:string="https://pma-app-test.herokuapp.com/api/";

  token;

  userSubject = new Subject();

  constructor(private credentials:CredentialsService,private http:HttpClient,private storage:NativestorageService) {

   this.init()

  }

  init(){

    return this.token  = this.credentials.getAccessToken()

  }

  header():any{

    const token = this.init()

    return  new HttpHeaders({

      'Content-Type': 'application/json',

      'Access-Control-Allow-Origin':'*',

      'Access-Control-Allow-Methods':'POST, GET, OPTIONS, PUT',

      'Authorization': `Bearer ${token}`

    });

  }


  Connector(email,password){

    const body={email,password}

    return new Promise((resolve,reject)=>{

      this.http.post<UserModel>(this.server + 'login',JSON.stringify(body),{headers:this.header()}).subscribe((values:any)=>{

        const role = values.user.is_admin?1:2;

        this.storage.StoreArray([{key:'token',value:values.token},{key:'id',value:values.user.id},{key:'role',value:role}]);

        resolve(values)

      },(error)=>{

        reject(error)

      });
    })

  }

  PostRequest(body,url:any){

   return new Promise((resolve,reject)=>{

     this.http.post(this.server+`${url}`,JSON.stringify(body),{headers:this.header()})

     .subscribe((values)=>resolve(values),(error)=> reject(error));

    })

  }

  FetchInformation(url,token=null){

    return  new Promise<any>((resolve,reject)=>{

      this.http.get(this.server+`${url}`,{headers:this.header()}).subscribe((information)=>{

        resolve(information)
      },
      (error)=>{

        reject(error)

      }
      );
    })
  }



}
