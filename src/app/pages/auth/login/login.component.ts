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
    private _mensajeria: MensajeriaService,
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

    if (!this.verificarCampos()) {
      return
    }

    this.email = this.loginForm.get('correo')!.value
    this.password = this.loginForm.get('password')!.value

    this._auth.login(this.email, this.password)    

  }

  goTo(ruta: string) {
    this.router.navigate([`/auth/${ruta}`])
  }

  verificarCampos(): boolean {
    const campos = Object.keys(this.loginForm.controls)

    for (let i = 0; i < campos.length; i++) {
      const campo = this.loginForm.get(campos[i])
      if (campo?.errors) {
        this._mensajeria.mostrarAlert(`el campo ${campos[i]} presenta un error`)
        return false
      }
    }

    return true
  }

  hasError(name: string): string {
    if (this.loginForm.get(name)?.hasError('required')) {
      return 'Campo Requerido!'
    } else {
      return 'Formato Invalido!'
    }


  }

}
