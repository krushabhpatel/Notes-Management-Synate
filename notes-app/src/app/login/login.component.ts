import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../api.service'; 
/**
 * Component decorator that specifies the metadata for the NoteFormComponent.
 * @Component is a class decorator that marks a class as an Angular component and provides configuration metadata.
 * @param {Object} config - Configuration object for the component.
 * @param {string} config.selector - The CSS selector that identifies this component in a template.
 * @param {string} config.templateUrl - The URL of the template file for this component.
 * @param {string[]} config.styleUrls - An array of URLs to the style files for this component.
 * @param {boolean} config.standalone - Indicates if the component is standalone or part of a larger component.
 * @param {any[]} config.imports - An array of modules to import into
 */
@Component({

  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  /**
   * Constructor for the LoginComponent class.
   * @param {FormBuilder} formBuilder - The FormBuilder service for creating form instances.
   * @param {Router} router - The Router service for navigation.
   * @param {ApiService} apiService - The ApiService for making API calls.
   * @param {MatSnackBar} snackBar - The MatSnackBar service for displaying snack bar messages.
   * @returns None
   */
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private apiService: ApiService, 
              private snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  /**
   * Submits the login form data to the API service for authentication.
   * If the form is valid, it sends a POST request to '/auth/login' with the form data.
   * If the request is successful, it displays a snackbar message with the response message,
   * stores the access token, refresh token, and user ID in local storage, and navigates to the '/list' route.
   * If there is an error during the request, it logs the error to the console.
   */
  onSubmit() {
    if (this.loginForm.valid) {
      this.apiService.post<any>('/auth/login', this.loginForm.value).subscribe({
        next: (res: any) => {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar']
          });

          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('refreshToken', res.data.refreshToken);
          localStorage.setItem('userId', res.data.userId);
          this.router.navigate(['/list']);
        },
        error: (err: any) => {
          console.error('Login error', err);
        }
      });
    }
  }
}
