import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MensajeriaService } from '../mensajeria/mensajeria.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl: string = "https://myths.cl/api"
  private usuarios: any []= []
  private usuarioConductor?: any


  constructor(
    private client: HttpClient,
    private router: Router,
    private mensajeria: MensajeriaService
  ) { }



  //GETTER Y SETTER
  getUsuarioConductor() {
    return this.usuarioConductor
  }

  setUsuarioConductor(usuario: any) {
    this.usuarioConductor = usuario
  }



  login(correo: string = '', password: string = '') {

    if (this.usuarios.length == 0) {
      this.mensajeria.mostrarAlert('No hay usuarios disponibles')
      return
    }

    for (let i = 0; i < this.usuarios.length; i++) {
      if (correo == this.usuarios[i].correo) {
        if (password == this.usuarios[i].password) {
          if (this.usuarios[i].tipoUsuario == 'pasajero') {
            localStorage.setItem('sesion', JSON.stringify({ correo: correo, password: password }))
            this.router.navigate(['pasajero'])
            this.mensajeria.mostrarToast(`bienvenido ${this.usuarios[i].nombre}`)
            return
          } else {
            localStorage.setItem('sesion', JSON.stringify({ correo: correo, password: password }))
            this.mensajeria.mostrarToast(`bienvenido ${this.usuarios[i].nombre}`)
            this.router.navigate(['conductor'])
            return
          }

        }
      }
    }

    this.mensajeria.mostrarAlert('usuario no valido!')
    return

  }

  logout() {
    localStorage.removeItem('sesion')
    this.router.navigate(['auth/login'])
  }

  registrar(usuario: any) {

    for (let i = 0; i < this.usuarios.length; i++) {
      if (usuario.correo == this.usuarios[i].correo || usuario.password == this.usuarios[i].password) {
        this.mensajeria.mostrarToast('Credenciales ya registradas!')
        return
      }
    }

    this.usuarios.push(usuario)
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios))
    this.mensajeria.mostrarToast('Usuario registrado!')

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
