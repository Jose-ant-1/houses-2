import { Component, inject, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housingLocation';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'app-details',
  standalone: true,
  // 2. Añadir ReactiveFormsModule a los imports
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  private cdr = inject(ChangeDetectorRef); // Inyectado



  // 3. Definir el grupo del formulario
  applyForm = new FormGroup({
    // 'Validators.required' hace que el campo sea obligatorio
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    // 'Validators.email' verifica el formato del correo
    email: new FormControl('', [Validators.required, Validators.email])
  });

  weatherData: any; // Variable para el clima

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);

    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;

      if (this.housingLocation?.coordinate) {
        // LLAMADA AL CLIMA
        this.housingService.getWeather(
          this.housingLocation.coordinate.latitude,
          this.housingLocation.coordinate.longitude
        ).then(weather => {
          this.weatherData = weather;
          this.cdr.detectChanges();
        });

        // LLAMADA AL MAPA (Nuevo)
        // Usamos setTimeout para asegurar que el div #map ya esté renderizado
        setTimeout(() => this.initMap(), 100);
      }

      this.cdr.detectChanges();
    });

    // Lógica de LocalStorage
    const savedData = localStorage.getItem('savedApplication');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.applyForm.patchValue(parsedData);
    }
  }

  private initMap(): void {
    if (!this.housingLocation?.coordinate) return;

    const iconDefault = L.icon({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    const lat = this.housingLocation.coordinate.latitude;
    const lon = this.housingLocation.coordinate.longitude;

    const map = L.map('map').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
      .bindPopup(this.housingLocation.name)
      .openPopup();

    // ESTA LÍNEA ES CLAVE: Fuerza al mapa a recalcular su tamaño
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }


  submitApplication() {
    if (this.applyForm.valid) {
      // 1. Enviamos los datos al servicio como ya hacíamos
      this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? ''
      );

      // 2. Guardamos en LocalStorage para cumplir el requisito
      localStorage.setItem('savedApplication', JSON.stringify(this.applyForm.value));

      alert('Application saved in LocalStorage!');
    }
  }
}
