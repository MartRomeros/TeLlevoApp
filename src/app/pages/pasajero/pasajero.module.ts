import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasajeroPageRoutingModule } from './pasajero-routing.module';

import { PasajeroPage } from './pasajero.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { HistorialViajesComponent } from './components/historial-viajes/historial-viajes.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { RegistroPasajeroComponent } from './components/registro-pasajero/registro-pasajero.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasajeroPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [PasajeroPage, HomeComponent, HistorialViajesComponent, PerfilUsuarioComponent, RegistroPasajeroComponent]
})
export class PasajeroPageModule { }
