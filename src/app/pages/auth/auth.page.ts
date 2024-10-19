import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  cargando?: boolean
  loginForm?: any
  usuarios: any[] = []

  constructor(private router: Router, private fb: FormBuilder, private alert: AlertController) {

    this.loginForm = fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

  }


  logIn() {
    setTimeout(() => {

      const campos = Object.keys(this.loginForm.controls)

      for (let i = 0; i < campos.length; i++) {
        const nombreCampo = campos[i]
        const campo = this.loginForm.get(nombreCampo)

        if (campo.errors) {
          this.presentAlert(`El campo ${nombreCampo} Tiene un error`)
          this.cargando = false
          return
        }
      }

      this.usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
      if (this.usuarios?.length == 0) {
        this.presentAlert("Usuario No encontrado!")
        return
      }

      for (let i = 0; i < this.usuarios.length; i++) {
        if (this.usuarios[i].correo != this.loginForm.get('correo').value) {
          this.cargando = false
          console.log('correo no valido')
          this.presentAlert("Usuario no valido")
          return
        }

        if (this.usuarios[i].password != this.loginForm.get('password').value) {
          this.cargando = false
          console.log('contra no valido')
          this.presentAlert("Usuario no valido")
          return

        }
      }

      this.cargando = false
      this.router.navigate(['/pasajero'])

    }, 1000);
    this.cargando = true
  }

  goToRegistro() {
    this.router.navigate(['/register'])
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alert.create({
      header: 'ATENCION!',
      message: mensaje,
      buttons: ['Action'],
    });

    await alert.present();
  }

}
