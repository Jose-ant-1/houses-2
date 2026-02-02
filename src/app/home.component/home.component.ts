import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location.component/housing-location.component';
import { HousingLocation } from '../housingLocation'; // [cite: 10]

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/common';

  // Objeto de prueba con los datos originales y los del PDF [cite: 7, 8, 9]
  housingLocation: HousingLocation = {
    id: 9999,
    name: 'Test Home',
    city: 'Test City',
    state: 'ST',
    photo: `${this.baseUrl}/bernard-hermant-CLKpM6OgrR8-unsplash.jpg`,
    availableUnits: 99,
    wifi: true,
    laundry: false,
    coordinate: {
      latitude: 40.4167,
      longitude: -3.7037
    },
    price: 1200,
    available: true
  };
}
