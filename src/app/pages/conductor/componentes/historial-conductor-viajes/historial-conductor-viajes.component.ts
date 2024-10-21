import { Component, OnInit } from '@angular/core';
import { ViajesService } from 'src/app/services/viajes/viajes.service';

@Component({
  selector: 'app-historial-conductor-viajes',
  templateUrl: './historial-conductor-viajes.component.html',
  styleUrls: ['./historial-conductor-viajes.component.scss'],
})
export class HistorialConductorViajesComponent implements OnInit {

  viajes: any[] = [];

  constructor(private viajesService: ViajesService) { }

  ngOnInit(): void {
    this.viajes = this.viajesService.getViajes();
  }
}
