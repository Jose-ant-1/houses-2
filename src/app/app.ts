import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HomeComponent, RouterModule ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'homes';
}
