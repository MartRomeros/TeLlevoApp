import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderPrincipalComponent } from './components/header-principal/header-principal.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { HeaderPasajeroComponent } from './components/header-pasajero/header-pasajero.component';
import { FooterPasajeroComponent } from './components/footer-pasajero/footer-pasajero.component';



@NgModule({
  declarations: [HeaderPrincipalComponent, ConfiguracionComponent, HeaderPasajeroComponent, FooterPasajeroComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HeaderPrincipalComponent, ConfiguracionComponent, HeaderPasajeroComponent, FooterPasajeroComponent]
})
export class SharedModule { }
