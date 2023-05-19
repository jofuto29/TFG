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

    constructor(
      private _userService: UserService
    ){
      this.page_title = "Registrate";
      this.userData = new user(1,'','','','','user',2,'',2,'','');//e rellaran lso datos con forme lo enviamos desde el formulario

    }

    ngOnInit(){//se lanzaran nada mas cargar la pagina
      console.log(this._userService.test());
    }

    onSubmit(form: any){
      console.log(this.userData);
      //form.reset();//vacia el formulario enviado, pero raro porque al abrir el json esta vacio {Revisar}
    }
}
