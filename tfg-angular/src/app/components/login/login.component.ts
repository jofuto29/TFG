import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { user } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent {

  public page_title: string;
  public userData: user;
  public status: string;
  public token: any;
  public identity: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.page_title = 'identificate';
    this.status = '';
    this.userData = new user(1,'','','','','user',2,'',2,'','','');
  }

  ngOnInit(){
    //se ejecuta simepre el metodo logout pero solo cerrara sesion si el parametro que le pasamos en la url sure esta a 1
    this.logout();
  }

  onSubmit(form: any){
    console.log(this.userData);
    this._userService.signup(this.userData).subscribe(
      response=>{
          //TOKEN
          this.status = 'success';
          this.token = response;
          //indetity
          console.log(this.userData);
          this._userService.signup(this.userData,'true').subscribe(
            response =>{
              this.identity = response;
              console.log(this.identity.token.user);//pq viene dentro de token
              console.log(this.token.token);

              //guardamos en el navegador para persitir los datos de sesion
              localStorage.setItem('token', this.token.token);
              localStorage.setItem('identity', JSON.stringify(this.identity.token));

              //redireccion a la pagina principal O administracion dependiendo del logeo
              this._router.navigate(['inicio']);
            },
            error =>{
              this.status = 'error';
              console.log(error);
            }
          );
      },
      error=>{
        this.status = 'error';
        console.log(error);
      }
    );
  }


  logout(){
    this._route.params.subscribe(params => {
      let logout = +params['sure'];//con el mas lo convierto en un entero
      if(logout == 1){
        localStorage.removeItem('identity');//eliminamos la sesion
        localStorage.removeItem('token');

        this.identity = null; //vaciamos tambien los parametros
        this.token = null;

        //redireccion a la pagina principal
        this._router.navigate(['inicio']);
      }

    });//usamos el objeto rute obtenemos los parametros con el metodo subscribe porque es un objeto de tipoi observable
  }


}
