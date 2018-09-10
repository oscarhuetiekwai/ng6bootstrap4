import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/auth-guard.service';
import { RoleGuard } from './service/role-guard.service';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '', 
        component:HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'login', 
        component:LoginComponent
      },
      {
        path: 'users', 
        component:UsersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'home',
        component:HomeComponent,
        canActivate: [AuthGuard,RoleGuard]
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
