import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone:true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports:[
    IonicModule
  ]
})
export class FooterComponent{

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
