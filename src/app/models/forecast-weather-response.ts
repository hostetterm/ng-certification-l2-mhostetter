export class ForecastWeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastWeather[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    },
    country: string;
  };
  zipcode?: string;
}
export class ForecastWeather {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds?: {
    all: number;
  };
  wind?: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain?: {};
  sys: {
    pod: string;
  };
  dt_txt: string;
  zip?: string;
}
