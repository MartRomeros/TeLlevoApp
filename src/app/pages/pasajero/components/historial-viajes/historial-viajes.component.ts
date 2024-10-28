import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-historial-viajes',
  templateUrl: './historial-viajes.component.html',
  styleUrls: ['./historial-viajes.component.scss'],
})
export class HistorialViajesComponent  implements OnInit {

  usuario:any

  historial:any = JSON.parse(localStorage.getItem('historial')||'[]')

  constructor(private tema:ThemeService) {}

  ngOnInit() {
    console.log()
    this.tema.verificarTema()
  }

}
