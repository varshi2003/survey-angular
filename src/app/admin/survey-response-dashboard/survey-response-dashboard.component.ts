import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { SurveyService } from '../../services/survey-dashboard-api.service';
import { Survey } from '../../models/survey-response-dashboard.model';
import { CommonModule,NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-response-dashboard',
  templateUrl: './survey-response-dashboard.component.html',
  styleUrls: ['./survey-response-dashboard.component.css'],
  imports : [NgFor,CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class SurveyResponseDashboardComponent implements OnInit {
  surveys: Survey[] = [];
  currentPage: number = 0;
  totalPages: number = 1;
  pageSize: number = 3;

  constructor(private surveyService: SurveyService,private router: Router) {}
  

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys(page: number = 0): void {
    this.surveyService.getSurveys(page, this.pageSize).subscribe({
      next: (data) => {
        this.surveys = data.content;
        this.totalPages = data.totalPages;
        this.currentPage = page;
      },
      error: (error) => {
        console.error('Error fetching surveys:', error);
        alert('Failed to load surveys.');
      }
    });
  }

  goToSurveyResponses(responseDetailsId: string): void {
    this.router.navigate(['/admin/survey-response-details', responseDetailsId]);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.loadSurveys(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadSurveys(this.currentPage + 1);
    }
  }
}
