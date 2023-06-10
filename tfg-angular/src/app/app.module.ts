import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { CapitalizePipe } from './capitalize.pipe';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ProductComponent } from './components/product/product.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConocenosComponent } from './components/conocenos/conocenos.component';
import { ProductRegisterComponent } from './components/product-register/product-register.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryRegisterComponent } from './components/category-register/category-register.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { SupplierRegiterComponent } from './components/supplier-regiter/supplier-regiter.component';
import { SupplierUpdateComponent } from './components/supplier-update/supplier-update.component';
import { ServiceComponent } from './components/service/service.component';
import { ServiceRegisterComponent } from './components/service-register/service-register.component';
import { ServiceUpdateComponent } from './components/service-update/service-update.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    CapitalizePipe,
    UserEditComponent,
    ProductComponent,
    FooterComponent,
    ConocenosComponent,
    ProductRegisterComponent,
    ProductUpdateComponent,
    CategoryComponent,
    CategoryRegisterComponent,
    CategoryUpdateComponent,
    SupplierComponent,
    SupplierRegiterComponent,
    SupplierUpdateComponent,
    ServiceComponent,
    ServiceRegisterComponent,
    ServiceUpdateComponent,
    ReparationComponent,
    ReparationRegisterComponent,
    ReparationUpdateComponent,
    ReparationProductosAsociadosComponent,
    ReparationServiciosAsociadosComponent,
    InvoiceComponent,
    InvoiceRegisterComponent,
    InvoiceUpdateComponent,
    InvoiceSeeComponent,
    DeductionsComponent,
    DeductionsRegisterComponent,
    DeductionsUpdateComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
