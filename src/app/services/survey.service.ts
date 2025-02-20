// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { SurveyResponse, QuestionResponse } from '../models/SurveyResponse.model';


// @Injectable({
//   providedIn: 'root'
// })
// export class SurveyService {
//   private apiUrl = 'http://localhost:8080/api/surveys';
 
//   constructor(private http: HttpClient) {}

//   getSurveyById(surveyId: string): Observable<any> {
//     return this.http.get<any>(`http://localhost:8080/api/surveys/${surveyId}`);
//   }

//   getSurveyList(page: number, size: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/surveyList?page=${page}&size=${size}`);
//   }
//    submitSurveyResponse(surveyResponse: SurveyResponse): Observable<any> {
//       return this.http.post<any>(`http://localhost:8080/api/survey-responses`, surveyResponse);
//     }
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

  /**
   * Fetch survey by ID
   * @param surveyId - ID of the survey
   * @returns Observable<any>
   */
  getSurveyById(surveyId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${surveyId}`);
  }

  /**
   * Fetch paginated survey list
   * @param page - Page number
   * @param size - Page size
   * @returns Observable<any>
   */
  getSurveyList(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/surveyList?page=${page}&size=${size}`);
  }

  /**
   * Submit survey response
   * @param surveyResponse - Response data to be submitted
   * @returns Observable<any>
   */
  submitSurveyResponse(surveyResponse: SurveyResponse): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/survey-responses', surveyResponse);
  }
}
