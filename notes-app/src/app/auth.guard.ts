import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
/**
 * AuthGuard class that implements CanActivate interface to protect routes based on authentication.
 * @constructor
 * @param {Router} router - The Angular router service.
 * @method canActivate - Method to determine if a route can be activated.
 * @returns {boolean} - Returns true if the user is authenticated and has a valid access token, otherwise redirects to the login page and returns false.
 */
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if localStorage is defined (this check is typically for server-side rendering scenarios)
    if (typeof localStorage !== 'undefined') {
      // Retrieve the access token from localStorage
      const token = localStorage.getItem('accessToken');
      // If a token exists, allow activation of the route
      if (token) {
        return true;
      }
    }
    // If no token is found, redirect to the login page and prevent activation of the route
    this.router.navigate(['/login']);
    return false;
  }
}
