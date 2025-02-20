
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class SurveyService {
//   constructor(private http: HttpClient) {}

//   getSurveys(page: number, pageSize: number): Observable<any> {
//     return this.http.get<any>(`http://localhost:8080/api/surveys/surveyList?page=${page}&size=${pageSize}`);
//   }

//   getSurveyById(surveyId: string): Observable<any> {
//     return this.http.get<any>(`http://localhost:8080/api/surveys/surveyList/${surveyId}`);
//   }

//   submitSurveyResponse(surveyId: string, responses: any[]): Observable<any> {
//     return this.http.post<any>(`http://localhost:8080/api/surveys/survey-responses`, {
//       surveyId: surveyId,
//       responses: responses,
//     });
//   }
  
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurveyResponse } from '../models/SurveyResponse.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = 'http://localhost:8080/api/surveys';

  constructor(private http: HttpClient) {}

  // getSurveyById(surveyId: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/${surveyId}`);
  // }
  getSurveyById(surveyId: string): Observable<any> {
    console.log('🔍 Fetching survey for ID:', surveyId); // Debugging log
    return this.http.get<any>(`${this.apiUrl}/${surveyId}`);
  }

 
  getSurveyList(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/surveyList?page=${page}&size=${size}`);
  }

  submitSurveyResponse(surveyResponse: SurveyResponse): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/survey-responses', surveyResponse);
  }
}

