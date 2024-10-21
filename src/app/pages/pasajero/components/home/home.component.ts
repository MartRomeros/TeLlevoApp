import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { ViajesService } from 'src/app/services/viajes/viajes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  viajes: any[] = [];

  constructor(private tema:ThemeService, private viajesService: ViajesService) { }


  ngOnInit(): void {
    console.log("hola")
    this.tema.verificarTema()
    this.viajes = this.viajesService.getViajes();
  }

}
