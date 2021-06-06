import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherConstants } from '../constants/weather.constants';
import { CurrentWeatherResponse } from '../models/current-weather-response';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentWeatherArray: CurrentWeatherResponse[] = [];
  isError: boolean = false;
  zipcodeArray: string[] = [];
  @ViewChild('addLocation') addLocation: ElementRef;

  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    let weatherFromStorage: string[] = JSON.parse(localStorage.getItem(WeatherConstants.ZIPCODES));
    if(!!weatherFromStorage) {
      this.zipcodeArray = weatherFromStorage ?? [];
      if(this.zipcodeArray.length !== this.currentWeatherArray.length){
        const length = this.zipcodeArray.length;
        for(let i = 0; i < length; i++) {
          this.addLocationEvent(this.zipcodeArray[i]);
        }
      }
    }
  }

  addLocationEvent(zip: string) {
    this._weatherService.getCurrentWeatherByLocation(zip).subscribe(
      (res: CurrentWeatherResponse) => {
        res.zip = zip;
        if(!(this.currentWeatherArray.indexOf(res) > -1)){
          this.currentWeatherArray.unshift(res);
        }
        if(!(this.zipcodeArray.indexOf(zip) > -1)){
          this.zipcodeArray.push(zip);
        }
        if(!!this.addLocation && !!this.addLocation.nativeElement.value){
          this.addLocation.nativeElement.value = '';
        }
        localStorage.setItem(WeatherConstants.ZIPCODES, JSON.stringify(this.zipcodeArray));
        this.isError = false;
      },
      err => {
        this.handleError(err);
      }
    );
  }

  removeLocation(zip: string){
    const index = this.currentWeatherArray.findIndex(code => code.zip == zip);
    const zipIndex = this.zipcodeArray.findIndex(code => code == zip);
    this.currentWeatherArray.splice(index, 1);
    this.zipcodeArray.splice(zipIndex, 1);
    localStorage.setItem(WeatherConstants.ZIPCODES, JSON.stringify(this.zipcodeArray));
  }

  handleError(err: Error) {
    this.isError = true;
  }
}