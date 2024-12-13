import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { conductor } from 'src/app/models/interfaces';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { ConductorService } from 'src/app/services/conductor/conductor.service';
import { MensajeriaService } from 'src/app/services/mensajeria/mensajeria.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-registro-chofer',
  templateUrl: './registro-chofer.component.html',
  styleUrls: ['./registro-chofer.component.scss'],
})
export class RegistroChoferComponent implements OnInit {

  public registroForm!: FormGroup
  public cargando?: boolean

  private _mensajeria = inject(MensajeriaService)
  private _router = inject(Router)
  private _tema = inject(ThemeService)

  constructor(private fb: FormBuilder, private _auth: AuthServiceService, private _conductor: ConductorService) {

    this.registroForm = fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      patente: ['', Validators.required],
      marca: ['', Validators.required],
    })

  }

  ngOnInit(): void {
    this._tema.verificarTema()
  }

  async registrar() {
    this.cargando = true

    if (!this._auth.validarCampos(this.registroForm)) {
      this.cargando = false
      return
    }

    const data: conductor = {
      username: this.registroForm.get('username')?.value,
      email: this.registroForm.get('email')?.value,
      password: this.registroForm.get('password')?.value,
      patente: this.registroForm.get('patente')?.value,
      marca: this.registroForm.get('marca')?.value,
      tipoUsuario: 'conductor'
    }

    try {
      const response: any = await lastValueFrom(this._conductor.registrarConductor(data))
      this.cargando = false
      this._mensajeria.mostrarToast(response.message)
      this._router.navigate(['login'])
    } catch (error: any) {
      
      this.cargando = false
      this._mensajeria.mostrarAlert(error.error.message)
      console.log(error)
    }

  }

  validarCampo(nombre: string) {
    return this._auth.validarCampo(this.registroForm, nombre)
  }
}
