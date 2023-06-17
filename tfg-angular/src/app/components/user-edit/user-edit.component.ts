import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute} from '@angular/router';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers:[UserService, crudService]
})
export class UserEditComponent implements OnInit{

  public page_title: string;
  public userData: user;
  public token: any;
  public identity: any;
  public status:any;
  public idUser: number = 0;

  constructor(
    private _userService: UserService,
    private _crudService: crudService,
    private _route: ActivatedRoute
  ){
    this.page_title = 'Ajustes de usuario';
    this.status ='';
    this.userData = new user(1,'','','','','user',2,'',2,'','','');//e rellaran lso datos con forme lo enviamos desde el formulario
    this.loadUser();
  }

  ngOnInit(): void {
    
    if(this.identity.rol == "admin"){
      this.idUser = this._route.snapshot.queryParams['id'];
    }else{
      this.idUser = this.identity.sub;
    }

    this.getUser();
  }

  onSubmit(form: any){
    console.log(this.userData);
    this._userService.update(this.token,this.userData).subscribe(
        response =>{
          if(response.status == "success"){
            this.status = 'success';

            this.identity = response.userToken;
            this.identity.sub = this.identity.id_user;

            localStorage.setItem('identity', JSON.stringify(this.identity));
          }else{
            this.status = 'error'
          }
          console.log("OK");
          console.log(response);
        },
        error=>{
          this.status = 'error';
          console.log(<any>error);
        }
    );
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token  = this._userService.getToken();
  }

  getUser(){
    this._crudService.getObject(this.token,"user/detailsUser/", this.idUser).subscribe(
      response =>{
        this.userData = response.$model;
        console.log(this.userData);
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

}
