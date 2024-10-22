import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-perfil-conductor',
  templateUrl: './perfil-conductor.component.html',
  styleUrls: ['./perfil-conductor.component.scss'],
})
export class PerfilConductorComponent implements OnInit {

  usuario: any = {}
  perfilForm: any

  constructor(private router: Router, private teme: ThemeService, private perfil: ProfileService,
    private fb: FormBuilder
  ) {
    this.recuperarUsuario()
    this.perfilForm = fb.group({
      nombre: [this.usuario.nombre],
      apellido: [this.usuario.apellido],
      correo: [this.usuario.correo],
    })
  }

  ngOnInit(): void {
    this.teme.verificarTema()
    this.recuperarUsuario()

  }

  goTo(ruta: string) {
    this.router.navigate([`conductor/${ruta}`])

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
