import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../api.service'; 
/**
 * Component decorator that specifies the metadata for the NoteFormComponent.
 * - selector: 'app-note-form' - The CSS selector that identifies this component in a template.
 * - templateUrl: './note-form.component.html' - The HTML template file for this component.
 * - styleUrls: ['./note-form.component.scss'] - The CSS files to be applied to this component.
 * - standalone: true - Indicates that this component is standalone and not part of a larger component.
 * - imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule] - The modules that need to be imported for this component.
 */
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink,MatSnackBarModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  /**
   * Initializes the signup form with form controls for email, password, confirm password, and full name.
   * Also sets up form validation for required fields and email format.
   * @param {FormBuilder} formBuilder - The form builder service for creating form controls.
   * @param {Router} router - The router service for navigation.
   * @param {HttpClient} http - The HTTP client service for making API calls.
   * @param {ApiService} apiService - The API service for handling API requests.
   * @param {MatSnackBar} snackBar - The snack bar service for displaying notifications.
   * @returns None
   */
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private apiService: ApiService,
    private snackBar: MatSnackBar 

  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      fullname: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  /**
   * Validates if the password and confirm password fields in the form match.
   * @param {FormGroup} form - The form group containing the password and confirm password fields.
   * @returns None
   */
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  /**
   * Submits the signup form data to the API for user registration.
   * If the form is valid, it sends a POST request to the '/auth/signup' endpoint
   * with the user's email, password, and fullname. 
   * If the request is successful, it displays a success message using a snackbar
   * and navigates the user to the login page.
   * If there is an error during the request, it logs the error to the console.
   */
  onSubmit() {
    if (this.signupForm.valid) {
      const data = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        fullname: this.signupForm.value.fullname
      };

      this.apiService.post<any>('/auth/signup', data).subscribe({
        next: (res: any) => {
          this.snackBar.open(res.message, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar']
          });

          this.router.navigate(['/login'])
        },
        error: (err: any) => {
          console.error('Login error', err);
        }
      });
    }
  }
}
