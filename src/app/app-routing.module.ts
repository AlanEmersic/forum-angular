import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum/forum.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UsersComponent } from './user/users/users.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'detail/:username', component: UserDetailComponent },
  { path: 'forum', component: ForumComponent, pathMatch: 'full' },
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
