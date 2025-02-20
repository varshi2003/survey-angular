

import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private stateService: StateService) {}

  ngOnInit(): void {
    this.stateService.subscribe('userRole', this.handleRoleChange.bind(this));
  }

  ngOnDestroy(): void {
    this.stateService.unsubscribe('userRole', this.handleRoleChange.bind(this));
  }

  handleRoleChange(newRole: string): void {
    this.stateService.unsubscribe('userRole', this.handleRoleChange.bind(this)); 
    if (newRole === 'Admin') {
      this.router.navigate(['/admin/dashboard']);  
    } else {
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

