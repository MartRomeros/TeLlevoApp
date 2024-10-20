import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm?: any
  usuarios: any[] = []

  constructor(private fb: FormBuilder, private alert: AlertController, private authServicio: AuthServiceService) {
    this.forgotForm = fb.group({
      correo: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit() {
    console.log("fogot-iniciado")
  }

  resetearContrasena() {
    if (this.forgotForm.get("correo").errors) {
      this.mostrarMensaje("Ingresa un correo valido!")
      return
    }

    this.usuarios = JSON.parse(localStorage.getItem('usuarios') || "[]")

    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].correo == this.forgotForm.get('correo').value) {
        this.authServicio.resetPassword(this.usuarios[i].nombre, this.usuarios[i].correo).subscribe({
          next: (response) => {
            console.log(response)
          },
          error: (err) => {
            console.log(err)
          }
        })
        return

      }
    }

    this.mostrarMensaje("Ingresa un correo valido!")

  }

  async mostrarMensaje(mensaje: string) {
    const alert = await this.alert.create({
      header: "ATENCION!",
      message: mensaje,
      buttons: ["Aceptar"]
    })

    await alert.present()
  }

}
