import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';
import { product } from '../models/product';

/*crearemos un servicio que envie las peticiones correspondiente al backend*/
@Injectable()
export class productService {
    public url: string;

    constructor(
        public _http: HttpClient
        
    ){
        this.url = global.url;
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

    listProducts(token:any, url:string): Observable<any>{
        let headers = new HttpHeaders().set('Authorization',token);
        return this._http.get(this.url+url, {headers: headers});
    }

    updateProduct(){

    }

    deleteProduct(id_product: number, url:string, token:any){
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization',token);
        return this._http.delete(this.url + url + id_product, {headers: headers});
    }

    registerProduct(token:any, url:string, object:any): Observable<any>{
        let json = JSON.stringify(object);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization',token);

        return this._http.post(this.url + url, params, {headers: headers});
    }

    getProduct(){
        
    }

}