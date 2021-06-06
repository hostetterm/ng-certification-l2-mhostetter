import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeatherConstants } from '../constants/weather.constants';
import { WeatherEnum } from '../enums/weather.enum';
import { CurrentWeatherResponse } from '../models/current-weather-response';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  @Input('currentWeather') currentWeather: CurrentWeatherResponse;
  @Output() removeLocation = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  removeLocationEvent(zip: string) {
    this.removeLocation.emit(zip);
  }
  
  getWeatherIcon(condition: string): string {
    switch (condition) {
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
}
