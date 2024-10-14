import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { FooterComponent } from 'src/app/pages/pasajero/components/footer/footer.component';
import { HeaderComponent } from 'src/app/pages/pasajero/components/header/header.component';

@Component({
  standalone:true,
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
  imports:[IonicModule,HeaderComponent,FooterComponent]
})
export class ConfiguracionComponent  implements OnInit {

  tema?:string
  paletteToggle = false

  constructor(private toast:ToastController) { 
    this.initDarkMode();
  }

  ngOnInit() {
    console.log()
  }

  initDarkMode(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkPalette(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }

   // Check/uncheck the toggle and update the palette based on isDark
   initializeDarkPalette(isDark: any) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark palette
  toggleChange(ev: any) {
    this.toggleDarkPalette(ev.detail.checked);
  }

  // Add or remove the "ion-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  TemaApp(){
    this.tema = document.querySelector("ion-radio-group")?.value
    switch (this.tema) {
      case 'oscuro':
        document.documentElement.style.setProperty("--ion-content-theme","#000")
        document.documentElement.style.setProperty("--ion-text-general","#fff")
        document.documentElement.style.setProperty('--ion-header-theme',"#ae00ff")
        this.presentToast('bottom','Oscuro')
        break;
      case 'claro':
        document.documentElement.style.setProperty("--ion-content-theme","#fff")
        document.documentElement.style.setProperty("--ion-text-general","#000")
        document.documentElement.style.setProperty('--ion-header-theme',"#b90000")
        this.presentToast('bottom','Claro')
        break;
      default:
        this.presentToast('bottom','del sistema')
        break;
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom',tema:string) {
    const toast = await this.toast.create({
      message: `Tema ${tema} aplicado!`,
      duration: 1500,
      position: position,
    });
    await toast.present();
  }



}
