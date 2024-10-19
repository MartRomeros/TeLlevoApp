import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  standalone: true,
  selector: 'app-viaje-detail',
  templateUrl: './viaje-detail.component.html',
  styleUrls: ['./viaje-detail.component.scss'],
  imports: [
    IonicModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class ViajeDetailComponent implements OnInit {


  constructor(private router: Router, private alert: AlertController, private tema: ThemeService) { }

  ngOnInit(): void {
    this.tema.verificarTema()
  }

  goHome() {
    this.router.navigate(['pasajero/home'])
  }

  async presentAlert() {
    const alert = await this.alert.create({
      header: 'A Short Title Is Best',
      subHeader: 'A Sub Header Is Optional',
      message: 'A message should be a short, complete sentence.',
      buttons: ['Action'],
    });

    await alert.present();
  }




}
