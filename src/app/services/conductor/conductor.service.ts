import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeriaService } from '../mensajeria/mensajeria.service';
import { conductor } from 'src/app/models/interfaces';
import { lastValueFrom, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  private basePrueba: string = 'http://localhost:3000/'
  private baseProduccion: string = 'https://vigilant-wholeness-production.up.railway.app/'

  constructor(
    private _http: HttpClient,
    private _mensajeria: MensajeriaService,
    private _router: Router
  ) { }

  registrarConductor(data: conductor): Observable<any> {
    return this._http.post(`${this.baseProduccion}users/conductor/registro`, data)
  }

  traerDatos(correo: string): Observable<any> {
    return this._http.get(`${this.baseProduccion}users/conductor/${correo}`)
  }

}
