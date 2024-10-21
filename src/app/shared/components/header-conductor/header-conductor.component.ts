import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header-conductor',
  templateUrl: './header-conductor.component.html',
  styleUrls: ['./header-conductor.component.scss'],
})
export class HeaderConductorComponent  implements OnInit {

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
