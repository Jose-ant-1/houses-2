// src/app/app.ts
import { Component } from '@angular/core';
import { HomeComponent } from './home.component/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App { // <--- Fíjate en este nombre
  title = 'homes';
}
