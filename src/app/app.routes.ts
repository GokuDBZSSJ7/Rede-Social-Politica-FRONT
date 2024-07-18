import { Routes } from '@angular/router';
import { LoggedComponent } from './pages/logged/logged.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
   {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
   },
   {
      path: '',
      component: LoggedComponent
   },
   {
      path: 'login',
      component: LoginComponent,
   },
   {
      path: 'register',
      component: RegisterComponent
   }
];
