import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from './post.model';
import { CreatePostPayload } from '../post/create-post/create-post.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(`${environment.apiURL}posts/`);
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post(`${environment.apiURL}posts/`, postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(`${environment.apiURL}posts/${id}`);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${environment.apiURL}users/` + name + `/posts`);
  }

}
