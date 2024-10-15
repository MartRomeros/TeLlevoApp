import { Component} from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-viaje-detail',
  templateUrl: './viaje-detail.component.html',
  styleUrls: ['./viaje-detail.component.scss'],
  imports:[
    IonicModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class ViajeDetailComponent {


  constructor(private router:Router,private alert:AlertController){}

  goHome(){
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
