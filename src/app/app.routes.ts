import { Routes } from '@angular/router';
import { LoggedComponent } from './pages/logged/logged.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { FeedComponent } from './pages/logged/feed/feed.component';
import { CandidatesComponent } from './pages/logged/candidates/candidates.component';
import { CandidateModalComponent } from './pages/logged/candidates/candidate-modal/candidate-modal.component';
import { CampaignsComponent } from './pages/logged/campaigns/campaigns.component';
import { PartiesComponent } from './pages/logged/parties/parties.component';
import { PartiesFormComponent } from './pages/logged/parties/parties-form/parties-form.component';
import { PositionsComponent } from './pages/logged/positions/positions.component';
import { PositionsFormComponent } from './pages/logged/positions/positions-form/positions-form.component';
import { MyUserComponent } from './pages/logged/my-user/my-user.component';
import { ApproveCandidatesComponent } from './pages/logged/approve-candidates/approve-candidates.component';
import { DashboardComponent } from './pages/logged/dashboard/dashboard.component';

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
            path: 'dashboard',
            component: DashboardComponent
         },
         {
            path: 'feed',
            component: FeedComponent
         },
         {
            path: 'candidates',
            component: CandidatesComponent
         },
         {
            path: 'candidate-creation',
            component: CandidateModalComponent
         },
         {
            path: 'campaigns',
            component: CampaignsComponent
         },
         {
            path: 'parties',
            component: PartiesComponent
         },
         {
            path: 'parties-creation',
            component: PartiesFormComponent
         },
         {
            path: 'positions',
            component: PositionsComponent,
         },
         {
            path: 'positions-creation',
            component: PositionsFormComponent
         },
         {
            path: 'my-user',
            component: MyUserComponent
         },
         {
            path: 'approve-candidates',
            component: ApproveCandidatesComponent
         },
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