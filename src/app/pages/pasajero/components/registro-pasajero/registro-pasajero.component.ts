import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { PasajeroService } from 'src/app/services/pasajero/pasajero.service';

@Component({
  selector: 'app-registro-pasajero',
  templateUrl: './registro-pasajero.component.html',
  styleUrls: ['./registro-pasajero.component.scss'],
})
export class RegistroPasajeroComponent {

  formularioRegistro!: FormGroup

  constructor(
    private fb: FormBuilder,
    private _auth: AuthServiceService,
    private _pasajero: PasajeroService
  ) {

    this.formularioRegistro = fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

  }

  registrar() {

    if (!this._auth.validarCampos(this.formularioRegistro)) {
      return
    }

    const data = {
      username: this.formularioRegistro.get('username')?.value,
      email: this.formularioRegistro.get('email')?.value,
      password: this.formularioRegistro.get('password')?.value,
    }

    this._pasajero.registrarPasajero(data)

  }

  validarCampo(nombre: string): string {
    return this._auth.validarCampo(this.formularioRegistro, nombre)
  }

}
