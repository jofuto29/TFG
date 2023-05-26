import { Component } from '@angular/core';
import { user } from '../../models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})
export class RegisterComponent {

    public page_title: string;
    public userData: user;
    public status: string;

    constructor(
      private _userService: UserService
    ){
      this.page_title = "Registrate";
      this.status = "";
      this.userData = new user(1,'','','','','user',2,'',2,'','','');//e rellaran lso datos con forme lo enviamos desde el formulario

    }

    ngOnInit(){//se lanzaran nada mas cargar la pagina
      console.log(this._userService.test());
    }

    onSubmit(form: any){
      console.log(this.userData);
      this._userService.register(this.userData).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
        response =>{
          if(response.status == "success"){
            this.status = response.status;
            form.reset();
          }else{
            this.status = 'error';
          }
          console.log(response);
        },
        error=>{
          this.status = 'error';
          console.log(<any>error);
        }
      );
      //console.log(this.userData);
      //form.reset();//vacia el formulario enviado, pero raro porque al abrir el json esta vacio {Revisar}
    }
}

/*nos permitira crear un modelo, el modelo que sea, y llamar metedos del servicio, es la calse enlace*/