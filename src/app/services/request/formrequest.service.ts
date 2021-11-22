import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormrequestService {

  _emailPatern="^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";


  constructor() { }

   _isEmail(email:string){

    return email.match(this._emailPatern) ?true :false;

  }

  _getValue(Form:FormGroup,field:any){

    return Form.get(field).value ? Form.get(field).value : 'not found'

  }

   _isPhoneNumber(phone:string){

    return phone.length<8;
  }

  _isValid(Form:FormGroup){

    return Form.valid

  }

  _getEveryThing(Form:FormGroup){

    return Form.value

  }

   _isValidNameAndFirstname(nom:string,prenom:string){

    return nom.length<20 && nom.length>2

      && prenom.length<20 && prenom.length>2



  }
}
