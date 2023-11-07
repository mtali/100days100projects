import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../weather.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styles: []
})
export class WeatherComponent implements OnInit {
  defaultIcon: string = "/assets/263.png";
  weatherData: any | null;

  constructor(private weatherService: WeatherService) {
    this.weatherData = null;
  }

  ngOnInit() {
    this.weatherService.getWeather().subscribe({
      next: value => {
        this.weatherData = value
      }
    })
  }
}
