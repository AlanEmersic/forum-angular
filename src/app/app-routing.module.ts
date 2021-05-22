import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { ForumComponent } from './forum/forum/forum.component';
import { LoginComponent } from './forum/login/login.component';
import { RegistrationComponent } from './forum/registration/registration.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UsersComponent } from './user/users/users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegistrationComponent, pathMatch: 'full' },
  { path: 'forum', component: ForumComponent, pathMatch: 'full' , canActivate: [AuthGuardService]},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
  { path: 'detail/:username', component: UserDetailComponent, canActivate: [AuthGuardService] },
  {
    path: 'forbidden',
    component: ForbiddenPageComponent
  },
  {
    path: '',
    redirectTo: 'forum',
    pathMatch: 'full',    
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
