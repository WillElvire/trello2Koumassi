import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { SpinnerService } from './../../../services/loader/spinner.service';




@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})


export class QrCodeComponent implements OnInit {

  id: string;
  numero : string;
  constructor(private spinner: SpinnerService,private modal : ModalController,private params:NavParams) {


  }

  ngOnInit() {


    this.id =`${this.params.get('id')}`;
    console.log(this.id);

    this.numero=this.params.get('numero');




  }

  close(){
    this.modal.dismiss();
  }


}
