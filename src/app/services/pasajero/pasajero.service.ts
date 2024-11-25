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
  baseProduccion: string = 'https://charismatic-determination-production.up.railway.app/pasajeros'

  constructor(
    private _http: HttpClient,
    private _mensajeria: MensajeriaService,
    private _router: Router
  ) { }

  registrarPasajero(data: any): Observable<any> {
    return this._http.post(`${this.baseUrlDesarrollo}/users/pasajero/registro`, data)
  }

  traerDatos(email: string): Observable<any> {
    return this._http.get(`${this.baseUrlDesarrollo}/users/pasajero/${email}`)
  }


}
