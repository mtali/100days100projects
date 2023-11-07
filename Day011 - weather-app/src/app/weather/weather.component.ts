import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../weather.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styles: []
})
export class WeatherComponent implements OnInit {
  defaultIcon: string = "/assets/263.png";

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.weatherService.getWeather();
  }
}
