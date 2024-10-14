import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  cargando?: boolean

  constructor(
    private router: Router
  ) { }


  logIn() {
    setTimeout(() => {
      this.cargando = false
      this.router.navigate(['/pasajero'])
    }, 2000);
    this.cargando = true
  }

  goToRegistro() {
    this.router.navigate(['/register'])
  }

}
