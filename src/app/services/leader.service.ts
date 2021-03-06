import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from "../shared/leader";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})

export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeaderIds(): Observable<string[] | any> {
    return this.getLeaders().pipe(map(leaders => leaders.map(leader => leader.id)))
      .pipe(catchError(error => error));
  }

  putLeader(leader: Leader): Observable<Leader> {
    const httpOptions= {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<Leader>(baseURL + 'leaders/' + leader.id, leader, httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}




// @Injectable({
//   providedIn: 'root'
// })
// export class LeaderService {

//   constructor() { }

//   getLeaders(): Observable<Leader[]> {
//     return of(LEADERS).pipe(delay(2000));
//   }

//   getLeader(id: string): Observable<Leader> {
//     return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
//   }

//   getFeaturedLeader(): Observable<Leader> {
//     return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
//   }
// }


    // getLeaders(): Promise<Leader[]> {
  //   return new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(LEADERS), 2000);
  //   });
  // }

  // getLeader(id: string): Promise<Leader> {
  //   return new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
  //   });
  // }

  // getFeaturedLeader(): Promise<Leader> {
  //   return  new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
  //   });