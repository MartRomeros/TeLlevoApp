import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  email!: string
  password!: string

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tema: ThemeService,
    private _auth: AuthServiceService
  ) {

    this.loginForm = fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      tipoUsuario: ['pasajeros', [Validators.required]],
    })

  }

  ngOnInit(): void {
    this.tema.verificarTema()
  }


  logIn() {

    if (!this._auth.validarCampos(this.loginForm)) {
      return
    }

    const data = {
      email: this.loginForm.get('correo')?.value,
      password: this.loginForm.get('password')?.value
    }
    const tipoUsuario: string = this.loginForm.get('tipoUsuario')?.value

    this._auth.login(data, tipoUsuario)

  }

  hasError(name: string): string {
    return this._auth.validarCampo(this.loginForm, name)
  }

}
