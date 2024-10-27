import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { MensajeriaService } from 'src/app/services/mensajeria/mensajeria.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  formularioRegistro?: FormGroup | any
  isDriver?: boolean
  cargando?: boolean
  usuarios: any = JSON.parse(localStorage.getItem('usuarios') || '[]')
  errorRequired?: string
  errorMail?: string


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private mensajeria: MensajeriaService,
    private tema: ThemeService,
    private anim: AnimationController,
    private auth: AuthServiceService
  ) {

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
    this.tema.verificarTema()

    this.animarExito()
    this.animarLogo()
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

  goTo(ruta: string) {
    this.router.navigate([ruta])
  }

  registrar() {

    this.cargando = true

    const campos = Object.keys(this.formularioRegistro.controls)

    for (let i = 0; i < campos.length; i++) {

      const campo = this.formularioRegistro.get(campos[i])
      if (campo.errors) {
        if (campo.errors.required) {
          this.mensajeria.mostrarAlert(`El campo ${campos[i]} presenta un error`)
          this.errorRequired = 'Campo Requerido'
          this.errorMail = 'Campo Requerido'
          this.cargando = false
          return
        }
        if (campo.errors.email) {
          this.mensajeria.mostrarAlert(`El campo ${campos[i]} presenta un error`)
          this.errorMail = 'Formato invalido'
          this.cargando = false
          return
        }
      }

    }


    this.auth.registrar(this.formularioRegistro.value)
    this.cargando = false
    this.goTo('auth/login')


  }


  //animaciones

  animarLogo() {
    this.anim.create().addElement(document.querySelector('#logo')!)
      .duration(4000).iterations(1)
      .fromTo('opacity', '0.1', '2').play()
  }

  animarExito() {
    this.anim.create()
      .addElement(document.querySelector('#exito')!)
      .duration(1000)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'scale(0.5)', 'scale(1)')
      .play();
  }

}
