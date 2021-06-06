import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeatherService } from './service/weather.service';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastWeatherComponent } from './forecast-weather/forecast-weather.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports:      [
    BrowserModule, 
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [ 
    AppComponent, 
    DashboardComponent, 
    CurrentWeatherComponent, 
    ForecastWeatherComponent 
  ],
  bootstrap: [ AppComponent ],
  providers: [ WeatherService ]
})
export class AppModule { }
