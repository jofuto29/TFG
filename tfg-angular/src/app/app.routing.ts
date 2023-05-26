import { ModuleWithProviders} from '@angular/core';//Module with provider
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';


// Definir las rutas
const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // localhost:4200/
  { path: 'inicio', component: HomeComponent }, // inicio
  { path: 'login', component: LoginComponent },
  { path: 'logout/:sure', component: LoginComponent}, //lo que haremos para no definir un nuevo componenete es en la ruta de login añadir un parametro para cerrar la sesion
  { path: 'register', component: RegisterComponent },
  { path: 'ajustes', component: UserEditComponent},
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