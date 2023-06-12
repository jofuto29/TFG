import { Component, OnInit } from '@angular/core';
import { invoices } from '../../models/invoice';
import { reparation } from '../../models/reparation';
import { crudService } from 'src/app/services/crudService';
import { Router, ActivatedRoute } from '@angular/router';
import { vehicle } from 'src/app/models/vehicle';
import { forkJoin } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-see',
  templateUrl: './invoice-see.component.html',
  styleUrls: ['./invoice-see.component.css'],
  providers: [crudService]
})
export class InvoiceSeeComponent implements OnInit{
  public invoiceData: invoices;
  public reparationData: reparation;
  public vehicleData: vehicle;

  public invoiceId: number;
  public reparationServices: any[] = []; // Array para almacenar las categorias
  public reparationProducts: any[] = []; // Array para almacenar los suppliers
  public reparationProductsQuantities: any[] = []; // Array para almacenar los suppliers
  public invoiceDeductions: any[] = []; // Array para almacenar los suppliers
  public productImage: { [key: string]: any } = {};

  public deductions: any[] = [];
  public products: any[] = []; // Array para almacenar los suppliers
  public services: any[] = []; // Array para almacenar los suppliers

  public identity: any;
  public token: any;
  public status: string;

  constructor(
    private _crudService: crudService,
    private _router: Router,
    private _route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ){
    this.status = "";
    this.invoiceId = 0;
    this.loadUser();
    this.invoiceData = new invoices(1,1,new Date(),1,'',"","");
    this.reparationData = new reparation(1,1,1,new Date(),new Date(),"","","", "","");
    this.vehicleData = new vehicle(1,1,"","","",1,"", "");
  }

  ngOnInit(): void {
    this.invoiceId = this._route.snapshot.queryParams['id'];
    this.getData();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  getData(){
    this._crudService.getObject(this.token, "invoice/", this.invoiceId).subscribe(
      (response) => {
        this.invoiceData = response.$model as invoices;

        this._crudService.getObject(this.token, "reparation/", this.invoiceData.id_reparation).subscribe(
          (response) => {
            this.reparationData = response.$model as reparation;
      
            // Obtenemos el vehículo asociado
            this._crudService.getObject(this.token, "vehicle/", this.reparationData.id_vehicle).subscribe(
              (response) => {
                this.vehicleData = response.$model as vehicle;
      
                // Obtenemos los servicios asociados a la reparación
                this._crudService.getObject(this.token, "reparationServices/findByCamp/", this.invoiceData.id_reparation).subscribe(
                  (response) => {
                    this.reparationServices = response.$model;
      
                    // Obtenemos los productos asociados a la reparación
                    this._crudService.getObject(this.token, "reparationProducts/findByCamp/", this.invoiceData.id_reparation).subscribe(
                      (response) => {
                        this.reparationProducts = response.$model;
      
                        // Obtenemos las deducciones asociadas a la factura
                        this._crudService.getObject(this.token, "invoiceDeductions/findByCampInvoice/", this.invoiceData.id_invoice).subscribe(
                          (response) => {
                            this.invoiceDeductions = response.$model;
      
                            // Obtenemos los detalles de cada servicio
                            const serviceObservables = this.reparationServices.map((reparationService) => {
                              return this._crudService.getObject(this.token, "service/", reparationService.id_service);
                            });
      
                            // Obtenemos los detalles de cada producto
                            const productObservables = this.reparationProducts.map((reparationProduct) => {
                              this.reparationProductsQuantities.push(reparationProduct.quantity);
                              return this._crudService.getObject(this.token, "product/", reparationProduct.id_product);
                            });
      
                            // Obtenemos los detalles de cada deducción
                            const deductionObservables = this.invoiceDeductions.map((invoiceDeduction) => {
                              return this._crudService.getObject(this.token, "deduction/", invoiceDeduction.id_deduction);
                            });
      
                            // Combinamos las llamadas en paralelo
                            forkJoin([...serviceObservables, ...productObservables, ...deductionObservables]).subscribe(
                              (responses) => {
                                const serviceResponses = responses.slice(0, this.reparationServices.length);
                                const productResponses = responses.slice(this.reparationServices.length, this.reparationServices.length + this.reparationProducts.length);
                                const deductionResponses = responses.slice(this.reparationServices.length + this.reparationProducts.length);
      
                                this.services = serviceResponses.map((response) => response.$model);
                                this.products = productResponses.map((response) => response.$model);
                                this.deductions = deductionResponses.map((response) => response.$model);

                                console.log("datos factura");
                                console.log(this.invoiceData);
                                console.log("datos reparacion");
                                console.log(this.reparationData);
                                console.log("datos vehiculo");
                                console.log(this.vehicleData);
                                console.log("datos productos");
                                console.log(this.products);
                                console.log("datos servicios");
                                console.log(this.services);
                                console.log("datos cantidad de esos porductos");
                                console.log(this.reparationProductsQuantities);
                                console.log("descuentos");
                                console.log(this.deductions);
                                /*teniendo ya los porductos obtendremos la imagenes asociadas*/
                                this.getUrlsImage();
                                console.log(this.productImage);

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
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getUrlsImage(){
    for (const producto of this.products) {
      this.getImage(producto.img).subscribe((result: SafeUrl) => {
        this.productImage[producto.img] = result;
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

  imprimir() {
    window.print();
  }

}


/*Estructura de la factura:
  Fecha factura
  Dastos del vehiculo
  Productos con sus imagenes, catidad y costo de los mismo
  Servicios
  Decuentos y impuestos
  Precio total
*/