import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule,Validators} from '@angular/forms';
import {HousingService} from '../housing.service';
import {CommonModule} from '@angular/common';
import { HousingLocation } from '../housingLocation';

@Component({
  selector: 'app-housing-visit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './housing-visit-form.component.html',
  styleUrl: './housing-visit-form.component.css',
})
export class HousingVisitFormComponent {

  constructor() {
    // Lógica de LocalStorage
    const savedData = localStorage.getItem('savedApplication');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.applyForm.patchValue(parsedData);
    }
  }

housingService = inject(HousingService);
  applyForm = new FormGroup({
    // 'Validators.required' hace que el campo sea obligatorio
    fullName: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.min(9)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    date: new FormControl('', [Validators.required]),
    message: new FormControl('', []),
    privacy: new FormControl('', [Validators.required]),
  });


  submitApplication() {
    if (this.applyForm.valid) {
      // 1. Enviamos los datos al servicio como ya hacíamos
      this.housingService.submitApplication(
        this.applyForm.value.fullName ?? '',
        Number(this.applyForm.value.phone ?? 0),
        this.applyForm.value.email ?? '',
        this.applyForm.value.date ?? '',
        this.applyForm.value.message ?? '',
        Boolean(this.applyForm.value.privacy ?? ''),
      );

      // 2. Guardamos en LocalStorage para cumplir el requisito
      localStorage.setItem('savedApplication', JSON.stringify(this.applyForm.value));

      alert('Application saved in LocalStorage!');
    }
  }
}
