import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent implements OnInit {

  usuario?:string

  constructor(private tema: ThemeService,private toast: ToastController, private auth:AuthServiceService) {
    this.verificarUsuario()
  }

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

  verificarUsuario(){
    let sesion = JSON.parse(localStorage.getItem('sesion')|| '[]')

    const usuarios = JSON.parse(localStorage.getItem('usuarios')||"[]")

    if(sesion.length == 0){
      this.usuario = "noUser"
      console.log(this.usuario)
      return
    }

    for (let i=0;i< usuarios.length;i++){
      if(usuarios[i].correo == sesion.correo){
        sesion = usuarios[i]
        break
      }
    }

    if(sesion.tipoUsuario == "pasajero"){
      this.usuario = "pasajero"
    }else{
      this.usuario = "chofer"
    }

  }

  cerrarSesion(){
    this.auth.logout()
  }


}
