import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input() post!: Post;
}