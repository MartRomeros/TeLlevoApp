import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { IonicModule } from '@ionic/angular';
import { ViajeDetailComponent } from '../viaje-detail/viaje-detail.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HeaderComponent, IonicModule, ViajeDetailComponent,FooterComponent]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("hola")
  }

}
