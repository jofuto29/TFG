import { Component, OnInit } from '@angular/core';
import { crudService } from 'src/app/services/crudService';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-reparation-productos-asociados',
  templateUrl: './reparation-productos-asociados.component.html',
  styleUrls: ['./reparation-productos-asociados.component.css'],
  providers:[crudService]
})
export class ReparationProductosAsociadosComponent implements OnInit {
  public status: string;
  public identity: any;
  public token: any;
  public reparationId: Number;
  public reparationProducts: any[] = []; // Array para almacenar los id productos
  public asociatedProducts: any[] = []; // Array para almacenar los productos

  public sanitizedImageUrls: { [key: string]: any } = {};

  constructor(
    private _crudService: crudService,
    private _route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ){
    this.status = "";
    this.reparationId = 0;
    this.loadUser();
  }

  ngOnInit(): void {
    this.reparationId = this._route.snapshot.queryParams['id'];
    this.reparationProductsList();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  reparationProductsList(){
    this._crudService.getObject(this.token, "reparationProducts/findByCamp/", this.reparationId).subscribe(
      (response) => {
        this.reparationProducts = response.$model;
        const getProductRequests: Observable<any>[] = [];

        for (const reparationProduct of this.reparationProducts) {
          getProductRequests.push(
            this._crudService.getObject(this.token, "product/", reparationProduct.id_product).pipe(
              map((response) => response.$model)
            )
          );
        }

        forkJoin(getProductRequests).subscribe(//esperamos a que termine el bulce para cargar la imagenes
          (products) => {
            this.asociatedProducts = products as any[];
            this.getUrlsImage();
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }


  deleteProduct(productId: number) {
    this._crudService.deleteObject(this.token,'product/',productId).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /*no funcionaba porque se ejecutan asincronamente, subscribe hace que el valor espera a que tenga la resupeusa*/
  getUrlsImage(){
    for (const producto of this.asociatedProducts) {
      this.getImage(producto.img).subscribe((result: SafeUrl) => {
        this.sanitizedImageUrls[producto.img] = result;
      });
    }
  }

  getImage(name:string): Observable<any>{
    return this._crudService.getImage(this.token, 'product/getImage/', name).pipe(//tranformamos el observable que es lo que devolemos, el src de la imagen cargada
      map((response: Blob) => {//dentro de map se tranforma la respuesta de tipo blob en una url segura 
        const objectUrl = URL.createObjectURL(response);
        return this.sanitizer.bypassSecurityTrustUrl(objectUrl);//devolvemos a pipe una url segura
      }),
    );
  }
}
