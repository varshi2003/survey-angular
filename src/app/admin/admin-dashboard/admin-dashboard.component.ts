import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [CommonModule, NgFor],
  encapsulation: ViewEncapsulation.None,
})
export class AdminDashboardComponent implements OnInit {
  cards = [
    {
      title: 'View Surveys',
      description: 'Check existing surveys and their details.',
      route: 'admin/view-surveys',
      icon: 'view-icon',
    },
    {
      title: 'Create Survey',
      description: 'Design and create a new survey.',
      route: 'admin/create-form',
      icon: 'create-icon',
    },
    {
      title: 'View Response',
      description: 'Analyze survey responses submitted by users.',
      route: 'admin/survey-response',
      icon: 'response-icon',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  navigateTo(route: string): void {
    window.location.href = route;
  }
}
