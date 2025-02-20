

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from './state.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private stateService: StateService) {}

  ngOnInit(): void {
    this.stateService.subscribe('userRole', this.handleRoleChange.bind(this));
  }

  handleRoleChange(newRole: string): void {
    if (newRole === 'Admin') {
      this.stateService.unsubscribe('userRole', this.handleRoleChange.bind(this));
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.stateService.subscribe('userRole', this.handleRoleChange.bind(this));
      this.router.navigate(['/user/view-surveys']);
    }
  }

  navigateToAdmin(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  navigateToUser(): void {
    this.router.navigate(['/user/view-surveys']);
  }
}
