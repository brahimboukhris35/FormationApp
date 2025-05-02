
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MyspaceComponent } from './pages/myspace/myspace.component';
import { ResponsableCentreSpaceComponent } from './pages/responsable-centre-space/responsable-centre-space.component';

export const routes: Routes = [
    { path: '', redirectTo:'home',pathMatch:'full'},
    { path: 'home', component: HomeComponent },
    {path: 'login',component: LoginComponent },
    {path: 'register' ,component: RegisterComponent },
    {path: 'admin' ,component: AdminComponent },
    {path: 'myspace' ,component: MyspaceComponent },
    {path: 'space' ,component: ResponsableCentreSpaceComponent }
  ];

