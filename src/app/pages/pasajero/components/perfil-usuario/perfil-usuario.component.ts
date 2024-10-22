import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
})
export class PerfilUsuarioComponent implements OnInit {

  usuario: any = {}
  perfilForm: any

  constructor(private tema: ThemeService, private fb: FormBuilder) {
    this.recuperarUsuario()
    this.perfilForm = fb.group({
      nombre: [this.usuario.nombre],
      apellido: [this.usuario.apellido],
      correo: [this.usuario.correo],
    })
  }

  ngOnInit() {
    console.log()
    this.tema.verificarTema()
  }


  recuperarUsuario() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
    const sesion = JSON.parse(localStorage.getItem('sesion') || '[]')

    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].correo == sesion.correo) {
        this.usuario.correo = usuarios[i].correo
        this.usuario.nombre = usuarios[i].nombre
        this.usuario.apellido = usuarios[i].apellido
        console.log(this.usuario)
        break
      }
    }
  }


}
