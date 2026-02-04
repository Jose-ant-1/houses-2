import { Injectable } from '@angular/core';
import { HousingLocation } from './housingLocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  // Capa de Infraestructura: URLs de conexión
  private readonly url = 'http://localhost:3000/locations';
  private readonly localUrl = 'assets/db.json';

  // Obtener todas las casas con Fallback [cite: 53, 66]
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('API inaccesible');
      return await response.json();
    } catch (error) {
      console.warn('Fallo en API, activando datos locales de emergencia');
      const fallback = await fetch(this.localUrl);
      const data = await fallback.json();
      return data.locations; // Retorna la lista desde assets
    }
  }

  // Obtener una casa por ID con Fallback
  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    try {
      const response = await fetch(`${this.url}/${id}`);
      if (!response.ok) throw new Error('Casa no encontrada en API');
      const json = await response.json();
      return Object.keys(json).length > 0 ? json : undefined;
    } catch (error) {
      console.warn('Fallo en API al buscar ID, recuperando de datos locales');
      const fallback = await fetch(this.localUrl);
      const data = await fallback.json();
      // BUSQUEDA MANUAL: Buscamos la casa específica en el fallback local
      return data.locations.find((location: HousingLocation) => location.id === id);
    }
  }

  // Capa de Casos de Uso: Lógica de negocio
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }

  // Integración externa: Weather API
  async getWeather(lat: number, lon: number): Promise<any> {
    const apiKey = '354ddfdbd26a439093d120713260801';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&lang=es`;
    const response = await fetch(url);
    return await response.json();
  }

  // En housing.service.ts
  async addHousingLocation(newHouse: any): Promise<any> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newHouse)
    });

    if (!response.ok) throw new Error('Error al guardar la vivienda');
    return await response.json();
  }

}
