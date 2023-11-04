import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true; // Allow access for admin
    } else {
      this.router.navigate(['/app-forbidden']); // Redirect to the forbidden page
      return false; // Prevent access for non-admin users
    }
  }
}

