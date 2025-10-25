import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Post } from '../interfaces/post';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);
  private baseUrl = environment.firebase.databaseURL;

  getPosts(): Observable<Post[]> {
    return this.http.get<{[key: string]: Post}>(`${this.baseUrl}/posts.json`)
      .pipe(
        map(response => {
          if (!response) return [];
          return Object.keys(response).map(key => ({
            id: key,
            ...response[key]
          }));
        })
      );
  }

  createPost(post: Post): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts.json`, post);
  }
}