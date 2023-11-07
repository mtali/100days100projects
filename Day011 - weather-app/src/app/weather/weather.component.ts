import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../weather.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styles: []
})
export class WeatherComponent implements OnInit {
  weatherData: any | null;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.weatherService.getWeather().subscribe({
      next: value => {
        this.weatherData = value;
      }
    })
  }

  nextForecasts(data: any): any {
    return [...data['forecast']['forecastday']].splice(1)
  }

  formattedDate(date: any = new Date()): string {
    let options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return (new Date(date)).toLocaleDateString('en-US', options);
  }
}
