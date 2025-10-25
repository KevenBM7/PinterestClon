import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { Post } from '../interfaces/post';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);
  private baseUrl = environment.firebase.databaseURL;

  async getPosts(): Promise<Post[]> {
    try {
      const response = await firstValueFrom(
        this.http.get<{[key: string]: Post}>(`${this.baseUrl}/posts.json`)
          .pipe(
            map(response => {
              if (!response) return [];
              return Object.keys(response).map(key => ({
                id: key,
                ...response[key]
              }));
            })
          )
      );
      return response;
    } catch (error) {
      console.error('Error al obtener posts:', error);
      throw error;
    }
  }

  async createPost(post: Post): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.baseUrl}/posts.json`, post)
      );
      return response;
    } catch (error) {
      console.error('Error al crear post:', error);
      throw error;
    }
  }
}