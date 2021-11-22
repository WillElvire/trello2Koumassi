import {Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn:'root'
})

export class DateHelper{


  private hours;

  isActive:boolean=false;



  constructor(){

  }

  getIsActive(){

    this.hours = this.getHour()

    return this.hours >= 8 && this.hours <=  16 ? this.isActive=true : this.isActive=false;

  }

  getDay(){

    return formatDate(new Date(),'yyyy-MM-dd','en-Us');

  }


  getHour(){

    return formatDate(new Date(),'H','en-Us');

  }

  getCurrentHours(){

    return this.hours = formatDate(new Date(),'HH:mm','en-Us');;

  }







}
