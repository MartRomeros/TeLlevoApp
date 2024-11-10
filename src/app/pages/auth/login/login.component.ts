import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      password: ['', [Validators.required]]
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
      password: this.loginForm.get('password')?.value,
    }

    this._auth.loginPasajero(data)

  }

  hasError(name: string): string {
    return this._auth.validarCampo(this.loginForm, name)
  }

}
