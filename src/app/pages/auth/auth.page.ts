import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage{

  constructor(
    private router:Router
  ) { }


  logIn(){
    this.router.navigate(['/pasajero'])
  }

  goToRegistro(){
    this.router.navigate(['/register'])
  }

}
