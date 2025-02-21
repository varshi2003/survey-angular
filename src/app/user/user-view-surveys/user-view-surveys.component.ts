
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import Swal from 'sweetalert2';
import { CommonModule,NgFor,NgIf } from '@angular/common';

@Component({
  selector: 'app-user-view-surveys',
  templateUrl: './user-view-surveys.component.html',
  styleUrls: ['./user-view-surveys.component.css'],
  imports : [NgIf,NgFor,CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class UserViewSurveysComponent implements OnInit {
  surveys: any[] = [];
  currentPage = 0;
  totalPages = 1;
  pageSize = 3;

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit(): void {
    this.viewSurveys();
  }

  viewSurveys(page: number = 0): void {
    this.surveyService.getSurveyList(page, this.pageSize).subscribe({
      next: (data) => {
        if (data.content && Array.isArray(data.content)) {
          this.surveys = data.content;
          this.totalPages = data.totalPages;
        }
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something went wrong. Please try again later.',
          footer: `<p style="color:red;">Error Details: ${error.message}</p>`,
        });
      },
    });
  }

  changePage(step: number): void {
    this.currentPage += step;
    this.viewSurveys(this.currentPage);
  }

  navigateToSurvey(surveyId: string): void {
    this.router.navigate(['user/survey-form-page', surveyId]);
  }
}
