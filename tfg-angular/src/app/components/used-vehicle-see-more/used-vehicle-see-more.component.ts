import { Component, OnInit } from '@angular/core';
import { crudService } from 'src/app/services/crudService';
import { Router, ActivatedRoute} from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-used-vehicle-see-more',
  templateUrl: './used-vehicle-see-more.component.html',
  styleUrls: ['./used-vehicle-see-more.component.css'],
  providers:[crudService]
})
export class UsedVehicleSeeMoreComponent implements OnInit{

  public data: any = []; // Array para almacenar los productos
  public vehicle: any = []; // Array para almacenar los productos
  public user: any = []; // Array para almacenar los productos
  public imagenes: any[] = []; // Array para almacenar los productos
  public status: string;
  public identity: any;
  public token: any;
  public usedVehicleId: Number;

  constructor(
    private _crudService: crudService,
    private _router: Router,
    private _route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ){
    this.status = "";
    this.usedVehicleId = 0;
    this.loadUser();
  }

  public currentImage = 0;

  ngOnInit(): void {
    this.usedVehicleId = this._route.snapshot.queryParams['id'];
    this.usedVehicle();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  /*http://tfg.com.devel/product/5 [PUT]*/

  usedVehicle(){
    this._crudService.getObject(this.token, "usedVehicle/", this.usedVehicleId).subscribe(
      (response) => {
        this.data = response.$model;
        console.log(this.data);
        this.getUrlsImage();
        this._crudService.getObject(this.token, 'vehicle/', this.data.id_vehicle ).subscribe(
          (response) => {
            // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
            console.log(response)
            this.vehicle = response.$model; 

            this._crudService.getObject(this.token, 'user/detailsUser/', response.$model.id_user ).subscribe(
              (response) => {
                // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
                console.log(response)
                this.user = response.$model; // Asignar la respuesta al array de productos
              },
              (error) => {
                // Manejar el error aquí
                console.error(error);
              }
            )
          },
          (error) => {
            // Manejar el error aquí
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getUrlsImage(){
    const imageNames = this.data.img.split(";");
    console.log(imageNames);

    for (let i = 0; i < imageNames.length; i++) {
      if(imageNames[i] != null){
        this.getImage(imageNames[i]).subscribe((result: SafeUrl) => {
          this.imagenes.push(result);
          console.log(this.imagenes);
        });
      }
    }

    setInterval(() => {
      this.showNextImage();
    }, 4000);
  }

  getImage(name:string): Observable<any>{
    return this._crudService.getImage(this.token, 'usedVehicle/getImage/', name).pipe(//tranformamos el observable que es lo que devolemos, el src de la imagen cargada
      map((response: Blob) => {//dentro de map se tranforma la respuesta de tipo blob en una url segura 
        const objectUrl = URL.createObjectURL(response);
        return this.sanitizer.bypassSecurityTrustUrl(objectUrl);//devolvemos a pipe una url segura
      }),
    );
  }

  showNextImage(): void {
    this.currentImage = (this.currentImage + 1) % this.imagenes.length;
  }

  isAccordionOpen: boolean = false;
  isAccordionOpenDimension: boolean = false;
  isAccordionOpenOther: boolean = false;

  toggleAccordion(event: Event) {
    this.isAccordionOpen = !this.isAccordionOpen;
  }

  toggleAccordion2(event: Event) {
    this.isAccordionOpenDimension = !this.isAccordionOpenDimension;
  }

  toggleAccordion3(event: Event) {
    this.isAccordionOpenOther = !this.isAccordionOpenOther;
  }
}
