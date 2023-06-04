import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';
import { user } from 'src/app/models/user';

/**
 * INVOCIACION DEL SERVICIO:
 * import { crudService } from 'src/app/services/crudService';
 * uso: añadir en providers en @component --> providers:[productService, UserService]
 * Crear instancia en el contructor(private _crudService: crudService,)
 */
@Injectable()
export class crudService {
    public url: string;
    public token: any;
    public identity: any;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
        this.token = '';
        this.identity = '';
    }

    /**
     * 
     * @param token 
     * @param url 
     * @returns 
     */
    listObjects(token:any, url:string): Observable<any>{
        let headers = new HttpHeaders().set('Authorization',token);
        return this._http.get(this.url+url, {headers: headers});
    }

     /**
     * 
     * @param token 
     * @param url 
     * @returns 
     */
    updateObject(token:any, url:string, object:any, id_object:any): Observable<any>{
        let json = JSON.stringify(object);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization',token);
        return this._http.put(this.url + url + id_object, params, {headers: headers});
    }

     /**
     * 
     * @param token 
     * @param url 
     * @returns 
     */
    deleteObject(token:any,  url:string, id_object: number): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization',token);
        return this._http.delete(this.url + url + id_object, {headers: headers});
    }

     /**
     * 
     * @param token 
     * @param url 
     * @returns 
     */
    registerObject(token:any, url:string, object:any): Observable<any>{
        let json = JSON.stringify(object);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization',token);
        return this._http.post(this.url + url, params, {headers: headers});
    }

     /**
     * 
     * @param token 
     * @param url 
     * @returns 
     */
    getObject(token:any, url:string, id_object:any): Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization',token);
        return this._http.get(this.url + url + id_object, {headers: headers});
    }

     /**
     * 
     * @param token 
     * @param url 
     * @returns 
     */
    uploadImage(token:any, imageFile:any, url:string): Observable<any> {
        const formData = new FormData();
        formData.append('file0', imageFile);
    
        let headers = new HttpHeaders().set('Authorization',token);
        return this._http.post(this.url+url, formData, {headers: headers});
    }

     /**
     * 
     * @param token 
     * @param url 
     * @returns 
     */
    getImage(token:any, url:string, nombre:string): Observable<any> {
        let headers = new HttpHeaders().set('Authorization',token);
        return this._http.get(this.url+url+nombre, {headers: headers, responseType: 'blob'})
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
}