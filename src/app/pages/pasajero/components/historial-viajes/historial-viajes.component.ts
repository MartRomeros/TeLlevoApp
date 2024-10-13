import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  standalone:true,
  selector: 'app-historial-viajes',
  templateUrl: './historial-viajes.component.html',
  styleUrls: ['./historial-viajes.component.scss'],
  imports:[IonicModule,HeaderComponent,FooterComponent]
})
export class HistorialViajesComponent  implements OnInit {

  constructor() {}

  ngOnInit() {
    console.log()
  }

}
