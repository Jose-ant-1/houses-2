import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location.component/housing-location.component';
import { HousingLocation } from '../housingLocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  private cdr = inject(ChangeDetectorRef); // 2. Inyecta el detector de cambios

  constructor() {
    this.housingService.getAllHousingLocations().then((list: HousingLocation[]) => {
      this.housingLocationList = list;
      this.filteredLocationList = list;

      // 3. Forzamos a Angular a que vuelva a mirar la pantalla
      this.cdr.detectChanges();

      console.log('Datos fijados en pantalla:', this.housingLocationList.length);
    });
  }

  // 3. Esta es la función de filtrado
  filterResults(text: string) {
    // Si no hay texto, mostramos la lista completa original
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    // Filtramos ignorando mayúsculas/minúsculas
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
