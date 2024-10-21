import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConductorPageRoutingModule } from './conductor-routing.module';

import { ConductorPage } from './conductor.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { DriverHomeComponent } from './componentes/driver-home/driver-home.component';
import { HistorialConductorViajesComponent } from './componentes/historial-conductor-viajes/historial-conductor-viajes.component';
import { CrearViajeComponent } from './componentes/crear-viaje/crear-viaje.component';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { PerfilConductorComponent } from './componentes/perfil-conductor/perfil-conductor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConductorPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [DriverHomeComponent,ConductorPage,HistorialConductorViajesComponent,CrearViajeComponent,MapaComponent,PerfilConductorComponent],
  exports:[DriverHomeComponent]
})
export class ConductorPageModule {}
