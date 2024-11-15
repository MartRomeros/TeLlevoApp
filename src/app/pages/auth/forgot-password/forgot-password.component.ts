import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm!: FormGroup
  cargando?: boolean

  constructor(
    private fb: FormBuilder,
    private authServicio: AuthServiceService,
    private tema: ThemeService,
  ) {

    this.forgotForm = fb.group({
      correo: ['', [Validators.required, Validators.email]],
      tipoUsuario: ['', Validators.required]
    })
  }

  ngOnInit() {

    this.cargando = false
    this.tema.verificarTema()
  }

  recuperarPassword() {

    if (!this.authServicio.validarCampos(this.forgotForm)) {
      return
    }

    const tipoUsuario = this.forgotForm.get('tipoUsuario')?.value
    const email = this.forgotForm.get('correo')?.value

    this.authServicio.resetPassword(tipoUsuario, email)



  }

  validarCampo(nombre: string): string {
    return this.authServicio.validarCampo(this.forgotForm, nombre)
  }

}
