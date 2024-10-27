import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl: string = "https://myths.cl/api"
  private usuarios: any = JSON.parse(localStorage.getItem('usuarios') || '[]')


  constructor(private client: HttpClient, private alert: AlertController, private router: Router) { }

  login(correo:string='',password:string=''){

    if(this.usuarios.length == 0){
      this.generarMensaje("No hay usuarios disponibles")
      return
    }

    for(let i = 0; i < this.usuarios.length; i++){
      if(correo == this.usuarios[i].correo){
        if(password == this.usuarios[i].password){
          console.log(this.usuarios[i])
          return
        }
      }
    }

    this.generarMensaje("usuario no valido!")
    return


  }

  logout() {
    localStorage.removeItem('sesion')
    this.router.navigate(['auth/login'])
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

    this.generarMensaje("Ingresa un correo valido!")
    return new Observable(observer => {
      observer.error("Usuario no valido!")
    })

  }

  generarClave(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const longitudClave = 8;
    let clave = '';

    for (let i = 0; i < longitudClave; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      clave += caracteres.charAt(indiceAleatorio);
    }

    return clave;
  }



  async generarMensaje(mensaje: string) {
    const alert = await this.alert.create({
      header: 'ATENCION!',
      message: mensaje,
      buttons: ['Action'],
    });

    await alert.present();

  }




}
