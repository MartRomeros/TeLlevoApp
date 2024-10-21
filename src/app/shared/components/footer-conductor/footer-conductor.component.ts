import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-conductor',
  templateUrl: './footer-conductor.component.html',
  styleUrls: ['./footer-conductor.component.scss'],
})
export class FooterConductorComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}

  navigateTo(ruta:string){
    switch (ruta) {
      case 'home':
        this.router.navigate([`conductor/${ruta}`])
        break;
      case 'perfil-conductor':
        this.router.navigate([`conductor/${ruta}`])
        break;
      case 'historial-viajes-conductor':
        this.router.navigate([`conductor/${ruta}`])
        break;
      case 'crear-viaje':
        this.router.navigate([`conductor/${ruta}`])
        break;
      case 'mapa':
        this.router.navigate([`conductor/${ruta}`])
        break;
      default:
        this.router.navigate([`${ruta}`])
        break;
    }
  }

}
