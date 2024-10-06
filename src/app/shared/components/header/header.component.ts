import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { CambiarThemaService } from 'src/app/services/theme/cambiar-thema.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo?:string
  temaEstado?:string

  constructor(private cambiarTema: CambiarThemaService) { }

  ngOnInit(): void {
    this.cambiarTema.setEstado("Claro")
    this.temaEstado = this.cambiarTema.getEstado()
  }

  changeTheme() {
    if(this.temaEstado == "Claro"){
      this.cambiarTema.cambiarTema()
    }else{
      this.cambiarTema.cambiarTema()
    }
  }

}
