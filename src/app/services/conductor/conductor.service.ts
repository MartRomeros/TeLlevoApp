import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeriaService } from '../mensajeria/mensajeria.service';
import { conductor } from 'src/app/models/interfaces';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  basePrueba: string = 'http://localhost:3000'
  baseProduccion:string = 'https://charismatic-determination-production.up.railway.app'

  constructor(
    private _http: HttpClient,
    private _mensajeria: MensajeriaService,
    private _router: Router
  ) { }

  async registrarConductor(data: conductor) {

    try {

      const response: any = await lastValueFrom(this._http.post(`${this.basePrueba}/users/conductor/registro`, data))
      this._mensajeria.mostrarToast(response.message)
      this._router.navigate(['login'])

    } catch (error: any) {

      console.log(error)

    }

  }

}