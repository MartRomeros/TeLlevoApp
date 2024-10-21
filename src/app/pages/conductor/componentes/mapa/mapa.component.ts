import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  @ViewChild('map', { static: false }) mapElement!: ElementRef;

  public map: any;
  public start: string = "";
  public end: string = "";
  public directionsService: any;
  public directionsDisplay: any;
  public carrito: any[] = [];
  public input: string = "";
  public autocompleteItems: any[] = [];
  public distancia: string = "";
  public duracion: string = "";

  constructor(private platform: Platform, private zone: NgZone, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.start = params['lugarInicio'] || '';
      this.end = params['lugarFinal'] || '';
      this.platform.ready().then(() => {
        this.loadMap();
      });
    });
  }

  loadMap() {
    if (typeof google === 'undefined' || !google.maps) {
      console.error('Google Maps JavaScript API no está cargada.');
      return;
    }
    this.initMap();
  }

  initMap() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();

    const mapOptions = {
      zoom: 5,
      zoomControl: false,
      scaleControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let infoWindow = new google.maps.InfoWindow();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Estas aquí.");
          infoWindow.open(this.map);
          this.map.setCenter(pos);
        }
      );
    }

    this.directionsDisplay.setMap(this.map);
    this.calculateAndDisplayRoute();
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
          this.directionsDisplay.setDirections(response);
          const route = response.routes[0];
          const leg = route.legs[0];

          const distanceInKilometers = (leg.distance.value / 1000).toFixed(2);
          console.log(`Distancia: ${distanceInKilometers} km`);
          this.distancia = `${distanceInKilometers} km`;

          const durationInSeconds = leg.duration.value;
          const minutes = Math.floor(durationInSeconds / 60);
          const seconds = durationInSeconds % 60;
          const formattedDuration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          console.log(`Duración: ${formattedDuration} (mm:ss)`);
          this.duracion = `${formattedDuration}`;

          console.log(`Inicio: ${leg.start_address}`);
          console.log(`Destino: ${leg.end_address}`);

          if (leg.duration_in_traffic) {
            const durationInTraffic = leg.duration_in_traffic.value / 60;
            console.log(`Tiempo de viaje en tráfico: ${durationInTraffic} minutos`);
          }

          leg.steps.forEach((step: any, index: number) => {
            const stepDistance = step.distance.value / 1000;
            const stepDuration = step.duration.value / 60;
            console.log(`Paso ${index + 1}: ${step.instructions}, Distancia: ${stepDistance} km, Tiempo: ${stepDuration} minutos`);
          });
        } else {
          window.alert('Para ver el mapa debe agregar un viaje (' + status + ')');
        }
      }
    );
  }

  updateSearchResults() {
    const GoogleAutocomplete = new google.maps.places.AutocompleteService();
    if (this.end === '') {
      this.autocompleteItems = [];
      return;
    }
    GoogleAutocomplete.getPlacePredictions({ input: this.end }, (predictions: any, status: any) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction: any) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  selectSearchResult(item: any) {
    this.end = item.description;
    this.autocompleteItems = [];
    this.initMap();
  }
}