import { Component, inject, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent implements OnInit {
  private _tema = inject(ThemeService)

  public tipoUsuario?: string;
  public selectedTheme: string = 'claro';


  constructor(private toast: ToastController, private auth: AuthServiceService) {
    this.verificarUsuario();
  }

  ngOnInit() {
    this._tema.TemaApp();
  }

  cambiarTema() {
    this._tema.cambiarTema(this.selectedTheme);
    this._tema.TemaApp();
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
    try {
      this.tipoUsuario = JSON.parse(localStorage.getItem('tipo')|| 'noUser') || 'noUser'
    } catch (error) {
      this.tipoUsuario = 'noUser'
    }
  }

  cerrarSesion() {
    this.auth.logout();
  }
}