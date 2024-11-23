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
  private urlProduccion: string = 'https://charismatic-determination-production.up.railway.app/users'
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

  async login(data: user) {

    try {


      const usuario: any = await lastValueFrom(this.client.get(`${this.urlPrueba}/buscar_usuarios/${data.email}`))
      console.log("obteniendo tipo de usuario")
      const token = await lastValueFrom(this.client.post(`${this.urlPrueba}/${usuario.user.tipoUsuario}/login`, data))
      console.log(token)
      localStorage.setItem('usuario', JSON.stringify(usuario.user.email))
      localStorage.setItem('token', JSON.stringify(token))

      if (usuario.user.tipoUsuario == 'conductor') {
        this.router.navigate(['conductor/home-conductor'])
      }


    } catch (error: any) {

      if (error.status == 404) {
        this.mensajeria.mostrarAlert('Usuario no encontrado!')
      }

      console.log(error)

    }

  }

  logout() {
    localStorage.clear()
    this.router.navigate(['auth/login'])
  }

  async resetPassword(tipoUsuario: string, correo: string) {

    try {

      const data: any = { password: this.generatePassword(10) }

      const response1: any = await lastValueFrom(this.client.put(`${this.urlPrueba}/${tipoUsuario}/reset_password/${correo}`, data))
      this.mensajeria.mostrarToast(response1.message)
      //TO DO: MEJORAR EL CORREO ELECTRONICO ENVIADO!!
      const datos = {
        nombre: 'usuario',
        app: 'Te Llevo App',
        clave: data.password,
        email: correo
      }
      //await lastValueFrom(this.client.post(this.urlResetPassword, data))
      this.mensajeria.mostrarToast('En instantes deberas recibir un correo electronico de la aplicación')
      this.router.navigate(['login'])


    } catch (error: any) {

      if (error.status == 404) {
        this.mensajeria.mostrarAlert('Correo no valido!')
        return
      }
      console.log(error)
    }

  }

  generatePassword(length: number): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }


}
