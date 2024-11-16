import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConductorPageRoutingModule } from './conductor-routing.module';

import { ConductorPage } from './conductor.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearViajeComponent } from './componentes/crear-viaje/crear-viaje.component';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { PerfilConductorComponent } from './componentes/perfil-conductor/perfil-conductor.component';
import { RegistroChoferComponent } from './componentes/registro-chofer/registro-chofer.component';
import { HomeConductorComponent } from './componentes/home-conductor/home-conductor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConductorPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [ConductorPage, CrearViajeComponent, MapaComponent, PerfilConductorComponent, RegistroChoferComponent, HomeConductorComponent],
  exports: []
})
export class ConductorPageModule { }
