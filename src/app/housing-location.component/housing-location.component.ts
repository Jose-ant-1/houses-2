import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housingLocation';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './housing-location.component.html', // VERIFICA QUE EL NOMBRE SEA EXACTO
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation; // Esta es la variable que el HTML no encuentra
}
