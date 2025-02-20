
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { CommonModule,NgIf } from '@angular/common';
// import { SurveyResponseService } from '../../services/survey-results-dashboard.service';
// import { Survey } from '../../models/survey-response-dashboard.model';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-responses',
//   templateUrl: './responses.component.html',
//   styleUrls: ['./responses.component.css'],
//   imports : [NgIf,CommonModule]
// })
// export class ResponsesComponent implements OnInit {
//   responseId: string | null = null;
//   surveyId: string | null = null;
//   responseForm!: FormGroup;
//   surveyResponse!: Survey;
//   statusMessage = '';

//   constructor(
//     private route: ActivatedRoute,
//     private fb: FormBuilder,
//     private surveyResponseService: SurveyResponseService
//   ) {}

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       this.responseId = params['id'];
//       this.surveyId = params['surveyId'];

//       if (this.responseId && this.surveyId) {
//         this.fetchSurveyResponse(this.responseId);
//         this.fetchSurveyStatus(this.surveyId, this.responseId);
//       }
//     });

//     this.responseForm = this.fb.group({});
//   }

//   fetchSurveyResponse(responseId: string): void {
//     this.surveyResponseService.getSurveyResponse(responseId).subscribe({
//       next: (data) => {
//         this.surveyResponse = data;
//       },
//       error: () => {
//         Swal.fire('Error', 'Failed to fetch survey details', 'error');
//       }
//     });
//   }

//   fetchSurveyStatus(surveyId: string, responseId: string): void {
//     this.surveyResponseService.getSurveyStatus(surveyId, responseId).subscribe({
//       next: (status) => {
//         this.statusMessage = `Status: ${status}`;
//       },
//       error: () => {
//         Swal.fire('Error', 'Failed to fetch survey status', 'error');
//       }
//     });
//   }

//   acceptResponse(): void {
//     if (!this.surveyId || !this.responseId) return;

//     this.surveyResponseService.acceptSurvey(this.surveyId, this.responseId).subscribe({
//       next: () => {
//         this.statusMessage = 'Status: Accepted';
//         Swal.fire('Success', 'Response accepted successfully!', 'success');
//       },
//       error: () => {
//         Swal.fire('Error', 'Something went wrong', 'error');
//       }
//     });
//   }

//   rejectResponse(): void {
//     if (!this.surveyId || !this.responseId) return;

//     this.surveyResponseService.rejectSurvey(this.surveyId, this.responseId).subscribe({
//       next: () => {
//         this.statusMessage = 'Status: Rejected';
//         Swal.fire('Rejected', 'Response has been rejected', 'warning');
//       },
//       error: () => {
//         Swal.fire('Error', 'Something went wrong', 'error');
//       }
//     });
//   }
// }
import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyResponseService } from '../../services/survey-results-dashboard.service';
import { SurveyResponse } from '../../models/SurveyResponse.model';
import { CommonModule,NgFor,NgIf } from '@angular/common';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css'],
  imports : [CommonModule,NgFor,NgIf],
  encapsulation : ViewEncapsulation.None
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
    // Use queryParams instead of params
    this.route.queryParams.subscribe(params => {
      this.surveyResponseId = params['id'];  // Change from 'surveyResponseId' to 'id' (as per URL)
      this.surveyId = params['surveyId']; // Correct query param key

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

    this.surveyResponseService.getSurveyResponse(this.surveyResponseId).subscribe({
      next: (response) => {
        console.log('Survey Response Data:', response);
        this.surveyResponse = response;
        this.loading = false;
        this.getSurveyStatus();
      },
      error: (err) => {
        console.error('Error fetching survey responses:', err);
        this.errorMessage = 'Failed to fetch survey responses. Try again later.';
        this.loading = false;
      }
    });
  }

  getSurveyStatus(): void {
    this.surveyResponseService.getSurveyStatus(this.surveyId, this.surveyResponseId).subscribe({
      next: (status) => {
        console.log('Survey Status:', status);
        this.statusMessage = `Status: ${status}`;
      },
      error: (err) => {
        console.error('Error fetching status:', err);
        this.statusMessage = 'Status: Unknown';
      }
    });
  }

  acceptResponse(): void {
    this.surveyResponseService.acceptSurveyResponse(this.surveyId, this.surveyResponseId).subscribe({
      next: () => {
        this.statusMessage = 'Status: Accepted';
        this.statusClass = 'accepted';
      },
      error: (err) => {
        console.error('Error accepting response:', err);
        alert('Failed to accept response.');
      }
    });
  }

  rejectResponse(): void {
    this.surveyResponseService.rejectSurveyResponse(this.surveyId, this.surveyResponseId).subscribe({
      next: () => {
        this.statusMessage = 'Status: Rejected';
        this.statusClass = 'rejected';
      },
      error: (err) => {
        console.error('Error rejecting response:', err);
        alert('Failed to reject response.');
      }
    });
  }
}
