import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit{

  public page_title: string;
  public userData: user;


  constructor(

  ){
    this.page_title = 'Ajustes de usuario';
    this.userData = new user(1,'','','','','user',2,'',2,'','','');//e rellaran lso datos con forme lo enviamos desde el formulario
  }


  onSubmit(form: any){}

  ngOnInit(): void {
    
  }
}
