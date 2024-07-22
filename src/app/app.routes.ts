import { Routes } from '@angular/router';
import { LoggedComponent } from './pages/logged/logged.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { FeedComponent } from './pages/logged/feed/feed.component';

export const routes: Routes = [
   {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
   },
   {
      path: '',
      component: LoggedComponent,
      canActivate: [AuthGuard],
      children: [
         {
            path: 'feed',
            component: FeedComponent
         }
      ]
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
