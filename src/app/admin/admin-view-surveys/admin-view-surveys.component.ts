

import { Component, OnInit } from '@angular/core';
import { SurveyApiService } from '../../services/survey-api.service';
import { SurveyDetail } from '../../models/survey-detail.model';
import { Router } from '@angular/router';
import { CommonModule,NgFor,NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-view-surveys',
  templateUrl: './admin-view-surveys.component.html',
  styleUrls: ['./admin-view-surveys.component.css'],
  imports : [CommonModule,NgIf,NgFor],
})
export class AdminViewSurveysComponent implements OnInit {
  surveys: SurveyDetail[] = [];
  currentPage: number = 0;
  pageSize: number = 3;
  totalPages: number = 1;

  constructor(private surveyApiService: SurveyApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchSurveys();
  }

  
  fetchSurveys(): void {
    this.surveyApiService
      .getSurveys(this.currentPage, this.pageSize)
      .subscribe((data) => {
        this.surveys = data.content;
        this.totalPages = data.totalPages;
      });
  }

 
  showSurveyOptions(survey: SurveyDetail): void {
    Swal.fire({
      title: `What do you want to do with the survey "${survey.name}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'View Form',
      cancelButtonText: 'Delete Survey',
    }).then((result) => {
      if (result.isConfirmed) {
        this.viewForm(survey.id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.deleteSurvey(survey.id);
      }
    });
  }


  viewForm(surveyId: string): void {
    this.router.navigate(['admin/admin-view-form', surveyId]);
  }

  deleteSurvey(surveyId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.surveyApiService.deleteSurvey(surveyId).subscribe(() => {
          Swal.fire('Deleted!', 'Survey has been deleted.', 'success');
          this.fetchSurveys();
        });
      }
    });
  }


  changePage(page: number): void {
    this.currentPage = page;
    this.fetchSurveys();
  }
}
