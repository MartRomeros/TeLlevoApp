import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isDriver?:boolean

  constructor(private router:Router) {}

  ngOnInit() {
    console.log("")
  }

  esDriver(){
    if(document.querySelector("ion-radio-group")?.value == "chofer"){
      this.isDriver = true
    }else{
      this.isDriver = false
    }
  }

  registrar(){
    this.router.navigate(['/auth'])
  }

}
