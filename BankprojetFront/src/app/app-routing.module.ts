import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { ComptesComponent } from './comptes/comptes.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AddclientComponent } from './addclient/addclient.component';
import { AddCompteComponent } from './add-compte/add-compte.component';
import { LoginComponent } from './login/login.component';
import { AdmintemplateComponent } from './admintemplate/admintemplate.component';
import { AuthGuard } from './authentication.guard';
import { AuthorizationGuard } from './authorization.guard';
import { ClientAccountComponent } from './client-account/client-account.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
    },
    
{
      path:'admin',
      component:AdmintemplateComponent, canActivate:[AuthGuard],
},
        
        {
          path:'client',
          component:ClientsComponent
        },
        
        {
          path:'comptes',
          component:ComptesComponent
        },
        {
          path:'addclient',
          component:AddclientComponent,canActivate:[AuthorizationGuard],data: { expectedRoles: ['ADMIN'] }
        },
        {
          path:'addCompte',
          component:AddCompteComponent,canActivate:[AuthorizationGuard],data: { expectedRoles: ['ADMIN'] }
        },
        {
          path:'clientAccount/:id',
          component:ClientAccountComponent,canActivate:[AuthorizationGuard],data: { expectedRoles: ['ADMIN'] }
        },
        {
          path: 'access-denied',
          component: AccessDeniedComponent,
          
        },
     
   
  {
    path:'home',
    component:HomePageComponent
  },
  {
    path:'',
    component:HomePageComponent
  },

 
 
  {
    path:'**',
    component:AccessDeniedComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
