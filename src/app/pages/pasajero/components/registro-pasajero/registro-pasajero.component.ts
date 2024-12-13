import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { MensajeriaService } from 'src/app/services/mensajeria/mensajeria.service';
import { PasajeroService } from 'src/app/services/pasajero/pasajero.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-registro-pasajero',
  templateUrl: './registro-pasajero.component.html',
  styleUrls: ['./registro-pasajero.component.scss'],
})
export class RegistroPasajeroComponent implements OnInit {

  public cargando?:boolean
  public formularioRegistro!: FormGroup

  constructor(

    private router: Router,
    private fb: FormBuilder,
    private tema: ThemeService,
    private _mensajeria: MensajeriaService,
    private _auth: AuthServiceService,
    private _pasajero: PasajeroService


  ) {
    this.formularioRegistro = fb.group({

      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]],
      tipoUsuario: ['pasajero']

    })
  }

  ngOnInit() {
    this.tema.verificarTema()
  }

  async registrar() {
    this.cargando = true
    if (!this.validarCampos()) {
      this.cargando = false
      return;
    }
    const data = this.formularioRegistro.value
    console.log(data)
    try {
      const response: any = await lastValueFrom(this._pasajero.registrarPasajero(data))
      this._mensajeria.mostrarToast(response.message)
      this.cargando = false
      this.router.navigate(['login'])
      console.log(response)
    } catch (error: any) {
      console.log(error)
      this._mensajeria.mostrarAlert('Ha ocurrido un error, intente mas tarde')
      this.cargando = false

    }
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

}

