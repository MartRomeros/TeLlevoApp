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
    this.cargando = false
    this.tema.verificarTema()
    this.animarLogo()
    this.animarPulso()
  }


  logIn() {
    //validacion de campos
    this.cargando = true
    if (this.loginForm.get('correo').errors) {

      if(this.loginForm.get('correo').errors.required){
        this.errorMail = 'Correo requerido'
        this.mensajeria.mostrarAlert('el campo correo presenta un error')
        this.cargando = false
        return
      }

      if(this.loginForm.get('correo').errors.email){
        this.errorMail = 'Formato invalido'
        this.mensajeria.mostrarAlert('el campo correo presenta un error')
        this.cargando = false
        return
      }

    }


    if (this.loginForm.get('password').errors) {
      
      if(this.loginForm.get('password').errors.required){
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

  goTo(ruta:string){
    this.router.navigate([`/auth/${ruta}`])
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
