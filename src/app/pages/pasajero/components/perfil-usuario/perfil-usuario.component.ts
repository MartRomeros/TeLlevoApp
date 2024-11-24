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

  constructor(private tema: ThemeService, private fb: FormBuilder) {}

  ngOnInit() {
    this.tema.verificarTema();
    this.recuperarUsuario();
  }

  recuperarUsuario() {
    this.usuario = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre],
      apellido: [this.usuario.apellido],
      correo: [this.usuario.correo],
      tipoUsuario: [this.usuario.tipoUsuario], 
    });
  }

}
