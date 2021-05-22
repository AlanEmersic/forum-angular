import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './user/users/users.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostsComponent } from './post/posts/posts.component';
import { ForumComponent } from './forum/forum/forum.component';
import { LoginComponent } from './forum/login/login.component';
import { RegistrationComponent } from './forum/registration/registration.component';
import { FormsModule } from '@angular/forms';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { AuthExpiredInterceptor } from './interceptors/auth-expired.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent,
    PageNotFoundComponent,
    PostsComponent,
    ForumComponent,
    LoginComponent,
    RegistrationComponent,
    ForbiddenPageComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
