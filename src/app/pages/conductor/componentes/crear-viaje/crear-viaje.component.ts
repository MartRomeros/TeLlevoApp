import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ViajesService } from 'src/app/services/viajes/viajes.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { MensajeriaService } from 'src/app/services/mensajeria/mensajeria.service';
import { lastValueFrom } from 'rxjs';

declare var google: any;

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.component.html',
  styleUrls: ['./crear-viaje.component.scss'],
})
export class CrearViajeComponent implements OnInit {

  public cargando?:boolean
  datosViaje = {
    inicioViaje: '',
    lugarInicio: '',
    lugarFinal: '',
    capacidadPasajeros: null,
    correo: '',
    fecha: ''

  };

  autocompletadoInicio: any[] = [];
  autocompletadoFinal: any[] = [];
  GoogleAutocomplete: any;

  constructor(private navCtrl: NavController,
    private router: Router,
    private zone: NgZone,
    private viajesService: ViajesService,
    private theme: ThemeService,
    private _mensajeria: MensajeriaService) { // Inyectar el servicio
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  }

  ngOnInit() {
    this.theme.verificarTema()
  }

  async comienzoViaje() {
    this.cargando = true
    if (localStorage.getItem('viaje') == "undefined") {
      localStorage.removeItem('viaje')      
    }

    if (localStorage.getItem('viaje')) {
      console.log('viaje encontrado!')
      this._mensajeria.mostrarAlert('Ya tienes un viaje vigente!')
      this.cargando = false
      return
    }

    const correo = JSON.parse(localStorage.getItem('usuario') || '')
    this.datosViaje.correo = correo

    const fecha = new Date(this.datosViaje.inicioViaje).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    this.datosViaje.fecha = fecha

    try {
      const response: any = await lastValueFrom(this.viajesService.nuevoViaje(this.datosViaje))
      localStorage.setItem('viaje', JSON.stringify(this.datosViaje))
      this._mensajeria.mostrarToast(response.message)
      this.cargando = false
      this.router.navigate(['conductor/home-conductor'], { replaceUrl: true })
    } catch (error: any) {
      this.cargando = false
      console.log(error)
    }

  }

  updateSearchResults(type: string) {
    if (type === 'inicio' && this.datosViaje.lugarInicio.length > 0) {
      this.GoogleAutocomplete.getPlacePredictions({ input: this.datosViaje.lugarInicio }, (predictions: any, status: any) => {
        this.zone.run(() => {
          this.autocompletadoInicio = [];
          predictions.forEach((prediction: any) => {
            this.autocompletadoInicio.push(prediction);
          });
        });
      });
    } else if (type === 'final' && this.datosViaje.lugarFinal.length > 0) {
      this.GoogleAutocomplete.getPlacePredictions({ input: this.datosViaje.lugarFinal }, (predictions: any, status: any) => {
        this.zone.run(() => {
          this.autocompletadoFinal = [];
          predictions.forEach((prediction: any) => {
            this.autocompletadoFinal.push(prediction);
          });
        });
      });
    } else {
      this.autocompletadoInicio = [];
      this.autocompletadoFinal = [];
    }
  }

  selectSearchResult(type: string, item: any) {
    if (type === 'inicio') {
      this.datosViaje.lugarInicio = item.description;
      this.autocompletadoInicio = [];
    } else if (type === 'final') {
      this.datosViaje.lugarFinal = item.description;
      this.autocompletadoFinal = [];
    }
  }

}
