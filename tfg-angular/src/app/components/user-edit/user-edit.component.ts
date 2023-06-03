import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  public archivos: any = [];
  public imageURL: any;
  public sanitizedImageUrl: any;


  constructor(
    private _userService: UserService,
    private _http: HttpClient,
    private sanitizer: DomSanitizer
  ){
    this.page_title = 'Ajustes de usuario';
    this.status ='';
    this.userData = new user(1,'','','','','user',2,'',2,'','','');//e rellaran lso datos con forme lo enviamos desde el formulario
    this.loadUser();
    //obtenemos los datos del usuario asi rellenamos los campos del formulario con sus datos
    //this.userData = this.identity;
    //this.userData.id_user = this.identity.sub;

  }


  onSubmit(form: any){
    console.log(this.userData);
    this._userService.update(this.token,this.userData).subscribe(
        response =>{
          if(response.status == "success"){
            this.status = 'success';

            //actualizamos los datos guardados en indenitity
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

  ngOnInit(): void {
    this.getImage();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token  = this._userService.getToken();
  }

  subirFile(event:any){
    const imagen = event.target.files[0];
    console.log(imagen);
    console.log(this.token);
    
    this._userService.uploadImage(this.token, imagen, 'usedVehicle/uploadImage').subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
        console.log(response);
        console.log("nombre de la imagen " + response.image)
        //ademas is es subida deberiamos guardar el nombre junto al identificador que corresponda
        //this.userData.img = response.image;//y actualizamos el objeto
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  getImage(){
    console.log(this.token);
    this._userService.getImage(this.token,'usedVehicle/getImage/',"1685217999Cliente-Servidor.png").subscribe((response: Blob) => {
      const objectUrl = URL.createObjectURL(response);
      this.sanitizedImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      }
    );
    
  }

}
