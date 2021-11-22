import { Injectable } from '@angular/core';
import { SpinnerService } from './../../loader/spinner.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class ErrorTranslatorService {

  constructor(private spinner: SpinnerService,private router: Router) { }

  ErrorStatusLooker(error: HttpErrorResponse){
    return this.getMessage(error.status);
  }

  private getMessage(status){

    switch(status){

      case 0 :

       this.spinner.ToastMakerError('Verifier votre connexion internet ou rafraichisser la page','danger')

      break;

      case 404 :

        this.spinner.ToastMakerError('merci de verifier votre connexion internet','danger')

      break;

      case 500:

        this.spinner.ToastMakerError('problème avec le serveur','danger')

      break;

      case 401 || 403:

        this.spinner.ToastMakerError('Erreur lors de la sauvegarde de vos données merci de rélancer l\'application  ','danger')

        //this.router.navigate(['/login'])

      break;

      case 511:

        this.spinner.ToastMakerError('merci de vous connecter','danger')

      break
    }
  }
}
