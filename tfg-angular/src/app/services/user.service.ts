import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../models/user';

/*crearemos un servicio que envie las peticiones correspondiente al backend*/
@Injectable()
export class UserService {

    constructor(
        public _http: HttpClient
    ){}

    test(){/*y este servicio de prieba lo utilizaremos desde el componente de registro*/
        return "hola mundo desde un servicio";
    }

}