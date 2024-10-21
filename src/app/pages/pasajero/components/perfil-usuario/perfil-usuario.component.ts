import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
})
export class PerfilUsuarioComponent  implements OnInit {

  constructor(private tema:ThemeService) { }

  ngOnInit() {
    console.log()
    this.tema.verificarTema()
  }


  obtenerDatos(){
    const sesion = JSON.parse(localStorage.getItem('sesion') || '{}')
    const usuarios = JSON.parse(localStorage.getItem('usuarios')|| '[]')

    

  }


}
