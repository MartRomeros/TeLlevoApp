import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone:true,
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
  imports:[HeaderComponent,FooterComponent,IonicModule]
})
export class PerfilUsuarioComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log()
  }

}
