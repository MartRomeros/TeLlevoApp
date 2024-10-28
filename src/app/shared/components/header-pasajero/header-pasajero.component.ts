import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-header-pasajero',
  templateUrl: './header-pasajero.component.html',
  styleUrls: ['./header-pasajero.component.scss'],
})
export class HeaderPasajeroComponent{

  constructor(private router: Router, private authServicios: AuthServiceService) { }


  logOut() {
    this.authServicios.logout()
  }

  navigateTo(ruta:string){
    this.router.navigate([ruta])
  }

}
