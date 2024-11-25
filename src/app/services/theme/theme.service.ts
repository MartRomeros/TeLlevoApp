import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  tema?: string

  constructor() { }

  TemaApp() {
    this.tema = JSON.parse(localStorage.getItem('tema')!)
    switch (this.tema) {
      case 'oscuro':
        document.documentElement.style.setProperty("--ion-content-theme", "#000")
        document.documentElement.style.setProperty("--ion-text-general", "#fff")
        document.documentElement.style.setProperty("--ion-header-theme", "#87249d")
        break;
      case 'claro':
        document.documentElement.style.setProperty("--ion-content-theme", "#fff")
        document.documentElement.style.setProperty("--ion-text-general", "#000")
        document.documentElement.style.setProperty("--ion-header-theme", "#0054e9")
        break;
      default:
        break;
    }
  }

  temaPredeterminado() {
    localStorage.setItem('tema', JSON.stringify('claro'))
  }

  cambiarTema(tema: string) {
    localStorage.setItem('tema', JSON.stringify(tema))
  }

  verificarTema() {
    if (JSON.parse(localStorage.getItem('tema')!) == "oscuro") {
      this.TemaApp()
    }
  }

}
