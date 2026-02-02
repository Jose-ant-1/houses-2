import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Añade esto
import { HomeComponent } from './home.component/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    RouterModule // Añade esto para que funcionen las rutas y el outlet
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'homes';
}
