import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocationComponent} from "../housing-location/housing-location.component";
import {HousingLocation} from "../housing-location";
import {HousingService} from "../services/housing.service";

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
  housingService: HousingService = inject(HousingService)
  housingLocations: HousingLocation[] = [];
  filteredLocations: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations()
      .then((locations: HousingLocation[]) => {
        this.housingLocations = locations;
        this.filteredLocations = locations;
      })
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocations = this.housingLocations;
    } else {
      this.filteredLocations = this.filteredLocations.filter(location => {
        return location?.city.toLowerCase().includes(text.toLowerCase())
      });

      console.log(this.filteredLocations)
    }
  }
}
