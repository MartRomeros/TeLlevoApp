import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  standalone:true,
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
  imports:[HeaderComponent,FooterComponent,IonicModule]
})
export class PerfilUsuarioComponent  implements OnInit {

  constructor(private tema:ThemeService) { }

  ngOnInit() {
    console.log()
    this.tema.verificarTema()
  }

}
