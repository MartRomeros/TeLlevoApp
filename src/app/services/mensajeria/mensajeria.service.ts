import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {

  constructor(
    private alert: AlertController,
    private toast:ToastController
  ) { }



  async mostrarAlert(mensaje: string) {
    const alert = await this.alert.create({
      header: 'ATENCION!',
      message: mensaje,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 1500,
      position: 'bottom'
    })

    await toast.present()

  }

}
