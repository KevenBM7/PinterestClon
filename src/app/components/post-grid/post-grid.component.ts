import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from '../post-card/post-card.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-post-grid',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  templateUrl: './post-grid.component.html',
  styleUrl: './post-grid.component.scss'
})
export class PostGridComponent implements OnInit {
  private postService = inject(PostService);
  posts: Post[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.isLoading = false;
        console.log('Posts cargados:', posts);
      },
      error: (error) => {
        console.error('Error cargando posts:', error);
        this.isLoading = false;
      }
    });
  }
}