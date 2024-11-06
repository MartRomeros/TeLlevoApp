import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private _mensajeria: MensajeriaService,
    private _auth: AuthServiceService

  ) {

    this.formularioRegistro = fb.group({

      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]],
      password2: ['', [Validators.required,]]

    })

    document.querySelector("ion-toggle")?.click()

  }


  ngOnInit() {

    this.tema.verificarTema()

  }


  goTo(ruta: string) {
    this.router.navigate([ruta])
  }

  registrar() {

    if (!this.validarCampos()) {
      return
    }

    if (!this.verificarPassword()) {
      return
    }

    this.usuario = {
      usuario: this.formularioRegistro.get('usuario')?.value,
      correo: this.formularioRegistro.get('correo')?.value,
      password: this.formularioRegistro.get('password')?.value,
      tipoUsuario: 'pasajero'
    }

    this._auth.registrar(this.usuario)
    this.router.navigate(['pasajero'])


  }

  validarCampos(): boolean {

    const campos = Object.keys(this.formularioRegistro.controls)

    for (let i = 0; i < campos.length; i++) {
      const campo = this.formularioRegistro.get(campos[i])
      if (campo?.errors) {
        this._mensajeria.mostrarAlert(`El campo ${campos[i]} presenta un error!`)
        return false
      }
    }

    return true

  }

  hasError(campo: string): string {

    if (this.formularioRegistro.get(campo)?.hasError('required')) {
      return 'Campo requerido'
    } else {
      return 'Email requerido'
    }

  }

  verificarPassword(): boolean {

    const password1 = this.formularioRegistro.get('password')!.value
    const password2 = this.formularioRegistro.get('password2')!.value

    console.log(password1)
    console.log(password2)

    if (password1 !== password2) {
      this._mensajeria.mostrarAlert("Las contraseñas no coinciden!")
      console.log("no son iguales")
      return false
    }

    return true

  }


}
