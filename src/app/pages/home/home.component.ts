import { Component } from '@angular/core';
import { PostGridComponent } from '../../components/post-grid/post-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}