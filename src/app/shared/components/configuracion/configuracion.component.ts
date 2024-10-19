import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent implements OnInit {

  usuario?:boolean

  constructor(private tema: ThemeService,private toast: ToastController) {}

  ngOnInit() {

    this.tema.TemaApp()
    if(JSON.parse(localStorage.getItem('tema')!) == "oscuro"){
      document.querySelector("ion-radio-group")?.setAttribute('value','oscuro')
    }

    

  }


  cambiarTema() {
    this.tema.cambiarTema(document.querySelector("ion-radio-group")?.value)
    this.tema.TemaApp()
    this.presentToast('bottom')

  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toast.create({
      message: `Tema aplicado!`,
      duration: 1500,
      position: position,
    });
    await toast.present();
  }


}
