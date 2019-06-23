import { Injectable } from '@angular/core';
import { Http,  Headers, RequestOptions, Jsonp } from '@angular/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MainService {

  constructor(private http:Http) { }
    private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  private baseUrl = '/api';

  getAllQuestions():Observable<any> {
    let url = this.baseUrl + '/newQuiz';
    return this.http.get(url).pipe(map(reponse => reponse.json()));
  }
}
