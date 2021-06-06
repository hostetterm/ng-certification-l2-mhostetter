import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ForecastWeatherResponse } from '../models/forecast-weather-response';
import { CurrentWeatherResponse } from '../models/current-weather-response';

const apiKey = '5a4b2d457ecbef9eb2a71e480b947604';
const baseUrl = 'https://api.openweathermap.org/data/2.5/';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  getCurrentWeatherByLocation(zipcode: string): Observable<CurrentWeatherResponse> {
    let url = baseUrl + 'weather?zip=' + zipcode + ',us&units=metric&appid=' + apiKey;
    return this._http.get<CurrentWeatherResponse>(url);
  }
  getForecastWeatherByLocation(zipcode: string): Observable<ForecastWeatherResponse> {
    let url = baseUrl + 'forecast?zip=' + zipcode + ',us&cnt=5&units=metric&appid=' + apiKey;
    return this._http.get<ForecastWeatherResponse>(url);
  }
}