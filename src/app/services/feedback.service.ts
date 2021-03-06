import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Feedback, ContactType } from '../shared/feedback'

@Injectable({
  providedIn: 'root'
})

export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    addFeedback (feedback : Feedback): Observable<Feedback> {
      const httpOptions= {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json'
        })
      };
    return this.http.post<Feedback>(baseURL, feedback, httpOptions)
      .pipe(
        catchError(this.processHTTPMsgService.handleError)
      );
    }
}

  

// addHero (hero: Hero): Observable<Hero> {
//   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
//     .pipe(
//       catchError(this.handleError('addHero', hero))
//     );
// }


