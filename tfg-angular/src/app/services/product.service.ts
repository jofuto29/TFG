import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';
import { product } from '../models/product';

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

}