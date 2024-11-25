import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { MensajeriaService } from 'src/app/services/mensajeria/mensajeria.service';
import { ViajesService } from 'src/app/services/viajes/viajes.service';

declare var google: any;

@Component({
  selector: 'app-home-conductor',
  templateUrl: './home-conductor.component.html',
  styleUrls: ['./home-conductor.component.scss'],
})

export class HomeConductorComponent implements OnInit {
  @ViewChild('map', { static: false }) mapElement!: ElementRef;

  viaje?: boolean


  public map: any;
  public start?: string;
  public end?: string;
  public directionsService: any;
  public directionsDisplay: any;
  public carrito: any[] = [];
  public input: string = "";
  public autocompleteItems: any[] = [];
  public distancia: string = "";
  public duracion: string = "";

  correo?: string
  id?: string
  destino?: string
  salida?: string
  fecha?: string
  capacidad?: string

  constructor(
    private _mensajeria: MensajeriaService,
    private _viaje: ViajesService,
    private platform: Platform,
    private zone: NgZone,
    private route: ActivatedRoute
  ) {
    if (!localStorage.getItem('viaje')) {
      this.viaje = false
    } else {
      this.viaje = true
    }
  }

  ngOnInit(): void {
    this.mostrarInfo()
    this.route.queryParams.subscribe(params => {
      this.start = params['lugarInicio'] || '';
      this.end = params['lugarFinal'] || '';
      this.platform.ready().then(() => {
        this.loadMap();
      });
    });
  }

  async mostrarInfo() {

    try {

      const email: string = JSON.parse(localStorage.getItem('usuario') || '')
      const response: any = await lastValueFrom(this._viaje.obtenerViajeByEmail(email))
      this.correo = response.getViaje[0].conductor
      this.fecha = response.getViaje[0].fechainicio
      this.id = response.getViaje[0].id
      this.capacidad = response.getViaje[0].capacidad
      this.salida = response.getViaje[0].salida
      this.destino = response.getViaje[0].destino

      this.start = this.salida
      this.end = this.destino

      this.calculateAndDisplayRoute()

    } catch (error: any) {

      console.log(error)

    }
  }

  initMap() {
    if (typeof google === 'undefined' || !google.maps) {
      console.error('Google Maps JavaScript API no está cargada.');
      return;
    }

    const mapOptions = {
      zoom: 7,
      center: { lat: -33.4489, lng: -70.6693 }, // Coordenadas iniciales (Santiago, Chile)
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();

    this.directionsDisplay.setMap(this.map);

    // Cargar información después de inicializar el mapa
    this.mostrarInfo();
  }

  calculateAndDisplayRoute() {
    this.directionsService.route(
      {
        origin: this.start,
        destination: this.end,
        travelMode: 'DRIVING',
      },
      (response: any, status: string) => {
        if (status === 'OK') {
          // Dibuja la ruta en el mapa
          this.directionsDisplay.setDirections(response);

          // Extrae y muestra solo la distancia y duración
          const route = response.routes[0];
          const leg = route.legs[0];

          // Distancia en kilómetros
          const distanceInKilometers = (leg.distance.value / 1000).toFixed(2);
          this.distancia = `${distanceInKilometers} km`;

          // Duración en formato mm:ss
          const durationInSeconds = leg.duration.value;
          const minutes = Math.floor(durationInSeconds / 60);
          const seconds = durationInSeconds % 60;
          const formattedDuration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          this.duracion = `${formattedDuration}`;

          console.log(`Distancia: ${this.distancia}`);
          console.log(`Duración: ${this.duracion}`);
        } else {
          window.alert('No se pudo calcular la ruta (' + status + ')');
        }
      }
    );
  }

  loadMap() {
    if (typeof google === 'undefined' || !google.maps) {
      console.error('Google Maps JavaScript API no está cargada.');
      return;
    }

    // Inicialización de los servicios de direcciones después de cargar la API
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();

    this.initMap();
  }



}
