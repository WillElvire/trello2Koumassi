import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { Platform } from '@ionic/angular';
import { of, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NativestorageService {

  $userObserver  = new Subject<any>();

  constructor(private nativeStorage: NativeStorage,private platform$: Platform) {


  }

  GetObject( name ) {

    return this.platform$.is( 'capacitor' ) ? this.nativeStorage.getItem( name ) : Promise.resolve( localStorage.getItem( name ) );

  }

  GetCurrentUser(): Observable<any>{

    this.GetObject('user').then( ( user ) =>{

      this.$userObserver.next(JSON.parse(user))

    })

    return this.$userObserver;

  }

  StoreItem(name: string, value: any) {

    return this.platform$.is('capacitor') ? this.nativeStorage.setItem(name,value) : localStorage.setItem( name,value);

  }

  StoreObject( key,value: {} ) {

    return  this.Looker( {key,value});

  }




  GetItem( name: string ){

    return this.platform$.is('capacitor') ? this.nativeStorage.getItem( name ) : Promise.resolve(localStorage.getItem(name));

  }


  RemoveItem( name: string ){

    return this.platform$.is('capacitor') ? this.nativeStorage.remove( name ) : Promise.resolve(localStorage.removeItem(name));

  }


  Looker(data: { key: any,value: any }){

    return  this.platform$.is('capacitor') ? this.nativeStorage.setItem(data.key,JSON.stringify(data.value)) : localStorage.setItem(data.key,JSON.stringify(data.value))

  }

  StoreValue(key,value){

    return this.platform$.is('capacitor') ? this.StoreItem(key,value) : localStorage.setItem(key,value)
  }


  StoreArray(items: any[]){

    items.forEach((el: any)=>{

      this.StoreValue(el.key,el.value);

    });

  }


  RemoveArray(items: any[]): boolean {


    let bool = false;

    if( this.platform$.is('capacitor') ){

      items.forEach((el)=>{

        this.nativeStorage.remove(el).then(()=>{

          bool=true;

        }).catch(()=>{

          bool=false;

        });

        });

    }else{

      items.forEach((el)=>{

        localStorage.removeItem(el);

        bool=true;

      });

    }

    return bool;

  }

  GetItems(items: any[]): any {

    const dataContainer = [];

    items.forEach((name)=>{


      if ( this.platform$.is('capacitor') ) {

        this.nativeStorage.getItem(name).then((data)=>{

          dataContainer.push({key:name,value: JSON.parse(data)});

        });

        dataContainer.forEach((index)=>{

          console.log('Les valeurs inclusent ici  : ', index.value );

        });


      } else {

        try {

          dataContainer.push({ key: name, value: JSON.parse(localStorage.getItem(name)) });

        }
        catch (e) {

          dataContainer.push({ key: name, value: localStorage.getItem(name) });

        }

      }

    });
    return dataContainer;
  }









}
