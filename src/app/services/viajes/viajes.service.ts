import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  private urlLocal: string = 'http://localhost:3000'
  private urlProduccion:string = 'https://vigilant-wholeness-production.up.railway.app'
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
    return this._http.post(`${this.urlProduccion}/viajes/crear_viaje`, viajeACrear)
  }

  obtenerViajeByEmail(email: string): Observable<any> {
    return this._http.get(`${this.urlProduccion}/viajes/viaje/${email}`)
  }

  obtenerViajeById(id: number): Observable<any> {
    return this._http.get(`${this.urlProduccion}/viajes/viaje_id/${id}`)
  }

  traerViajes(): Observable<any> {
    return this._http.get(`${this.urlProduccion}/viajes/all_viajes`)
  }

  crearSolicitud(data: any): Observable<any> {
    return this._http.post(`${this.urlProduccion}/solicitud/crear_solicitud`, data)
  }

  actualizarCapacidad(data: any, id: number): Observable<any> {
    return this._http.put(`${this.urlProduccion}/viajes/capacidad/${id}`, data)
  }

  traerSolicitudes(email: string): Observable<any> {
    return this._http.get(`${this.urlProduccion}/solicitud/solicitudes_pasajero/${email}`)
  }

}
