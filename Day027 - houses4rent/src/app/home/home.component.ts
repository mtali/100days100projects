import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocationComponent} from "../housing-location/housing-location.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
