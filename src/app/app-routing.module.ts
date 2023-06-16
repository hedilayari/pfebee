import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashComponent } from './dash/dash.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { MapsComponent } from './maps/maps.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { DashGuard } from './guards/dash.guard';

const routes: Routes = [
  { path: 'login', component: AuthComponent,canActivate:[DashGuard] },
  { path: 'register', component: RegisterComponent ,canActivate:[DashGuard] },// Route vide pour la page d'authentification
  { path: 'dashboard', component: DashComponent ,canActivate:[AuthGuard]},
  { path: 'analytics', component: AnalyticsComponent ,canActivate:[AuthGuard]},
  { path: 'map', component: MapsComponent,canActivate:[AuthGuard]},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
