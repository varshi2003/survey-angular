

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurveyDetail } from '../models/survey-detail.model';
import { SurveyResponse } from '../models/SurveyResponse.model';

@Injectable({
  providedIn: 'root',
})
export class SurveyApiService {
  baseUrl = 'http://localhost:8080/api/surveys';

  constructor(private http: HttpClient) {}


  getSurveys(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/surveyList?page=${page}&size=${size}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }


  deleteSurvey(surveyId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${surveyId}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  getSurveyById(surveyId: string): Observable<SurveyDetail> {
    return this.http.get<SurveyDetail>(`${this.baseUrl}/${surveyId}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  submitSurveyResponse(surveyResponse: SurveyResponse): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/survey-responses`, surveyResponse);
  }

 
}
