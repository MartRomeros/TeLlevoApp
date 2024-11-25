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

  basePrueba: string = 'http://localhost:3000'
  baseProduccion: string = 'https://steadfast-motivation-production.up.railway.app'

  constructor(
    private _http: HttpClient,
    private _mensajeria: MensajeriaService,
    private _router: Router
  ) { }

  async registrarConductor(data: conductor) {

    try {

      const response: any = await lastValueFrom(this._http.post(`${this.baseProduccion}/users/conductor/registro`, data))
      this._mensajeria.mostrarToast(response.message)
      this._router.navigate(['login'])

    } catch (error: any) {
      this._mensajeria.mostrarAlert(error.error.message)
    }
  }

  traerDatos(correo: string): Observable<any> {
    return this._http.get(`${this.baseProduccion}/users/conductor/${correo}`)
  }

}
