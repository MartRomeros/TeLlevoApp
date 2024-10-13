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

    this.router.navigate([`pasajero/${ruta}`])

  }

}
