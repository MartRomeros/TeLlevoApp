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

  formularioRegistro!: FormGroup
  usuario?: any



  constructor(

    private router: Router,
    private fb: FormBuilder,
    private tema: ThemeService,

  ) {

    this.formularioRegistro = fb.group({

      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]],
      password2: ['', [Validators.required,]],

    })

  }


  ngOnInit() {

    this.tema.verificarTema()

  }


  goTo(ruta: string) {
    this.router.navigate([ruta])
  }

  registrar() {

    this.validarCampos()

    this.usuario = {
      usuario: this.formularioRegistro.get('usuario')?.value,
      correo: this.formularioRegistro.get('correo')?.value,
      password: this.formularioRegistro.get('password')?.value
    }

    console.log(this.usuario)

  }

  validarCampos() {

    const campos = Object.keys(this.formularioRegistro.controls)

    campos.forEach(campo => {
      const campoFormulario = this.formularioRegistro.get(campo)
      if (campoFormulario?.errors) {
        console.log(`el campo ${campo} posee un error!`)
      }
    })

  }

}
