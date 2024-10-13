import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonModal, IonInput, IonContent, IonHeader } from "@ionic/angular/standalone";
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-viaje-detail',
  templateUrl: './viaje-detail.component.html',
  styleUrls: ['./viaje-detail.component.scss'],
  imports:[
    IonicModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class ViajeDetailComponent {
  @ViewChild(IonModal) modal?:IonModal
  @Input() id?:string
  nombre?:string

  constructor() {}

  abrirModal(){}



}
