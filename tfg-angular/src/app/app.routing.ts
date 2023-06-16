import { ModuleWithProviders} from '@angular/core';//Module with provider
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ConocenosComponent } from './components/conocenos/conocenos.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

import { ProductComponent } from './components/product/product.component';
import { ProductRegisterComponent } from './components/product-register/product-register.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';

import { CategoryComponent } from './components/category/category.component';
import { CategoryRegisterComponent } from './components/category-register/category-register.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';

import { ServiceComponent } from './components/service/service.component';
import { ServiceRegisterComponent } from './components/service-register/service-register.component';
import { ServiceUpdateComponent } from './components/service-update/service-update.component';

import { SupplierComponent } from './components/supplier/supplier.component';
import { SupplierRegiterComponent } from './components/supplier-regiter/supplier-regiter.component';
import { SupplierUpdateComponent } from './components/supplier-update/supplier-update.component';

import { ReparationComponent } from './components/reparation/reparation.component';
import { ReparationRegisterComponent } from './components/reparation-register/reparation-register.component';
import { ReparationUpdateComponent } from './components/reparation-update/reparation-update.component';
import { ReparationProductosAsociadosComponent } from './components/reparation-productos-asociados/reparation-productos-asociados.component';
import { ReparationServiciosAsociadosComponent } from './components/reparation-servicios-asociados/reparation-servicios-asociados.component';

import { InvoiceComponent } from './components/invoice/invoice.component';
import { InvoiceRegisterComponent } from './components/invoice-register/invoice-register.component';
import { InvoiceUpdateComponent } from './components/invoice-update/invoice-update.component';
import { InvoiceSeeComponent } from './components/invoice-see/invoice-see.component';
import { DeductionsComponent } from './components/deductions/deductions.component';
import { DeductionsRegisterComponent } from './components/deductions-register/deductions-register.component';
import { DeductionsUpdateComponent } from './components/deductions-update/deductions-update.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { VehicleRegisterComponent } from './components/vehicle-register/vehicle-register.component';
import { VehicleUpdateComponent } from './components/vehicle-update/vehicle-update.component';
import { BookingComponent } from './components/booking/booking.component';
import { BookingUpdateComponent } from './components/booking-update/booking-update.component';
import { BookingRegisterComponent } from './components/booking-register/booking-register.component';
import { BookingAdminComponent } from './components/booking-admin/booking-admin.component';
import { VehiculeUsedComponent } from './components/vehicule-used/vehicule-used.component';
import { VehicleUsedRegisterComponent } from './components/vehicle-used-register/vehicle-used-register.component';
import { VehicleUsedUpdateComponent } from './components/vehicle-used-update/vehicle-used-update.component';
import { VehicleUsedAdminComponent } from './components/vehicle-used-admin/vehicle-used-admin.component';
import { UsedVehicleSeeMoreComponent } from './components/used-vehicle-see-more/used-vehicle-see-more.component';
import { VehicleClientComponent } from './components/vehicle-client/vehicle-client.component';
import { ListUsedVehicleComponent } from './components/list-used-vehicle/list-used-vehicle.component';
import { ListClientsComponent } from './components/list-clients/list-clients.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeesRegisterComponent } from './components/employees-register/employees-register.component';
import { EmployeesUpdateComponent } from './components/employees-update/employees-update.component';


// Definir las rutas
const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // localhost:4200/
  { path: 'inicio', component: HomeComponent }, // inicio
  { path: 'login', component: LoginComponent },
  { path: 'logout/:sure', component: LoginComponent}, //lo que haremos para no definir un nuevo componenete es en la ruta de login añadir un parametro para cerrar la sesion
  { path: 'register', component: RegisterComponent },
  { path: 'listUsers', component: ListUsersComponent },
  { path: 'listClients', component: ListClientsComponent },

  { path: 'ajustes', component: UserEditComponent},
  { path: 'conocenos', component: ConocenosComponent},

  { path: 'productos', component: ProductComponent},
  { path: 'addProduct', component: ProductRegisterComponent},
  { path: 'updateProduct', component: ProductUpdateComponent},

  { path: 'categories', component: CategoryComponent},
  { path: 'addCategory', component: CategoryRegisterComponent},
  { path: 'updateCategory', component: CategoryUpdateComponent},

  { path: 'suppliers', component: SupplierComponent},
  { path: 'addSupplier', component: SupplierRegiterComponent},
  { path: 'updateSupplier', component: SupplierUpdateComponent},

  { path: 'services', component: ServiceComponent},
  { path: 'addService', component: ServiceRegisterComponent},
  { path: 'updateService', component: ServiceUpdateComponent},

  { path: 'reparations', component: ReparationComponent},
  { path: 'addReparation', component: ReparationRegisterComponent},
  { path: 'updateReparation', component: ReparationUpdateComponent},
  { path: 'seeAssociatedProducts', component: ReparationProductosAsociadosComponent},
  { path: 'seeAssociatedServices', component: ReparationServiciosAsociadosComponent},

  { path: 'invoices', component: InvoiceComponent},
  { path: 'addInvoice', component: InvoiceRegisterComponent},
  { path: 'updateInvoice', component: InvoiceUpdateComponent},
  { path: 'seeInvoice', component: InvoiceSeeComponent},

  { path: 'deductions', component: DeductionsComponent},
  { path: 'addDeduction', component: DeductionsRegisterComponent},
  { path: 'updateDeduction', component: DeductionsUpdateComponent},

  { path: 'vehicles', component: VehicleComponent},
  { path: 'addVehicle', component: VehicleRegisterComponent},
  { path: 'updateVehicle', component: VehicleUpdateComponent},
  { path: 'vehicleClient', component: VehicleClientComponent},

  { path: 'bookings', component: BookingComponent},
  { path: 'addBooking', component: BookingRegisterComponent},
  { path: 'updateBooking', component: BookingUpdateComponent},
  { path: 'bookingAdmin', component: BookingAdminComponent},

  { path: 'usedVehicles', component: VehiculeUsedComponent},
  { path: 'addUsedVehicle', component: VehicleUsedRegisterComponent},
  { path: 'updateUsedVehicle', component: VehicleUsedUpdateComponent},
  { path: 'usedVehiclesAdmin', component: VehicleUsedAdminComponent},
  { path: 'usedVehicleSeeMore', component: UsedVehicleSeeMoreComponent},
  { path: 'listUsedVehicle', component: ListUsedVehicleComponent},

  { path: 'employeer', component: EmployeesComponent},
  { path: 'addEmployeer', component: EmployeesRegisterComponent},
  { path: 'updateEmployeer', component: EmployeesUpdateComponent},

  { path: '**', component: ErrorComponent }//esta siempre la colamos la ultima ruta de todas si no las posteriores no funcionaran [ERROR]
];

//EXPORTS
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
//export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

/*
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
*/

//creamos un modulo llamado approuting module, y incluimos la rutas dentro para que puedan ser utilizadas
// en otras partes de la aplciaicon