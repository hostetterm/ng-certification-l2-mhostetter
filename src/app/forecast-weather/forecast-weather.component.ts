import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherConstants } from '../constants/weather.constants';
import { WeatherEnum } from '../enums/weather.enum';
import { ForecastWeatherResponse } from '../models/forecast-weather-response';
import { WeatherService } from '../service/weather.service';


@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.css']
})
export class ForecastWeatherComponent implements OnInit {
  forecastWeather: ForecastWeatherResponse;
  isError: boolean = false;

  constructor(
              private _weatherService: WeatherService,
              private _route: ActivatedRoute,
              private _router: Router
              ) {
                this._route.paramMap.subscribe(
                  param => {
                    if(!!param.get('zipcode')){
                      this.getForecastWeather(param.get('zipcode'))
                    }
                  },
                  error => {
                    this.handleError(error);
                  }
                )
                
              }

  ngOnInit(): void { }
  getForecastWeather(zip: string) {
    this._weatherService.getForecastWeatherByLocation(zip).subscribe(
      (res: ForecastWeatherResponse) => {
        res.zipcode = zip;
        this.forecastWeather = res;
      },
      error=>{
        this.handleError(error);
      }
    );
  }
  getWeatherIcon(currentCondition: string): string{
    switch (currentCondition) {
      case WeatherEnum.CLOUDY:
        return WeatherConstants.CLOUDS_IMG;
      case WeatherEnum.RAINY:
        return WeatherConstants.RAIN_IMG;
      case WeatherEnum.SNOWY:
        return WeatherConstants.SNOW_IMG;
      default:
        return WeatherConstants.SUN_IMG;
    }
  }
  navigateBack(): void{
    this._router.navigate(['']);
  }
  handleError(err: Error): void {
    this.isError = true;
  }
}
