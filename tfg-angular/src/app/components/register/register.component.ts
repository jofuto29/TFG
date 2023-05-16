import { Component } from '@angular/core';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    public page_title: string;

    constructor(){
      this.page_title = "Registrate";
    }
}
