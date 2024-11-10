import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ViajeDetailComponent } from './components/viaje-detail/viaje-detail.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { HistorialViajesComponent } from './components/historial-viajes/historial-viajes.component';
import { RegistroPasajeroComponent } from './components/registro-pasajero/registro-pasajero.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'viaje-detail',
    component: ViajeDetailComponent
  },
  {
    path: 'perfil-pasajero',
    component: PerfilUsuarioComponent
  },
  {
    path: 'historial-viajes',
    component: HistorialViajesComponent
  },
  {
    path: 'registro-pasajero',
    component: RegistroPasajeroComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasajeroPageRoutingModule { }
