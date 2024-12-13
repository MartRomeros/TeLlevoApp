import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { MensajeriaService } from 'src/app/services/mensajeria/mensajeria.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { ViajesService } from 'src/app/services/viajes/viajes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  email!: string
  password!: string
  public cargando?: boolean

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tema: ThemeService,
    private _auth: AuthServiceService,
    private _router: Router,
    private _viaje: ViajesService,
    private _mensajeria: MensajeriaService
  ) {

    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

  }

  ngOnInit(): void {
    this.tema.verificarTema()
  }


  async logIn() {
    this.cargando = true
    if (!this._auth.validarCampos(this.loginForm)) {
      this.cargando = false
      return
    }
    try {
      const data = this.loginForm.value
      //obetenmos el tipo de usuario para armar la url
      const response: any = await lastValueFrom(this._auth.obtenerTipoUsuario(data.email))
      //iniciamos sesion y traemos el token
      const response2: any = await lastValueFrom(this._auth.login(data, response.user.tipousuario))
      const response3: any = await lastValueFrom(this._viaje.obtenerViajeByEmail(data.email))
      const response4:any = await lastValueFrom(this._viaje.traerSolicitudes(data.email))


      console.log(response4.solicitudes[0])

      localStorage.setItem('token', JSON.stringify(response2.token))
      localStorage.setItem('usuario', JSON.stringify(response2.user.email))
      localStorage.setItem('tipo', JSON.stringify(response2.user.tipousuario))

      this.cargando = false
      switch (response2.user.tipousuario) {
        case 'conductor':
          localStorage.setItem('viaje', JSON.stringify(response3.getViaje[0]))
          this._router.navigate(['conductor/home-conductor'])
          break;
        case 'pasajero':
          localStorage.setItem('solicitud',JSON.stringify(response4.solicitudes[0]))
          this._router.navigate(['pasajero/home'])
          break
        default:
          break;
      }
    } catch (error: any) {
      this.cargando = false
      if (error.status == 0) {
        this._mensajeria.mostrarAlert('Ha ocurrido un error, intente mas tarde!')
        return
      }
      this._mensajeria.mostrarAlert(error.error.message)
    }
  }

  hasError(name: string): string {
    return this._auth.validarCampo(this.loginForm, name)
  }

}
