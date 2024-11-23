import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-conductor',
  templateUrl: './header-conductor.component.html',
  styleUrls: ['./header-conductor.component.scss'],
})
export class HeaderConductorComponent {

  constructor(private _router: Router) { }

  goHome() {
    this._router.navigate(['conductor/home-conductor'])
  }

}
