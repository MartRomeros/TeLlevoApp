import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonicModule],
})
export class HeaderComponent implements OnInit,OnDestroy {

  constructor(private router: Router, private menu: MenuController) { }

  ngOnInit(): void {
    this.menu.close()
  }

  ngOnDestroy(): void {
    this.menu.close()
  }

  logOut() {
    this.router.navigate(['login'])
  }

  navigateTo(ruta: string) {
    this.menu.close()
    this.router.navigate([`pasajero/${ruta}`])

  }

}
