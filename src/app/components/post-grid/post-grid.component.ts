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

  async loadPosts() {
    try {
      this.isLoading = true;
      this.posts = await this.postService.getPosts();
      console.log('Posts cargados:', this.posts);
    } catch (error) {
      console.error('Error cargando posts:', error);
    } finally {
      this.isLoading = false;
    }
  }
}