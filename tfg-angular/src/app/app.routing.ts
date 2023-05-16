import { ModuleWithProviders} from '@angular/core';//Module with provider
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

// Definir las rutas
const appRoutes: Routes = [
  { path: '', component: LoginComponent }, // localhost:4200/
  { path: 'inicio', component: LoginComponent }, // inicio
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
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