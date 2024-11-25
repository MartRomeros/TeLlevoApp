import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeriaService } from '../mensajeria/mensajeria.service';
import { pasajero } from 'src/app/models/interfaces';
import { lastValueFrom, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PasajeroService {

  baseUrlDesarrollo: string = 'http://localhost:3000'
  baseProduccion: string = 'https://steadfast-motivation-production.up.railway.app'

  constructor(
    private _http: HttpClient,
    private _mensajeria: MensajeriaService,
    private _router: Router
  ) { }

  registrarPasajero(data: any): Observable<any> {
    return this._http.post(`${this.baseProduccion}/users/pasajero/registro`, data)
  }

  traerDatos(email: string): Observable<any> {
    return this._http.get(`${this.baseProduccion}/users/pasajero/${email}`)
  }


}
