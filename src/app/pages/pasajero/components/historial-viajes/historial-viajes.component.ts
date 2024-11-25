import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { ViajesService } from 'src/app/services/viajes/viajes.service';

@Component({
  selector: 'app-historial-viajes',
  templateUrl: './historial-viajes.component.html',
  styleUrls: ['./historial-viajes.component.scss'],
})
export class HistorialViajesComponent implements OnInit {

  usuario: any

  historial: any = []

  constructor(private tema: ThemeService, private _viaje: ViajesService) { this.traerSolicitudes()}

  ngOnInit() {
    this.tema.verificarTema()
    this.traerSolicitudes()
  }

  async traerSolicitudes() {
    try {
      const email: any = localStorage.getItem('usuario')
      const response = await lastValueFrom(this._viaje.traerSolicitudes(email))
      console.log(response)
      this.historial = response.solicitudes
    } catch (error: any) {

    }
  }

}
