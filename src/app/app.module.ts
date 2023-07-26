import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LottieModule } from 'ngx-lottie';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { DashComponent } from './dash/dash.component';
import { NavComponent } from './nav/nav.component';
import { LineComponent } from './charts/line/line.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AreaComponent } from './charts/area/area.component';
import { MapComponent } from './map/map.component';
import { BarComponent } from './charts/bar/bar.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { MapsComponent } from './maps/maps.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule} from '@angular/common/http';
import { Bar1Component } from './charts/moyennecharts/bar1/bar1.component';
import { NotificationComponent } from './notification/notification.component';
import { ToastrModule } from 'ngx-toastr';


export function playerFactory(): any {  
  return import('lottie-web');
}
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashComponent,
    NavComponent,
    LineComponent,
    AreaComponent,
    MapComponent,
    BarComponent,
    AnalyticsComponent,
    MapsComponent,
    RegisterComponent,
    Bar1Component,
    NotificationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),  
    
    FormsModule,
    NgApexchartsModule,
    HttpClientModule,
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
