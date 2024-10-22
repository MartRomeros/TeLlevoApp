import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  cargando?: boolean
  loginForm?: any
  usuarios: any[] = []

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private alert: AlertController,
    private tema: ThemeService,
    private anim: AnimationController) {

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
        if (this.usuarios[i].correo == this.loginForm.get('correo').value) {
          console.log("correo valido!")
          if (this.usuarios[i].password == this.loginForm.get('password').value) {
            console.log("contra valida!")
            localStorage.setItem('sesion', JSON.stringify(this.loginForm.value))
            this.cargando = false
            if(this.usuarios[i].tipoUsuario == "pasajero"){
              this.router.navigate(['/pasajero'])
              return
            }else{
              this.router.navigate(['/conductor'])
              return
            }
            
          }
        }
      }

      console.log('el correo o contraseña no es valido!')
      this.presentAlert("Usuario no valido")
      this.cargando = false
      return

    }, 1000);
    this.cargando = true
  }

  goToRegistro() {
    this.router.navigate(['auth/registro'])
  }

  goToForgotPassword() {
    this.router.navigate(['/auth/forgot-password'])
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alert.create({
      header: 'ATENCION!',
      message: mensaje,
      buttons: ['Aceptar'],
    });

    await alert.present();
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
