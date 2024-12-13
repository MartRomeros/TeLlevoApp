import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { MensajeriaService } from 'src/app/services/mensajeria/mensajeria.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { ViajesService } from 'src/app/services/viajes/viajes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  viajeRequestForm?: any
  viajes: any[] = [];

  constructor(private tema: ThemeService, private viajesService: ViajesService, private fb: FormBuilder,
    private alert: AlertController,
    private _mensajeria: MensajeriaService,
    private _router: Router
  ) {
    this.viajeRequestForm = fb.group({
      viajeInic: [''],
      viajeTerm: [''],
      nombre: ['']
    })

  }


  ngOnInit(): void {
    if (localStorage.getItem('viaje') == "undefined") {
      localStorage.removeItem('solicitud')
    } else if (!localStorage.getItem('viaje')) {
      localStorage.removeItem('solicitud')
    }

    this.tema.verificarTema()
    this.traerViajes()
  }

  async traerViajes() {
    try {
      const response: any = await lastValueFrom(this.viajesService.traerViajes())
      this.viajes = response
    } catch (error: any) {
    }
  }

  async mostrarInfo(id: number) {
    try {
      const response: any = await lastValueFrom(this.viajesService.obtenerViajeById(id))
      this._mensajeria.mostrarActionSheet(response.getViaje)
    } catch (error: any) {
    }
  }

  async solicitarViaje(id: number) {
    if (localStorage.getItem('solicitud')) {
      this._mensajeria.mostrarAlert('Ya tienes una solicitud pendiente!')
      return
    }
    try {
      const viaje: any = await lastValueFrom(this.viajesService.obtenerViajeById(id))
      const correo = JSON.parse(localStorage.getItem('usuario')!)
      const data = {
        pasajero: correo,
        salida: viaje.getViaje.salida,
        destino: viaje.getViaje.destino,
        fechainicio: viaje.getViaje.fechainicio,
        horainicio: viaje.getViaje.fechainicio,
        capacidad: viaje.getViaje.capacidad,
        conductor: viaje.getViaje.conductor,
      }
      const capacidad = viaje.getViaje.capacidad - 1
      const data2: any = { capacidad: capacidad }
      const response: any = await lastValueFrom(this.viajesService.crearSolicitud(data))
      this._mensajeria.mostrarToast(response.message)
      this._router.navigate(['pasajero/historial-viajes'])
      const response2: any = await lastValueFrom(this.viajesService.actualizarCapacidad(data2, id))
      localStorage.setItem('solicitud', JSON.stringify(data))
    } catch (error: any) {
      console.log(error)

    }
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.traerViajes()
      event.target.complete();
    }, 2000);
  }

}
