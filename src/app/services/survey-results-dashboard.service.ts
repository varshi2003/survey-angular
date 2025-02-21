
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurveyResponse } from '../models/SurveyResponse.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyResponseService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getSurveyResponse(responseId: string): Observable<SurveyResponse> {
    return this.http.get<SurveyResponse>(`${this.apiUrl}/survey-responses/${responseId}`);
  }

  getSurveyStatus(surveyId: string, responseId: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/result-dashboard/status/${surveyId}/${responseId}`, { responseType: 'text' });
  }

  acceptSurveyResponse(surveyId: string, responseId: string): Observable<any> {
    return this.http.post<void>(`${this.apiUrl}/result-dashboard/accept`, { surveyId, surveyResponseId: responseId });
  }

  rejectSurveyResponse(surveyId: string, responseId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/result-dashboard/reject`, { surveyId, surveyResponseId: responseId });
  }
}
