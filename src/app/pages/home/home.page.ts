import { Component } from '@angular/core';
import { CambiarThemaService } from 'src/app/services/theme/cambiar-thema.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  constructor(private cambiarTema: CambiarThemaService) { }

}
