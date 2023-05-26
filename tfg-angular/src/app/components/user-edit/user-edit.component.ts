import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers:[UserService]
})
export class UserEditComponent implements OnInit{

  public page_title: string;
  public userData: user;
  public token: any;
  public identity: any;
  public status:any;


  constructor(
    private _userService: UserService
  ){
    this.page_title = 'Ajustes de usuario';
    this.status ='';
    this.userData = new user(1,'','','','','user',2,'',2,'','','');//e rellaran lso datos con forme lo enviamos desde el formulario
    this.loadUser();
    //obtenemos los datos del usuario asi rellenamos los campos del formulario con sus datos
    this.userData = this.identity;
  }


  onSubmit(form: any){
    console.log(this.userData);
    this._userService.update(this.token,this.userData).subscribe(
      
      Response=>{
        this.status = 'success';
        console.log(Response);
      },
      error =>{
        this.status = 'error';
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token  = this._userService.getToken();
  }
}
