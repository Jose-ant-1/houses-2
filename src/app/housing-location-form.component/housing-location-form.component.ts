import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HousingService } from '../housing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-housing-location-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './housing-location-form.component.html',
  styleUrls: ['./housing-location-form.component.css']
})
export class HousingLocationFormComponent {
  private fb = inject(NonNullableFormBuilder);
  private housingService = inject(HousingService);
  private router = inject(Router);

  successMsg = '';
  errorMsg = '';
  submitting = false;

  // Definición del formulario con las validaciones del PDF
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    city: ['', Validators.required, Validators.minLength(2)],
    state: ['', Validators.required, Validators.minLength(3)],
    availableUnits: [1, [Validators.required, Validators.min(1)]],
    price: [10000, [Validators.required, Validators.min(10000)]],
    wifi: [false],
    laundry: [false],
    available: [true]
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMsg = '';

    const newHouse = {
      ...this.form.getRawValue(),
      photo: "", // El PDF pide enviar vacío o placeholder
      coordinate: { latitude: 0, longitude: 0 } // Coordenadas por defecto
    };

    try {
      const created = await this.housingService.addHousingLocation(newHouse);
      this.successMsg = `Home ${created.name} created (ID: ${created.id})`;
      this.form.reset({ availableUnits: 1, wifi: false, laundry: false, available: true });
      setTimeout(() => this.router.navigate(['/']), 30000);
    } catch (error) {
      this.errorMsg = 'Error al guardar. ¿Está json-server corriendo?';
    } finally {
      this.submitting = false;
    }
  }

// Añade esto dentro de la clase en housing-location-form.component.ts
  cancel() {
    this.router.navigate(['/']); // Redirige a la página principal
  }

}
