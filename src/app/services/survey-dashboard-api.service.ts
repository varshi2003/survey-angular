import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey-response-dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private baseUrl = 'http://localhost:8080/api/surveys';

  constructor(private http: HttpClient) {}

  getSurveys(page: number, size: number): Observable<{ content: Survey[], totalPages: number }> {
    return this.http.get<{ content: Survey[], totalPages: number }>(`${this.baseUrl}/surveyList?page=${page}&size=${size}`);
  }
}
