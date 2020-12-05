import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { appInit } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VotePayload } from './vote-button/vote-payload';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  vote(votePayload: VotePayload): Observable<any> {
    return this.http.post(`${environment.apiURL}votes/`, votePayload);
  }
}
