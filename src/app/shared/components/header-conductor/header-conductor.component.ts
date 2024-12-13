import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-header-conductor',
  templateUrl: './header-conductor.component.html',
  styleUrls: ['./header-conductor.component.scss'],
})
export class HeaderConductorComponent {
  private _auth = inject(AuthServiceService)

  constructor(private _router: Router) { }

  goHome() {
    this._auth.logout()
  }

}
