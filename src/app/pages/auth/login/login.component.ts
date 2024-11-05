import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { MensajeriaService } from 'src/app/services/mensajeria/mensajeria.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  cargando?: boolean
  loginForm?: any
  correo?: string
  password?: string
  errorMail?: string
  errorPassword?: string

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tema: ThemeService,
    private mensajeria: MensajeriaService,
    private auth: AuthServiceService
  ) {

    this.loginForm = fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

  }

  ngOnInit(): void {
    localStorage.removeItem('usuarios')
    this.cargando = false
    this.tema.verificarTema()
  }


  logIn() {
    //validacion de campos
    this.cargando = true
    if (this.loginForm.get('correo').errors) {

      if (this.loginForm.get('correo').errors.required) {
        this.errorMail = 'Correo requerido'
        this.mensajeria.mostrarAlert('el campo correo presenta un error')
        this.cargando = false
        return
      }

      if (this.loginForm.get('correo').errors.email) {
        this.errorMail = 'Formato invalido'
        this.mensajeria.mostrarAlert('el campo correo presenta un error')
        this.cargando = false
        return
      }

    }


    if (this.loginForm.get('password').errors) {

      if (this.loginForm.get('password').errors.required) {
        this.errorMail = 'Contraseña requerida'
        this.mensajeria.mostrarAlert('el campo contraseña presenta un error')
        this.cargando = false
        return
      }

    }

    this.correo = this.loginForm.get('correo').value
    this.password = this.loginForm.get('password').value
    this.auth.login(this.correo, this.password)
    this.cargando = false

  }

  goTo(ruta: string) {
    this.router.navigate([`/auth/${ruta}`])
  }

}
