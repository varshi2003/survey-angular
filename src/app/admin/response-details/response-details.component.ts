import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule,NgFor,NgIf } from '@angular/common';
import Swal from 'sweetalert2';

interface SurveyResponse {
  id: string;
  name: string;
  surveyId: string;
}

@Component({
  selector: 'app-response-details',
  templateUrl: './response-details.component.html',
  styleUrls: ['./response-details.component.css'],
  imports : [CommonModule,NgFor]
})
export class ResponseDetailsComponent implements OnInit {
  surveyId!: string | null;
  responses: SurveyResponse[] = [];
  apiUrl = `http://localhost:8080/api/survey-responses/form-names`;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.surveyId = this.route.snapshot.paramMap.get('id');
    if (this.surveyId) {
      this.fetchSurveyResponses(this.surveyId);
    }
  }

  fetchSurveyResponses(surveyId: string): void {
    this.http.get<SurveyResponse[]>(`${this.apiUrl}?surveyId=${surveyId}`).subscribe({
      next: (data) => {
        if (!Array.isArray(data) || data.length === 0) {
          this.responses = [];
        } else {
          this.responses = data.filter(response => response.surveyId === surveyId);
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error fetching survey responses! Please try again later.',
        });
      }
    });
  }

  navigateToResponseDetails(responseId: string): void {
    this.router.navigate(['/admin/response-details', responseId], { queryParams: { surveyId: this.surveyId } });
  }

  goBack(): void {
    this.router.navigate(['/admin/survey-response-dashboard']);
  }
  navigateToResponses(responseId: string): void {
    this.router.navigate(['/admin/responses'], { queryParams: { id: responseId, surveyId: this.surveyId } });
  }
  
}
