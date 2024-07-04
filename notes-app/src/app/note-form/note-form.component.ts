import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule]
})
export class NoteFormComponent implements OnInit {
  noteForm: FormGroup;
  isEditMode: boolean = false;
  noteId: string | null = null;

  /**
   * Constructor for creating a new instance of a component.
   * @param {FormBuilder} fb - The FormBuilder service for creating form controls.
   * @param {Router} router - The Router service for navigation.
   * @param {ActivatedRoute} route - The ActivatedRoute service for getting route information.
   * @param {ApiService} apiService - The ApiService for making API calls.
   * @param {MatSnackBar} snackBar - The MatSnackBar service for displaying snack bar messages.
   * @returns None
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private snackBar: MatSnackBar 
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  /**
   * Initializes the component by subscribing to query parameters in the route.
   * If the 'id' parameter is present, sets the component's noteId to the value of 'id',
   * sets isEditMode to true, and patches the noteForm with 'title' and 'description' values from the parameters.
   * @returns None
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.noteId = params['id'];
        this.isEditMode = true;
        this.noteForm.patchValue({
          title: params['title'],
          description: params['description']
        });
      }
    });
  }

  /**
   * Handles form submission. If the form is valid, it either updates an existing note or adds a new note.
   * If in edit mode, it updates the note using the noteId. If not in edit mode, it adds a new note with the userId.
   * Shows a snackbar message based on the response and navigates to the list page.
   * @returns void
   */
  onSubmit(): void {
    if (this.noteForm.valid) {
      const userId = localStorage.getItem('userId');

      if (this.isEditMode && this.noteId) {
        const data = {
          title: this.noteForm.value.title,
          description: this.noteForm.value.description,
        };
        this.apiService.put(`/note/edit/${this.noteId}`, data).subscribe({
          next: (res: any) => {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.router.navigate(['/list']);
          },
          error: (err: any) => {
            this.snackBar.open(err, 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        });
      } else {
        const data = {
          title: this.noteForm.value.title,
          description: this.noteForm.value.description,
          userId: userId
        };
        this.apiService.post('/note/add', data).subscribe({
          next: (res: any) => {
            this.snackBar.open(res.message, 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.router.navigate(['/list']);
          },
          error: (err: any) => {
            this.snackBar.open(err, 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        });
      }
    }
  }
}
