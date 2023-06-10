import { Component, OnInit} from '@angular/core';
import { reparation } from 'src/app/models/reparation';
import { reparationProducts } from 'src/app/models/reparationProducts';
import { reparationServices } from 'src/app/models/reparationServices';
import { Router, ActivatedRoute} from '@angular/router';
import { crudService } from 'src/app/services/crudService';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-reparation-update',
  templateUrl: './reparation-update.component.html',
  styleUrls: ['./reparation-update.component.css'],
  providers:[crudService]
})
export class ReparationUpdateComponent implements OnInit{
  public reparationData: reparation;

  /*clases relacionadas*/
  public vehicles: any[] = []; // Array para almacenar los vehiculos
  public products: any[] = [];
  public services: any[] = [];
  public employees: any[] = [];
  public users:any[] = [];

  /*saber podructos relacionados*/
  public selectedProducts: number[] = [];
  public addedProducts: any[] = [];
  public productQuantities: number[] = [];

  public reparationProducts: any[] = []; // Array para almacenar los id productos

  /**saber servicios relacionados */
  public selectedServices: number[] = [];
  public addedServices: any[] = [];

  public reparationServices: any[] = []; // Array para almacenar los id productos

  /**informacion adicional */
  public status: string;
  public identity: any;
  public token: any;
  public idReparation:number=0;

  public stateOptions = ["Standby","Progress","Complete"];

  constructor(
    private _crudService: crudService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.status = "";
    this.reparationData = new reparation(1,1,1,new Date(),new Date(),"","","", "","");
    this.loadUser();
    this.listVehicles();
    this.listProducts();
    this.listServices();
    this.listEmployees();
  }

  loadUser() {
    this.identity = this._crudService.getIdentity();
    this.token = this._crudService.getToken();
  }

  ngOnInit(): void {
    this.idReparation = this._route.snapshot.queryParams['id'];
    this.getReparation();
  }

