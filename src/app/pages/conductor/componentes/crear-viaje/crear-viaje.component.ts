import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ViajesService } from 'src/app/services/viajes/viajes.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

declare var google: any;

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.component.html',
  styleUrls: ['./crear-viaje.component.scss'],
})
export class CrearViajeComponent implements OnInit {

  datosViaje = {
    inicioViaje: '',
    lugarInicio: '',
    lugarFinal: '',
    capacidadPasajeros: null,
    nombre: '',
    correo: '',

  };

  autocompletadoInicio: any[] = [];
  autocompletadoFinal: any[] = [];
  GoogleAutocomplete: any;

  constructor(private navCtrl: NavController,
    private router: Router,
    private zone: NgZone,
    private viajesService: ViajesService,
    private theme: ThemeService) { // Inyectar el servicio
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  }

  ngOnInit() {
    console.log("")
    this.theme.verificarTema()
  }

  comienzoViaje() {
    console.log('Datos del viaje:', this.datosViaje);


    this.viajesService.nuevoViaje(this.datosViaje);


    this.router.navigate(['conductor/mapa'], {
      queryParams: {
        lugarInicio: this.datosViaje.lugarInicio,
        lugarFinal: this.datosViaje.lugarFinal
      }
    });
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
