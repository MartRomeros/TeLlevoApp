import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { PasajeroService } from 'src/app/services/pasajero/pasajero.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
})
export class PerfilUsuarioComponent implements OnInit {

  usuario: any = {}
  perfilForm: any

  constructor(private tema: ThemeService, private fb: FormBuilder, private _pasajero: PasajeroService) {
    this.recuperarUsuario()
  }

  ngOnInit() {
    this.tema.verificarTema();
    this.recuperarUsuario();
  }

  async recuperarUsuario() {
    try {
      const correo: any = JSON.parse(localStorage.getItem('usuario') || '')
      const response: any = await lastValueFrom(this._pasajero.traerDatos(correo))
      console.log(response)
      this.usuario.nombre = response.user.username
      this.usuario.correo = response.user.email
    } catch (error) {

    }
  }

}
