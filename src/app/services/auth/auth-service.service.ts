import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MensajeriaService } from '../mensajeria/mensajeria.service';
import { FormGroup } from '@angular/forms';
import { user } from 'src/app/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private urlPrueba: string = 'http://localhost:3000/users'
  private urlResetPassword: string = "https://myths.cl/api"


  constructor(
    private client: HttpClient,
    private router: Router,
    private mensajeria: MensajeriaService
  ) { }

  validarCampos(formulario: FormGroup): boolean {

    const campos = Object.keys(formulario.controls)

    for (let index = 0; index < campos.length; index++) {
      const campo = formulario.get(campos[index])
      if (campo?.errors) {
        this.mensajeria.mostrarAlert(`El campo ${campos[index]} presenta un error`)
        return false
      }
    }
    return true
  }

  validarCampo(formulario: FormGroup, nombre: string): string {

    if (formulario.get(nombre)?.hasError('required') && formulario.get(nombre)?.touched) {
      return `${nombre} es requerido!`

    } else if (formulario.get(nombre)?.hasError('email') && formulario.get(nombre)?.touched) {
      return `formato invalido!`

    } else {
      return ``
    }

  }

  async login(data: user, tipoUsuario: string) {

    try {

      const response = await lastValueFrom(this.client.post(`${this.urlPrueba}/${tipoUsuario}/login`, data))
      console.log(response)

    } catch (error: any) {

      if (error.status == 404) {
        this.mensajeria.mostrarAlert('Usuario no encontrado!')
      }

      console.log(error)

    }

  }

  logout() {
    localStorage.removeItem('sesion')
    this.router.navigate(['auth/login'])
  }

  async resetPassword(tipoUsuario: string, correo: string) {

    try {

      const results: any = await lastValueFrom(this.client.get(`${this.urlPrueba}/users/${tipoUsuario}/${correo}`))
      console.log(results)

      //const nuevaClave = this.generarClave()

      const data = {
        nombre: results.user.username,
        app: 'Te llevo App',
        clave: 'nuevaClave',
        email: results.user.email
      }

      await lastValueFrom(this.client.post(`${this.urlResetPassword}/reset_password.php`, data))
      await lastValueFrom(this.client.put(`${this.urlPrueba}/users/${tipoUsuario}/reset-password/${results.user.id}`, { password: 'nuevaClave' }))

      this.mensajeria.mostrarToast('Correo enviado!')
      this.router.navigate(['/login'])

    } catch (error: any) {

      if (error.status == 404) {
        this.mensajeria.mostrarAlert('Correo no valido!')
        return
      }
      console.log(error)
    }

  }
}
