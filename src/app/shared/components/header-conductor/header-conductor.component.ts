import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-header-conductor',
  templateUrl: './header-conductor.component.html',
  styleUrls: ['./header-conductor.component.scss'],
})
export class HeaderConductorComponent{

  constructor(private auth:AuthServiceService) { }

  logOut() {
    this.auth.logout()
  }

}
