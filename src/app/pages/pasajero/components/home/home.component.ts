import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
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
    private alert: AlertController
  ) {
    this.viajeRequestForm = fb.group({
      viajeInic: [''],
      viajeTerm: [''],
      nombre: ['']
    })

  }


  ngOnInit(): void {
    console.log("hola")
    this.tema.verificarTema()
    this.viajes = this.viajesService.getViajes();
  }

  solicitarViaje() {
    const viaje = document.querySelector("ion-card-title")?.textContent
    const viajes = JSON.parse(localStorage.getItem('viajes') || '[]')
    for (let index = 0; index < viajes.length; index++) {
      if (viaje == viajes[index].lugarInicio) {
        if (viajes[index].capacidadPasajeros == 0) {
          this.presentAlert("No quedan cupos disponibles!")
          return

        }
        viajes[index].capacidadPasajeros = viajes[index].capacidadPasajeros - 1
        localStorage.setItem('historial', JSON.stringify({ viajeInic: viajes[index].lugarInicio, viajeTer: viajes[index].lugarFinal }))
        break
      }

    }

    const historialViajes = JSON.parse(localStorage.getItem('historial') || '[]')


    localStorage.setItem('viajes', JSON.stringify(viajes))
    this.presentAlert("tu viaje se ha reservado con exito")
    this.viajes = this.viajesService.getViajes()
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alert.create({
      header: 'ATENCION!',
      message: mensaje,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }



}
