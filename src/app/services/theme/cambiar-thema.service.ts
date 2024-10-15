import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class CambiarThemaService {
  private estado?:string
  private storage?:Storage

  getEstado(){
    return this.estado
  }

  setEstado(estado:string){
    this.estado = estado
  }


  cambiarTema() {
    if (this.estado == "Claro"){
      document.documentElement.style.setProperty("--ion-content-theme","#000")
      document.documentElement.style.setProperty("--ion-text-general","#fff")
      document.documentElement.style.setProperty("--ion-ripple-theme","#fff")
      this.storage?.setItem('tema','oscuro')
      this.setEstado("Oscuro")
    }else{
      document.documentElement.style.setProperty("--ion-content-theme","#fff")
      document.documentElement.style.setProperty("--ion-text-general","#000")
      document.documentElement.style.setProperty("--ion-ripple-theme","#d1cece")
      this.storage?.setItem('tema','claro')
      this.setEstado("Claro")
    }
  }

}

