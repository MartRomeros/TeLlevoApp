import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-registro-chofer',
  templateUrl: './registro-chofer.component.html',
  styleUrls: ['./registro-chofer.component.scss'],
})
export class RegistroChoferComponent {

  registroForm!: FormGroup

  constructor(private fb: FormBuilder, private _auth: AuthServiceService) {

    this.registroForm = fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      patente: ['', Validators.required],
      marca: ['', Validators.required],
    })

  }

  registrar() {

    if (!this._auth.validarCampos(this.registroForm)) {
      return
    }

    const data = {
      username: this.registroForm.get('username')?.value,
      email: this.registroForm.get('email')?.value,
      password: this.registroForm.get('password')?.value,
      patente: this.registroForm.get('patente')?.value,
      marca: this.registroForm.get('marca')?.value
    }

    this._auth.registrarChofer(data)

  }

  validarCampo(nombre: string) {
    return this._auth.validarCampo(this.registroForm, nombre)
  }
}
