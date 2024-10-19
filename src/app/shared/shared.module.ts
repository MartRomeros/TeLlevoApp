import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderPrincipalComponent } from './components/header-principal/header-principal.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';



@NgModule({
  declarations: [HeaderPrincipalComponent,ConfiguracionComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[HeaderPrincipalComponent,ConfiguracionComponent]
})
export class SharedModule { }
