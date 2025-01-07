import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ComptesComponent } from './comptes/comptes.component';
import { ClientsComponent } from './clients/clients.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddclientComponent } from './addclient/addclient.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCompteComponent } from './add-compte/add-compte.component';
import { LoginComponent } from './login/login.component';
import { AdmintemplateComponent } from './admintemplate/admintemplate.component';
import { AppHttpInterceptor } from './interceptor/app-http.interceptor';
import { ClientAccountComponent } from './client-account/client-account.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ComptesComponent,
    ClientsComponent,
    HomePageComponent,
    AddclientComponent,
    AddCompteComponent,
    LoginComponent,
    AdmintemplateComponent,
    ClientAccountComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,

    
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass:AppHttpInterceptor ,multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
