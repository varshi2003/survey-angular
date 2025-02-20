// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admin-view-form',
//   imports: [],
//   templateUrl: './admin-view-form.component.html',
//   styleUrl: './admin-view-form.component.css'
// })
// export class AdminViewFormComponent {

// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { CommonModule,NgFor,NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-view-form',
  templateUrl: './admin-view-form.component.html',
  styleUrls: ['./admin-view-form.component.css'],
  imports : [CommonModule,NgFor,NgIf]
})
export class AdminViewFormComponent implements OnInit {
  surveyId: string | null = null;
  surveyData: any = null;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.surveyId = this.route.snapshot.paramMap.get('id');
    if (this.surveyId) {
      this.fetchSurvey(this.surveyId);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Survey ID Missing',
        text: 'Survey ID not found in URL. Redirecting to dashboard.',
      }).then(() => {
        this.router.navigate(['/admin-view-surveys']);
      });
    }
  }

  fetchSurvey(surveyId: string): void {
    this.surveyService.getSurveyById(surveyId).subscribe({
      next: (data) => {
        this.surveyData = data;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error Fetching Survey',
          text: `Failed to fetch survey. Error: ${err.message}`,
        }).then(() => {
          this.router.navigate(['/admin-view-surveys']);
        });
      }
    });
  }
}