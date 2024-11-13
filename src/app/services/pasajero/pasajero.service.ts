import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeriaService } from '../mensajeria/mensajeria.service';
import { pasajero } from 'src/app/models/interfaces';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PasajeroService {

  baseUrlDesarrollo: string = 'http://localhost:3000/users/pasajeros'

  constructor(
    private _http: HttpClient,
    private _mensajeria: MensajeriaService,
    private _router: Router
  ) { }

  async registrarPasajero(data: pasajero) {

    try {

      const response: any = await lastValueFrom(this._http.post(`${this.baseUrlDesarrollo}/registro`, data))
      this._mensajeria.mostrarToast(response.message)
      this._router.navigate(['login'])

    } catch (error: any) {

      if (error.status == 400) {
        this._mensajeria.mostrarAlert(error.error.message)
      }
      console.log(error)

    }

  }


}
