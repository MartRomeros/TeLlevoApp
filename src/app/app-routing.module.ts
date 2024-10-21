import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './shared/components/configuracion/configuracion.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'pasajero',
    loadChildren: () => import('./pages/pasajero/pasajero.module').then(m => m.PasajeroPageModule)
  },
  {
    path: 'conductor',
    loadChildren: () => import('./pages/conductor/conductor.module').then(m => m.ConductorPageModule)
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'conductor',
    loadChildren: () => import('./pages/conductor/conductor.module').then( m => m.ConductorPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
