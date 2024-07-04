/**
 * Imports necessary modules and middleware for handling notes in the application.
 * - express: The Express framework for handling HTTP requests.
 * - validate: Middleware for validating request data.
 * - authValidation: Middleware for validating authentication related to notes.
 * - methodNotAllowed: Utility function for handling unsupported HTTP methods.
 * - auth: Middleware for authenticating users.
 * - noteController: Controller for handling note-related operations.
 * - noteValidation: Middleware for validating note-related data.
 */
import express from "express";
import validate from "../../common/middlewares/validate";
import methodNotAllowed from "../../common/utils/methodNotFound";
import auth from "../../common/middlewares/auth";
import noteController from "./noteController";
import noteValidation from "./noteValidation";

const router = express.Router();

/**
 * Defines routes for adding, listing, editing, and deleting notes.
 * @returns None
 */
router
  .route("/add")
  .post(auth('addnote'),validate(noteValidation.addNote), noteController.addNote)
  .all(methodNotAllowed);
  
  router
  .route("/list/:id")
  .get(auth('getnotes'), noteController.getNoteList)
  .all(methodNotAllowed);
  
  router
  .route("/edit/:id")
  .put(auth('editnote'),validate(noteValidation.editNote), noteController.editNote)
  .all(methodNotAllowed);
  
  router
  .route("/delete/:id")
  .delete(auth('deletenote'), noteController.deleteNote)
  .all(methodNotAllowed);
  
  export default router;