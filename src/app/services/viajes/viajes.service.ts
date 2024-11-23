import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  private urlPrueba: string = 'http://localhost:3000/viajes'
  private viajesKey = 'viajes';

  constructor(
    private _http: HttpClient
  ) { }


  getViajes(): any[] {
    const viajes = localStorage.getItem(this.viajesKey);
    return viajes ? JSON.parse(viajes) : [];
  }


  nuevoViaje(viaje: any): Observable<any> {
    const viajeACrear = {
      fechaInic: viaje.fecha,
      horaInic: viaje.inicioViaje,
      capacidad: viaje.capacidadPasajeros,
      conductor: viaje.correo,
      destino: viaje.lugarFinal,
      salida: viaje.lugarInicio
    }
    return this._http.post(`${this.urlPrueba}/crear_viaje`, viajeACrear)
  }

  obtenerViajeByEmail(email: string): Observable<any> {
    return this._http.get(`${this.urlPrueba}/viaje/${email}`)
  }
}
