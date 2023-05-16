import { Component } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public page_title: string;

  constructor(){
    this.page_title = 'identificate';
  }

}