  onSubmit(form: any){
    /*realizamos el update*/
    /*Primero de todo borraremos todas las clases relacionadas con la reparacion para volverlas a crear posteriormente*/

    this._crudService.updateObject(this.token, "reparation/", this.reparationData, this.idReparation).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {

        /*Borramos las clases asociadas*/
        if (this.reparationServices.length !== 0) {
          const deleteServiceRequests = this.reparationServices.map(service => {//creamos un array utilizando el metodo map para iterar sobre todos los objetos dentro de reparation service
            return this._crudService.deleteObject(this.token, "reparationServices/", service.id_reparationServices);//guardamos en deleteService las respuestas
          });
  
          forkJoin(deleteServiceRequests).subscribe(//unimos todas las solicitudes en un mismo obserbable mediante forkjoin para que espere a que todas las solicitudes se haya completado
            (deleteServiceResponses) => {
              this.deleteReparationProducts(this.idReparation);
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          this.deleteReparationProducts(this.idReparation);
        }
    },
    (error) => {
        // Manejar el error aquí
        console.error(error);
        this.status = "error";
      }
    );
  }

  /*inicio cargamos datos de la reparacion*/
  getReparation(){
    this._crudService.getObject(this.token, "reparation/", this.idReparation).subscribe(
      (response) => {
        this.reparationData = response.$model as reparation;
      },
      (error) => {
        console.error(error);
      }
    );

    /*A parte tenemos que cargar las calses relacion*/
    /*Servicios*/
    this._crudService.getObject(this.token, "reparationServices/findByCamp/", this.idReparation).subscribe(
      (response) => {
        /*obtenemos los servicios asociados*/
        this.reparationServices = response.$model;

        //iteramos entre los servicios obtenidos
        this.reparationServices.forEach((reparationService) => {
          this._crudService.getObject(this.token, "service/", reparationService.id_service).subscribe(//para cada iteracion obtenemos el serivio correspondiente
            (response) => {
              const serviceResponse = response.$model;//const para mantener el valor para cada observable
              this.addedServices.push(serviceResponse);
    
              /* También lo tendremos que quitar de la lista de seleccionados */
              const index = this.services.findIndex(service => service.id_service === serviceResponse.id_service);//como mantenemos el valor cada peticion tendra su servicio propio y hacedemos a id_service del serivio que hemo obtenido
              if (index !== -1) {
                this.services.splice(index, 1);
              }
            },
            (error) => {
              console.error(error);
            }
          );
        });
      },
      (error) => {
        console.error(error);
      }
    );

    /*productos*/
    this._crudService.getObject(this.token, "reparationProducts/findByCamp/", this.idReparation).subscribe(
      (response) => {
        this.reparationProducts = response.$model;

        this.reparationProducts.forEach((reparationProduct) => {

          this.productQuantities.push(reparationProduct.quantity);
          this._crudService.getObject(this.token, "product/", reparationProduct.id_product).subscribe(
            (response) => {
              const productResponse = response.$model;//const para mantener el valor para cada observable
              this.addedProducts.push(productResponse);
    
              /* También lo tendremos que quitar de la lista de seleccionados */
              const index = this.products.findIndex(product => product.id_product === productResponse.id_product);//como mantenemos el valor cada peticion tendra su servicio propio y hacedemos a id_service del serivio que hemo obtenido
              if (index !== -1) {
                this.products.splice(index, 1);
              }
            },
            (error) => {
              console.error(error);
            }
          );
        });
      });
  }

  /*listar informacion necesaria para el formulario de registro*/
  listVehicles() {
    this._crudService.listObjects(this.token, 'vehicle').subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida  
        this.vehicles = [...response.$model]; // Asignar la respuesta al array de productos
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  listProducts(){
    this._crudService.listObjects(this.token, 'product').subscribe(
      (response) => {
        this.products = [...response.$model]; // Asignar la respuesta al array de productos
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  listServices(){
    this._crudService.listObjects(this.token, 'service').subscribe(
      (response) => {
        this.services = [...response.$model]; // Asignar la respuesta al array de productos
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  }

  listEmployees(){
    this._crudService.listObjects(this.token, 'employee').subscribe(
      (response) => {
        this.employees = [...response.$model];
        for(var i = 0; i < this.employees.length; i++){
          this._crudService.getObject(this.token, 'user/detailsUser/', this.employees[i].id_employee).subscribe(
            (response) => {
              this.users.push(response.$model);
            },
            (error) => {
              console.error(error);
            }
          );
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /*añadimos al array */
  addProduct() {
    const lastSelectedProductId = this.selectedProducts[this.selectedProducts.length - 1];
    const lastSelectedProductIndex = this.products.findIndex(product => product.id_product === lastSelectedProductId);//se obtiene la posicion del elemento en el array

   if (lastSelectedProductIndex !== -1) {
      const lastSelectedProduct = this.products.splice(lastSelectedProductIndex, 1)[0];//elimina el elemnto en esa posicion y lo guarda en lastSelectproduct
      this.addedProducts.push(lastSelectedProduct);//lo añade a porducto selecionados
      this.productQuantities.push(1);
    }
  }

  addProductService() {
    const lastSelectedProductId = this.selectedServices[this.selectedServices.length - 1];
    const lastSelectedProductIndex = this.services.findIndex(service => service.id_service === lastSelectedProductId);//se obtiene la posicion del elemento en el array

    if (lastSelectedProductIndex !== -1) {
      const lastSelectedProduct = this.services.splice(lastSelectedProductIndex, 1)[0];//elimina el elemnto en esa posicion y lo guarda en lastSelectproduct
      this.addedServices.push(lastSelectedProduct);//lo añade a porducto selecionados
    }
  }

  removeService(i:number){
    this.selectedServices.splice(i,1);
    const removedService = this.addedServices.splice(i, 1);
    this.services.push(removedService[0]);
  }

  removeProduct(i:number){
    this.selectedProducts.splice(i,1);
    this.productQuantities.splice(i,1);
    const removedProduct = this.addedProducts.splice(i, 1);
    this.products.push(removedProduct[0]);
  }

  deleteReparationProducts(reparationId: number) {
    this._crudService.getObject(this.token, "reparationProducts/findByCamp/", reparationId).subscribe(
      (response) => {
        this.reparationProducts = response.$model;
        if (this.reparationProducts.length !== 0) {
          const deleteProductRequests = this.reparationProducts.map(product => {
            return this._crudService.deleteObject(this.token, "reparationProducts/", product.id_reparationProducts);
          });

          forkJoin(deleteProductRequests).subscribe(
            (deleteProductResponses) => {
              this.updateRelationsClass(reparationId);
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          this.updateRelationsClass(reparationId);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateRelationsClass(idReparation:number){
    /*Añadimos los productos asociados --> si utilizamos let o var o variable global en cada iteracion siempre apuntara a la misma direccion no se crearan objeto nuevos*/
    for(let i = 0; i < this.addedProducts.length; i++){
      const reparationProductsData = new reparationProducts(1, this.productQuantities[i], this.addedProducts[i].id_product, idReparation, "", "");
      this._crudService.registerObject(this.token, "reparationProducts", reparationProductsData).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }

    for(let i = 0; i < this.addedServices.length; i++){
      const reparationServicesData = new reparationServices(1, idReparation, this.addedServices[i].id_service, "", "");
      this._crudService.registerObject(this.token, "reparationServices", reparationServicesData).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }

    this.status = "success";
    this._router.navigate(['reparations']);
  }
}
