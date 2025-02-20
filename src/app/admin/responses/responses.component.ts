import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyResponseService } from '../../services/survey-results-dashboard.service';
import { SurveyResponse } from '../../models/SurveyResponse.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css'],
  imports: [CommonModule, NgFor, NgIf],
  encapsulation: ViewEncapsulation.None,
})
export class ResponsesComponent implements OnInit {
  surveyResponse!: SurveyResponse | null;
  statusMessage: string = '';
  loading: boolean = true;
  errorMessage: string = '';
  surveyId: string = '';
  surveyResponseId: string = '';
  statusClass: string = '';

  constructor(
    private route: ActivatedRoute,
    private surveyResponseService: SurveyResponseService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.surveyResponseId = params['id'];
      this.surveyId = params['surveyId'];

      console.log('Survey ID:', this.surveyId);
      console.log('Survey Response ID:', this.surveyResponseId);

      if (!this.surveyResponseId || !this.surveyId) {
        this.errorMessage = 'Survey ID or Response ID is missing!';
        this.loading = false;
      } else {
        this.fetchSurveyResponse();
      }
    });
  }

  fetchSurveyResponse(): void {
    console.log(`Fetching survey response for ID: ${this.surveyResponseId}`);

    this.surveyResponseService
      .getSurveyResponse(this.surveyResponseId)
      .subscribe({
        next: (response) => {
          console.log('Survey Response Data:', response);
          this.surveyResponse = response;
          this.loading = false;
          this.getSurveyStatus();
        },
        error: (err) => {
          console.error('Error fetching survey responses:', err);
          this.errorMessage =
            'Failed to fetch survey responses. Try again later.';
          this.loading = false;
        },
      });
  }

  getSurveyStatus(): void {
    this.surveyResponseService
      .getSurveyStatus(this.surveyId, this.surveyResponseId)
      .subscribe({
        next: (status) => {
          console.log('Survey Status:', status);
          this.statusMessage = `Status: ${status}`;
        },
        error: (err) => {
          console.error('Error fetching status:', err);
          this.statusMessage = 'Status: Unknown';
        },
      });
  }

  acceptResponse(): void {
    this.surveyResponseService
      .acceptSurveyResponse(this.surveyId, this.surveyResponseId)
      .subscribe({
        next: () => {
          this.statusMessage = 'Status: Accepted';
          this.statusClass = 'accepted';

          Swal.fire({
            title: 'Accepted!',
            text: 'The survey response has been accepted.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        },
        error: (err) => {
          console.error('Error accepting response:', err);
          Swal.fire({
            title: 'Error',
            text: 'Failed to accept response.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        },
      });
  }

  rejectResponse(): void {
    this.surveyResponseService
      .rejectSurveyResponse(this.surveyId, this.surveyResponseId)
      .subscribe({
        next: () => {
          this.statusMessage = 'Status: Rejected';
          this.statusClass = 'rejected';

          Swal.fire({
            title: 'Rejected!',
            text: 'The survey response has been rejected.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        },
        error: (err) => {
          console.error('Error rejecting response:', err);
          Swal.fire({
            title: 'Error',
            text: 'Failed to reject response.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        },
      });
  }
}
