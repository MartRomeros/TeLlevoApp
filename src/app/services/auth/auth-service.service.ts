import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { MensajeriaService } from '../mensajeria/mensajeria.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private urlPrueba: string = 'http://localhost:3000'
  private baseUrl: string = "https://myths.cl/api"
  private usuarios: any[] = JSON.parse(localStorage.getItem('users') || '[]')


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



  async loginPasajero(data: any) {

    try {

      const results: any = await lastValueFrom(this.client.post(`${this.urlPrueba}/users/pasajero/login`, data))
      localStorage.setItem('sesion', JSON.stringify(results.token))
      console.log(results.token)

    } catch (error) {

      console.log(error)

    }

  }

  logout() {
    localStorage.removeItem('sesion')
    this.router.navigate(['auth/login'])
  }


  async registrarPasajero(data: any) {

    try {

      const results: any = await lastValueFrom(this.client.post(`${this.urlPrueba}/users/pasajero/registro`, data))
      this.mensajeria.mostrarToast(results.message)
      this.router.navigate(['auth/login'])

    } catch (error) {

      console.log(error)

    }

  }



  resetPassword(nombre: string, correo: string): Observable<any> {
    //traemos el localstorage
    this.usuarios = JSON.parse(localStorage.getItem('usuarios') || "[]")

    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].correo == correo) {
        const nuevaClave = this.generarClave()
        this.usuarios[i].password = nuevaClave

        const data = {
          nombre: nombre,
          app: "TellevoApp",
          clave: nuevaClave,
          email: correo
        }

        localStorage.setItem('usuarios', JSON.stringify(this.usuarios))

        return this.client.post(`${this.baseUrl}/reset_password.php`, data)
      }
    }

    this.mensajeria.mostrarToast('Ingresa un correo valido!')
    return new Observable(observer => {
      observer.error("Usuario no valido!")
    })

  }

  generarClave(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const longitudClave = 10;
    let clave = '';

    for (let i = 0; i < longitudClave; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      clave += caracteres.charAt(indiceAleatorio);
    }

    return clave;
  }






}
