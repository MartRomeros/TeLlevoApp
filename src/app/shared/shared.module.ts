import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HeaderPrincipalComponent } from './components/header-principal/header-principal.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { HeaderPasajeroComponent } from './components/header-pasajero/header-pasajero.component';
import { FooterPasajeroComponent } from './components/footer-pasajero/footer-pasajero.component';
import { HeaderConductorComponent } from './components/header-conductor/header-conductor.component';
import { FooterConductorComponent } from './components/footer-conductor/footer-conductor.component';



@NgModule({
  declarations: [
    HeaderPrincipalComponent,
    ConfiguracionComponent,
    HeaderPasajeroComponent,
    FooterPasajeroComponent,
    HeaderConductorComponent,
    FooterConductorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    HeaderPrincipalComponent,
    ConfiguracionComponent,
    HeaderPasajeroComponent,
    FooterPasajeroComponent,
    HeaderConductorComponent,
    FooterConductorComponent
  ]
})
export class SharedModule { }
