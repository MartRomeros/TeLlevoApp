import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConductorPage } from './conductor.page';
import { DriverHomeComponent } from './componentes/driver-home/driver-home.component';
import { HistorialConductorViajesComponent } from './componentes/historial-conductor-viajes/historial-conductor-viajes.component';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { PerfilConductorComponent } from './componentes/perfil-conductor/perfil-conductor.component';
import { CrearViajeComponent } from './componentes/crear-viaje/crear-viaje.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'driver-home',
    pathMatch: 'full'
  },
  {
    path: 'driver-home',
    component: DriverHomeComponent
  },
  {
    path: 'historial-viajes-conductor',
    component: HistorialConductorViajesComponent
  },
  {
    path: 'mapa',
    component: MapaComponent
  },
  {
    path: 'perfil-conductor',
    component: PerfilConductorComponent
  },
  {
    path: 'crear-viaje',
    component: CrearViajeComponent
  },
  { path: 'crear-viaje', loadChildren: () => import('./componentes/crear-viaje/crear-viaje.component').then(m => m.CrearViajeComponent) },
  { path: 'crear-viaje', loadChildren: () => import('./componentes/mapa/mapa.component').then(m => m.MapaComponent) },
  {
    path: '**',
    redirectTo: 'driver-home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConductorPageRoutingModule { }
