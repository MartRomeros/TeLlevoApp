import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  formularioRegistro?: FormGroup | any
  isDriver?: boolean
  usuarios: any = []
  cargando?: boolean

  constructor(private router: Router, private fb: FormBuilder, private alert: AlertController, private toast: ToastController) {

    this.formularioRegistro = fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]],
      tipoUsuario: ['', [Validators.required,]],
    })

  }


  ngOnInit() {
    this.cargando = false
    if (!localStorage.getItem('usuarios')) {
      console.log("no existen usuarios registrados")
    }
  }

  esDriver() {
    if (document.querySelector("ion-radio-group")?.value == "chofer") {
      this.isDriver = true
      this.formularioRegistro.addControl('marca', this.fb.control('', Validators.required))
      this.formularioRegistro.addControl('patente', this.fb.control('', Validators.required))
    } else {
      this.formularioRegistro.removeControl('marca')
      this.formularioRegistro.removeControl('patente')
      this.isDriver = false
    }
  }

  goToLogin() {
    this.router.navigate(['/auth'])
  }

  registrar() {

    this.cargando = true

    const campos = Object.keys(this.formularioRegistro.controls)

    for (let i = 0; i < campos.length; i++) {
      const nombreCampo = campos[i]
      const campo = this.formularioRegistro.get(nombreCampo)

      if (campo.errors) {
        this.presentAlert(`El campo ${nombreCampo} Tiene un error`)
        this.cargando = false
        return
      }
    }


    if (!localStorage.getItem('usuarios')) {
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios))
    }

    this.usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')

    if (this.usuarios.length == 0) {

      this.usuarios.push(this.formularioRegistro.value)
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios))
      this.cargando = false
      this.router.navigate(['/auth'])


      return
    }

    this.usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')

    for (let i = 0; i < this.usuarios.length; i++) {

      if (this.formularioRegistro.get('correo').value == this.usuarios[i].correo) {
        this.presentAlert("Este usuario ya existe")
        this.cargando = false
        return
      }

    }

    this.usuarios.push(this.formularioRegistro.value)
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios))
    this.confirmarRegistro()
    this.cargando = false
    this.router.navigate(['/auth'])


  }


  //mensajes que el usuario vera

  async presentAlert(mensaje: string) {
    const alert = await this.alert.create({
      header: 'ATENCION!',
      message: mensaje,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async confirmarRegistro() {
    const toast = await this.toast.create({
      message: 'Registro exitoso',
      position: 'bottom',
      duration: 1500
    })

    await toast.present()
  }

}
