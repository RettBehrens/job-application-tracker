// angular imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component imports
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

// service imports
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'details',
    component: ApplicationDetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'details/:id',
    component: ApplicationDetailsComponent,
    canActivate: [AuthGuardService]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
