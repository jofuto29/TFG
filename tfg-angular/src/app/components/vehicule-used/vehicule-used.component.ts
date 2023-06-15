import { Component, OnInit } from '@angular/core';
import { crudService } from 'src/app/services/crudService';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { vehicle } from 'src/app/models/vehicle';
import { concatMap, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-vehicule-used',
  templateUrl: './vehicule-used.component.html',
  styleUrls: ['./vehicule-used.component.css'],
  providers:[crudService]
})
export class VehiculeUsedComponent {

  public token: any;
  public identity: any;
  public usedVehicles: any[] = []; // Array para almacenar los productos

  public vehicles: vehicle[] = [];
  public users: any[] = []; // Array para almacenar los productos
  public sanitizedImageUrls: { [key: string]: any } = {};

  constructor(
    private _crudService: crudService,
    private sanitizer: DomSanitizer
  ) {
    this.loadUser();
    this.listUsedVehicles();
  }

  listUsedVehicles() {
    this._crudService.listObjects("", 'usedVehicle').subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
        console.log(response)
        this.usedVehicles = [...response.$model]; // Asignar la respuesta al array de productos
        this.getUrlsImage();
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  /*getUrlsImage(){
    for (const vehicle of this.usedVehicles) {
        this._crudService.getObject(this.token, 'vehicle/', vehicle.id_vehicle ).subscribe(
          (response) => {
            console.log(response)
            this.vehicles.push(response.$model as vehicle); 
          },
          (error) => {
            console.error(error);
          }
        );
        if(vehicle.img != null){
          const imageNames = vehicle.img.split(";");

          this.getImage(imageNames[0]).subscribe((result: SafeUrl) => {
            this.sanitizedImageUrls[vehicle.img] = result;
          });
        }
    }
  }*/
  getUrlsImage() {
    this.usedVehicles
      .map((vehicle) =>
        this._crudService.getObject(this.token, 'vehicle/', vehicle.id_vehicle).pipe(
          mergeMap((response) => {
            console.log(response);
            this.vehicles.push(response.$model as vehicle);
            
            if (vehicle.img != null) {
              const imageNames = vehicle.img.split(";");
              return this.getImage(imageNames[0]).pipe(
                mergeMap((result: SafeUrl) => {
                  this.sanitizedImageUrls[vehicle.img] = result;
                  return of(null);
                })
              );
            } else {
              return of(null);
            }
          }),
          catchError((error) => {
            console.error(error);
            return of(null);
          })
        )
      )
      .reduce((previous, current) => previous.pipe(concatMap(() => current)), of(null))
      .subscribe(() => {
        // Todas las solicitudes se han completado correctamente
      });
  }


  getImage(name:string): Observable<any>{
    return this._crudService.getImage(this.token, 'usedVehicle/getImage/', name).pipe(//tranformamos el observable que es lo que devolemos, el src de la imagen cargada
      map((response: Blob) => {//dentro de map se tranforma la respuesta de tipo blob en una url segura 
        const objectUrl = URL.createObjectURL(response);
        return this.sanitizer.bypassSecurityTrustUrl(objectUrl);//devolvemos a pipe una url segura
      }),
    );
  }
}
