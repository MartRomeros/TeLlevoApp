import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  usuario: any = {}

  constructor() { }



  traerDatosUsuario() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
    const sesion = JSON.parse(localStorage.getItem('sesion') || '[]')

    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].correo == sesion.correo) {
        this.usuario.correo = usuarios[i].correo
        this.usuario.nombre = usuarios[i].nombre
        this.usuario.apellido = usuarios[i].apellido
        break
      }
    }

    return this.usuario

  }

}
