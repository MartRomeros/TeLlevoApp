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
    viajes.push(viaje);
    localStorage.setItem(this.viajesKey, JSON.stringify(viajes));
  }
}
