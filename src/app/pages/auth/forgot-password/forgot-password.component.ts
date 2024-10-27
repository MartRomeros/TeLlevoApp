import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { MensajeriaService } from 'src/app/services/mensajeria/mensajeria.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm?: any
  usuarios: any[] = []
  cargando?: boolean

  constructor(
    private fb: FormBuilder,
    private authServicio: AuthServiceService,
    private router: Router,
    private tema: ThemeService,
    private mensajeria: MensajeriaService
  ) {

    this.forgotForm = fb.group({
      correo: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit() {

    this.cargando = false

    console.log("forgot-iniciado")
    this.tema.verificarTema()
  }

  resetearContrasena() {
    this.cargando = true
    if (this.forgotForm.get("correo").errors) {
      this.mensajeria.mostrarAlert("Ingresa un correo valido!")
      return
    }

    this.usuarios = JSON.parse(localStorage.getItem('usuarios') || "[]")

    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].correo == this.forgotForm.get('correo').value) {
        this.authServicio.resetPassword(this.usuarios[i].nombre, this.usuarios[i].correo).subscribe({
          next: (response) => {
            this.cargando = false
            this.mensajeria.mostrarToast(response.message)
            this.goTo('/auth/login')
            console.log(response)
          },
          error: (err) => {
            console.log(err)
          }
        })
        return

      }
    }

    this.mensajeria.mostrarAlert("Ingresa un correo valido!")

  }

  goTo(ruta: string) {
    this.router.navigate([ruta])
  }

}
