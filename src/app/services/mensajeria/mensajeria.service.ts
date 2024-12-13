import { Injectable } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {

  constructor(
    private alert: AlertController,
    private toast: ToastController,
    private actionSheet: ActionSheetController
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

  async mostrarActionSheet(data: any) {

    const actionSheet = await this.actionSheet.create({
      header: 'Informacion sobre el viaje',
      buttons: [
        {
          text: `Conductor: ${data.conductor}`,
        },
        {
          text: `Salida: ${data.salida}`
        },
        {
          text: `Fecha de salida: ${data.fechainicio}`
        },
        {
          text: `Destino: ${data.destino}`
        }
      ]
    })

    await actionSheet.present()

  }

}
