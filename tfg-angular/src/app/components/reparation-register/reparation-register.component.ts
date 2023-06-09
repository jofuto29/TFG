import { Component} from '@angular/core';
import { reparation } from 'src/app/models/reparation';
import { reparationProducts } from 'src/app/models/reparationProducts';
import { reparationServices } from 'src/app/models/reparationServices';
import { Router} from '@angular/router';
import { crudService } from 'src/app/services/crudService';

@Component({
  selector: 'app-reparation-register',
  templateUrl: './reparation-register.component.html',
  styleUrls: ['./reparation-register.component.css'],
  providers: [crudService]
})
export class ReparationRegisterComponent {
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

  /**saber servicios */
  public selectedServices: number[] = [];
  public addedServices: any[] = [];

  public status: string;
  public identity: any;
  public token: any;

  public stateOptions = ["Standby","Progress","Complete"];

  constructor(
    private _crudService: crudService,
    private _router: Router
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

  onSubmit(form: any){
    console.log(this.reparationData);
    console.log(this.addedProducts);
    console.log(this.productQuantities);
    this._crudService.registerObject(this.token, "reparation", this.reparationData).subscribe(  //el metodo subscribe viene por el tipo observable que hemos declarado en el servicio
      (response) => {
        console.log(response.data.id_reparation);
        
        /*Añadimos los productos asociados --> si utilizamos let o var o variable global en cada iteracion siempre apuntara a la misma direccion no se crearan objeto nuevos*/
        for(let i = 0; i < this.addedProducts.length; i++){
          const reparationProductsData = new reparationProducts(1, this.productQuantities[i], this.addedProducts[i].id_product, response.data.id_reparation, "", "");
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
          const reparationServicesData = new reparationServices(1, response.data.id_reparation, this.addedServices[i].id_service, "", "");
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
      },
      (error) => {
        // Manejar el error aquí
        console.error(error);
        this.status = "error";
      }
    );

    
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
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
        
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
        // Manejar la respuesta exitosa aquí --> la imagen ha sido subida
        this.services = [...response.$model]; // Asignar la respuesta al array de productos
        console.log(this.services);
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

  removeProduct(i:number){
    this.selectedProducts.splice(i,1);
    this.productQuantities.splice(i,1);
    const removedProduct = this.addedProducts.splice(i, 1);
    this.products.push(removedProduct[0]);
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

}
