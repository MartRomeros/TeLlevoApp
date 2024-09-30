import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
//shared module
import { SharedModule } from 'src/app/shared/shared.module';
//viajes disponibles
import { TravelsComponent } from './components/travels/travels.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [HomePage,TravelsComponent]
})
export class HomePageModule {}
