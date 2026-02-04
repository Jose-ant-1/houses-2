import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component/home.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule, NgOptimizedImage],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'homes';
}
