import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotesListComponent } from './note-list/note-list.component';
import { NoteFormComponent } from './note-form/note-form.component';
import { AuthGuard } from './auth.guard';

/**
 * Array of route configurations for the application.
 * Each route object contains the path and component to be rendered.
 * Some routes also specify canActivate guards for authentication.
 */
export const routes: Routes = [
  { path: 'login', component: LoginComponent },       // Route for the login page
  { path: 'signup', component: SignupComponent },     // Route for the signup page
  { path: 'list', component: NotesListComponent, canActivate: [AuthGuard] },  // Route for notes list, guarded by AuthGuard
  { path: 'addnote', component: NoteFormComponent, canActivate: [AuthGuard] }, // Route for adding a note, guarded by AuthGuard
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route redirects to the login page
];
