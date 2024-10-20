import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-pasajero',
  templateUrl: './footer-pasajero.component.html',
  styleUrls: ['./footer-pasajero.component.scss'],
})
export class FooterPasajeroComponent {

  constructor(private router:Router) { }

  navigateTo(ruta:string){
    switch (ruta) {
      case 'home':
        this.router.navigate([`pasajero/${ruta}`])
        break;
      case 'perfil-pasajero':
        this.router.navigate([`pasajero/${ruta}`])
        break;
      case 'historial-viajes':
        this.router.navigate([`pasajero/${ruta}`])
        break;
      default:
        this.router.navigate([`${ruta}`])
        break;
    }
  }

}
