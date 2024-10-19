import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  standalone:true,
  selector: 'app-historial-viajes',
  templateUrl: './historial-viajes.component.html',
  styleUrls: ['./historial-viajes.component.scss'],
  imports:[IonicModule,HeaderComponent,FooterComponent]
})
export class HistorialViajesComponent  implements OnInit {

  constructor(private tema:ThemeService) {}

  ngOnInit() {
    console.log()
    this.tema.verificarTema()
  }

}
