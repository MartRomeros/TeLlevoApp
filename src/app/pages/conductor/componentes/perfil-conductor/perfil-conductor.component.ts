import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ConductorService } from 'src/app/services/conductor/conductor.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-perfil-conductor',
  templateUrl: './perfil-conductor.component.html',
  styleUrls: ['./perfil-conductor.component.scss'],
})
export class PerfilConductorComponent implements OnInit {

  usuario: any = {}
  perfilForm!: FormGroup
  userName?: string
  tipoUsuario?: string

  constructor(private router: Router, private teme: ThemeService, private _conductorServices: ConductorService,
    private fb: FormBuilder
  ) {
    this.perfilForm = fb.group({
      nombre: [this.usuario],
      correo: [''],
      patente: [''],
    })
  }

  ngOnInit(): void {
    this.traerConductor()
    this.teme.verificarTema()
  }

  goTo(ruta: string) {
    this.router.navigate([`conductor/${ruta}`])
  }

  async traerConductor() {
    const correo = JSON.parse(localStorage.getItem('usuario') || '') || 'nulo'
    try {
      const response: any = await lastValueFrom(this._conductorServices.traerDatos(correo))
      this.userName = response.user.username
      this.tipoUsuario = response.user.tipoUsuario
      this.perfilForm.get('patente')?.setValue(response.user.auto)
      this.perfilForm.get('correo')?.setValue(response.user.email)
      this.perfilForm.get('nombre')?.setValue(response.user.username)
    } catch (error: any) {
      console.log(error)
    }
  }




}
