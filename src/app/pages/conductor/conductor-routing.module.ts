import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaComponent } from './componentes/mapa/mapa.component';
import { PerfilConductorComponent } from './componentes/perfil-conductor/perfil-conductor.component';
import { CrearViajeComponent } from './componentes/crear-viaje/crear-viaje.component';
import { RegistroChoferComponent } from './componentes/registro-chofer/registro-chofer.component';
import { HomeConductorComponent } from './componentes/home-conductor/home-conductor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'historial-viajes-conductor',
    pathMatch: 'full'
  },
  {
    path: 'mapa',
    component: MapaComponent
  },
  {
    path: 'registro-chofer',
    component: RegistroChoferComponent
  },
  {
    path: 'perfil-conductor',
    component: PerfilConductorComponent
  },
  {
    path: 'crear-viaje',
    component: CrearViajeComponent
  },
  {
    path: 'home-conductor',
    component: HomeConductorComponent
  },

  { path: 'crear-viaje', loadChildren: () => import('./componentes/crear-viaje/crear-viaje.component').then(m => m.CrearViajeComponent) },
  { path: 'crear-viaje', loadChildren: () => import('./componentes/mapa/mapa.component').then(m => m.MapaComponent) },
  {
    path: '**',
    redirectTo: 'historial-viajes-conductor',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConductorPageRoutingModule { }
