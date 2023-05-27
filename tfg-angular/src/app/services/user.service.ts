import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';
import { user } from '../models/user';

/*crearemos un servicio que envie las peticiones correspondiente al backend*/
@Injectable()
export class UserService {
    public url: string;
    public identity: any;
    public token: any;

    constructor(
        public _http: HttpClient
        
    ){
        this.identity = '';
        this.token = '';
        this.url = global.url;
    }

    test(){/*y este servicio de prieba lo utilizaremos desde el componente de registro*/
        return "hola mundo desde un servicio";
    }

    /**
     *  METODO REGISTRO DE USUARIOS
     *  METODO EN EL QUE RECIBIREMOS UN USARIO DEL MODELO USUARIO OVIAMENTE
     *  QUE TRANFORMAREMOS EL JSON PARA ENVIARLO AL BACKEND
     * 
     * register(user: user): Observable<any> recibimos un objeto de tipo user, y devolvemos algo, nosabemos que por eso observable(respuesta) any de algo
     */

    register(user: user): Observable<any>{
        let json = JSON.stringify(user);
        let params = "json=" + json;

        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url+'user/register', params, {headers: headers});
    }

    
    signup(user:user, gettoken:any = null){
        if(gettoken != null){
            user.getToken = 'true';
        }

        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url+'user/login', params, {headers: headers});
    }

    update(token:any, user:user): Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization',token);

        return this._http.put(this.url + 'user/update', params, {headers: headers});
    }

    getIdentity(){
        //let identity = JSON.parse(localStorage.getItem('identity') ?? '');
        let identitySTR =  localStorage.getItem('identity');

        if (identitySTR && identitySTR.trim() !== ''){
            let identity = JSON.parse(identitySTR);
            this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');

        if (token && token != null){
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }


    uploadImage(token:any, imageFile:any, url:string): Observable<any> {
        const formData = new FormData();
        formData.append('file0', imageFile); // Asegúrate de tener una referencia al archivo que deseas enviar
    
        let headers = new HttpHeaders().set('Authorization',token);
        return this._http.post(this.url+url, formData, {headers: headers});
      }

    getImage(token:any, url:string, nombre:string): Observable<any> {
        let headers = new HttpHeaders().set('Authorization',token);
        return this._http.get(this.url+url+nombre, {headers: headers, responseType: 'blob'})
    }

}