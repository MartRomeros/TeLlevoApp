import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { IonicModule } from '@ionic/angular';
import { ViajeDetailComponent } from '../viaje-detail/viaje-detail.component';
import { FooterComponent } from '../footer/footer.component';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HeaderComponent, IonicModule, ViajeDetailComponent,FooterComponent]
})
export class HomeComponent implements OnInit {

  constructor(private tema:ThemeService) { }

  ngOnInit() {
    console.log("hola")
    this.tema.verificarTema()
  }

}
