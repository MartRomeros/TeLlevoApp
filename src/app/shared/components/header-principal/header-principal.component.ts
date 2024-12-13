import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-principal',
  templateUrl: './header-principal.component.html',
  styleUrls: ['./header-principal.component.scss'],
})
export class HeaderPrincipalComponent {

  @Input() button?: any
  @Input() titulo?: string;

  constructor(private router: Router) { }

  goTo(ruta: string) {
    this.router.navigate([`/${ruta}`])
  }

}
