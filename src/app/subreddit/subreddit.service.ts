import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubredditModel } from './subreddit-response';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private http: HttpClient) { }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.http.get<Array<SubredditModel>>(`${environment.apiURL}subreddits`);
  }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    return this.http.post<SubredditModel>(`${environment.apiURL}subreddits`,
      subredditModel);
  }
}
