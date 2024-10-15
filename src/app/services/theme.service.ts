import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  tema?:string

  constructor(private toast:ToastController) { }



  TemaApp(){
    this.tema = document.querySelector("ion-radio-group")?.value
    switch (this.tema) {
      case 'oscuro':
        document.documentElement.style.setProperty("--ion-content-theme","#000")
        document.documentElement.style.setProperty("--ion-text-general","#fff")
        this.presentToast('bottom','Oscuro')
        break;
      case 'claro':
        document.documentElement.style.setProperty("--ion-content-theme","#fff")
        document.documentElement.style.setProperty("--ion-text-general","#000")
        this.presentToast('bottom','Claro')
        break;
      default:
        this.presentToast('bottom','del sistema')
        break;
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom',tema:string) {
    const toast = await this.toast.create({
      message: `Tema ${tema} aplicado!`,
      duration: 1500,
      position: position,
    });
    await toast.present();
  }

}
