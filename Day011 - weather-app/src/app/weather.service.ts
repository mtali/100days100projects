import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {
  }

  getWeather(): Observable<any> {
    return this.httpClient.get<any>('/api/v1/forecast.json?key=ff9b41622f994b1287a73535210809&q=Dar-es-Salaam&days=3')
  }
}
