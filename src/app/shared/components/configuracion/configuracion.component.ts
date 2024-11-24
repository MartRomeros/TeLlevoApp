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
  usuario?: string;
  selectedTheme: string = 'claro';

  constructor(private tema: ThemeService, private toast: ToastController, private auth: AuthServiceService) {
    this.verificarUsuario();
  }

  ngOnInit() {
    this.tema.TemaApp();
    const storedTheme = JSON.parse(localStorage.getItem('tema')!);
    if (storedTheme) {
      this.selectedTheme = storedTheme;
    }
  }

  cambiarTema() {
    this.tema.cambiarTema(this.selectedTheme);
    this.tema.TemaApp();
    this.presentToast('bottom');
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toast.create({
      message: 'Tema aplicado!',
      duration: 1500,
      position: position,
    });
    await toast.present();
  }

  verificarUsuario() {
    let sesion = JSON.parse(localStorage.getItem('sesion') || '[]');
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    if (sesion.length == 0) {
      this.usuario = 'noUser';
      return;
    }

    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].correo == sesion.correo) {
        sesion = usuarios[i];
        break;
      }
    }

    if (sesion.tipoUsuario == 'pasajero') {
      this.usuario = 'pasajero';
    } else {
      this.usuario = 'chofer';
    }
  }

  cerrarSesion() {
    this.auth.logout();
  }
}