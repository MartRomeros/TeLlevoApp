import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {
  private viajesKey = 'viajes';

  constructor() { }


  getViajes(): any[] {
    const viajes = localStorage.getItem(this.viajesKey);
    return viajes ? JSON.parse(viajes) : [];
  }


  nuevoViaje(viaje: any): void {
    const viajes = this.getViajes();

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
    const sesion = JSON.parse(localStorage.getItem('sesion')|| '[]')

    for(let i = 0; i < usuarios.length;i++){
      if(usuarios[i].correo == sesion.correo){
        viaje.correo = usuarios[i].correo
        viaje.nombre = usuarios[i].nombre
        break
      }
    }

    viajes.push(viaje);
    localStorage.setItem(this.viajesKey, JSON.stringify(viajes));
  }
}
