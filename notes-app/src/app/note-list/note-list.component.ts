import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../api.service'; 

/**
 * Component decorator for the 'app-note-list' component.
 * @Component({
 *   selector: 'app-note-list',
 *   standalone: true,
 *   imports: [CommonModule, RouterLink, MatSnackBarModule],
 *   templateUrl: './note-list.component.html',
 *   styleUrls: ['./note-list.component.scss']
 * })
 */
@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatSnackBarModule],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NotesListComponent implements OnInit {
  /**
   * Constructor for the NotesComponent class.
   * @param {Router} router - The router service for navigation.
   * @param {MatSnackBar} snackBar - The snack bar service for displaying notifications.
   * @param {ApiService} apiService - The API service for making HTTP requests.
   */
  notes: any[] = [];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) { }

  /**
   * Initializes the component and loads the notes.
   * @returns void
   */
  ngOnInit(): void {
    this.loadNotes();
  }

  /**
   * Loads notes for the current user from the API service.
   * Retrieves the user ID from local storage and makes a GET request to fetch the notes.
   * If the user ID is missing, an error message is logged to the console.
   * @returns None
   */
  loadNotes(): void {
    const userId = localStorage.getItem('userId'); // Replace with actual user ID from local storage if available

    if (userId) {
      this.apiService.get<any>(`/note/list/${userId}`).subscribe({
        next: (res: any) => {
          this.notes = res.data;
        },
        error: (error) => {
          this.snackBar.open(error, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      });
    } else {
      console.error('User ID is missing');
    }
  }

  /**
   * Edit a note with the given noteId by navigating to the addnote route with the note details.
   * @param {number} noteId - The id of the note to edit.
   * @returns None
   */
  editNote(noteId: number): void {
    const note = this.notes.find(n => n._id === noteId);
    if (note) {
      this.router.navigate(['/addnote'], {
        queryParams: { id: note._id, title: note.title, description: note.description }
      });
    }
  }

  /**
   * Deletes a note with the given noteId by making a DELETE request to the API endpoint.
   * Shows a snackbar message with the response message or error message.
   * @param {number} noteId - The ID of the note to be deleted.
   * @returns None
   */
  deleteNote(noteId: number): void {
    this.apiService.delete<any>(`/note/delete/${noteId}`).subscribe({
      next: (res: any) => {
        this.snackBar.open(res.message, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.loadNotes();
      },
      error: (error) => {
        this.snackBar.open(error, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

  /**
   * Logs out the user by removing access tokens and user information from local storage,
   * displaying a success message using a snack bar, and navigating the user to the login page.
   * @returns void
   */
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    this.snackBar.open("Logout Successfully", 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
    this.router.navigate(['/login']);
  }
}
