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
  correo?:string
  password?:string

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tema: ThemeService,
    private anim: AnimationController,
    private mensajeria: MensajeriaService,
    private auth: AuthServiceService
  ) {

    this.loginForm = fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

  }

  ngOnInit(): void {
    this.tema.verificarTema()
    this.animarLogo()
    this.animarPulso()
  }


  logIn() {
    //validacion de campos
    if (this.loginForm.get('correo').errors) {
      this.mensajeria.mostrarAlert('el campo correo presenta un error')
      return
    }
    if (this.loginForm.get('password').errors) {
      this.mensajeria.mostrarAlert('el campo Contraseña presenta un error')
      return
    }

    this.correo = this.loginForm.get('correo').value
    this.password = this.loginForm.get('password').value
    this.auth.login(this.correo ,this.password)
  }

  goToRegistro() {
    this.router.navigate(['auth/registro'])
  }

  goToForgotPassword() {
    this.router.navigate(['/auth/forgot-password'])
  }


  animarPulso() {
    this.anim.create()
      .addElement(document.querySelector('#pulso')!)
      .duration(1000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.5, transform: 'scale(1.2)' },
        { offset: 1, transform: 'scale(1)' }
      ])
      .play();

    this.anim.create()
      .addElement(document.querySelector('#olvido')!)
      .duration(1000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.5, transform: 'scale(1.2)' },
        { offset: 1, transform: 'scale(1)' }
      ])
      .play();
  }

  animarLogo() {
    this.anim.create().addElement(document.querySelector('#gerundio')!)
      .duration(1000).iterations(Infinity).direction("alternate").fromTo("color", "red", "white")
      .fromTo("transfore", "scale(.1)", "scale(1.3)").play()
  }

}
