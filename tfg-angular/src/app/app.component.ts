import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  public title = 'tfg-angular-front';
  public isMenuVisible = true;
  public identity:any;
  public token:any;

  constructor(
    public _userService: UserService
  ){
    this.loadUser();
  }

  //metodo se ejecutara cuando se cargue el componente principoal
  ngOnInit(): void {
    console.log("pagina cargada correctamente");
  }

  //metodo que se cargara cuando se produzca un cambio
  ngDoCheck(): void {
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token  = this._userService.getToken();
  }

  showMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

}
