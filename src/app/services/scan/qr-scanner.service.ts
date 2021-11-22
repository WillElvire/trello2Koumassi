import { Injectable } from '@angular/core';

import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { SpinnerService } from './../loader/spinner.service';
import { RequestapiService } from './../api/requestapi.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ErrorTranslatorService } from './../error/transalator/error-translator.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface scanner{

  success: string,
  error: string,
  text: string

}
@Injectable({
  providedIn: 'root'
})
export class QrScannerService {

  constructor(
    private notification: NotificationService,
    private router: Router,
    private alert: SpinnerService,
    private barcodeScanner: BarcodeScanner,
    private api: RequestapiService,
    private errorT: ErrorTranslatorService
  ) { }

  scanQr() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Merci de placer le code Qr dans la zone de scan',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };
    return new Promise(async(resolve, reject) => {
      this.barcodeScanner.scan(options).then(barcodeData => {
        if(barcodeData.text===''){
          this.alert.ToastMakerError('le code scanner est invalide','danger');
        }else{
          this.StoreScanInformation(barcodeData.text);
          resolve(barcodeData);
          console.log('Barcode data', barcodeData);
        }

       }).catch(err => {
           reject(err);
           console.log('Error', err);
       });

    });
  }

  StoreScanInformation(text: any){

    const body={

      id:text,

    };
    this.api.PostRequest(body,'withdrawal').then((scanResult: scanner)=>{

      if(scanResult.success){

        this.alert.ToastMaker(` ${scanResult.success} `);

        this.router.navigate(['/success']);

        this.notification.sendNotification('Commande validée avec succès');

      }else{

        this.alert.ToastMakerError('commande déja validée ','danger');
      }

    }).catch((error: HttpErrorResponse)=>{

      //const logger=  error.error.message ? error.error.message: error.message;

      this.alert.AlertSimpleWithLoader('Merci de verifier le code scanné');

      this.errorT.ErrorStatusLooker(error);


    });


  }
}
