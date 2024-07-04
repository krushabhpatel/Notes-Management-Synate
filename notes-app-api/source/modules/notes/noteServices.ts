import appError from "../../common/utils/appError";
import notesModel from "../../model/notesModel";
import { Request } from 'express';

/**
 * Adds a new note.
 * Creates a new note record in the database with the provided title, userId, and description.
 * Throws an appError if any error occurs during note creation.
 * @param {Request} req - The request object.
 * @param {string} title - The title of the note.
 * @param {string} description - The description of the note.
 * @param {string} userId - The user ID associated with the note.
 * @returns {Promise<any>} - Resolves with the created note data.
 * @throws {appError} - Throws an appError with appropriate status and message on failure.
 */
const addNote = async (req: Request, title: string, description: string, userId: string) => {
  try {
    return await notesModel.create({
      title: title,
      userId: userId,
      description: description
    });
  } catch (error: any) {
    throw new appError(error.status, error.message);
  }
};

/**
 * Retrieves a list of notes for a specific user.
 * Finds all notes in the database that belong to the specified userId.
 * Throws an appError if any error occurs during note retrieval.
 * @param {Request} req - The request object.
 * @param {string} userId - The user ID to filter notes by.
 * @returns {Promise<any[]>} - Resolves with an array of notes belonging to the user.
 * @throws {appError} - Throws an appError with appropriate status and message on failure.
 */
const getNoteList = async (req: Request, userId: string) => {
  try {
    return await notesModel.find({
      userId: userId
    });
  } catch (error: any) {
    throw new appError(error.status, error.message);
  }
};

/**
 * Edits an existing note.
 * Updates the title and description of the note identified by noteId.
 * Throws an appError if the note with the specified noteId is not found or if any error occurs during update.
 * @param {Request} req - The request object.
 * @param {string} title - The updated title of the note.
 * @param {string} description - The updated description of the note.
 * @param {string} noteId - The ID of the note to edit.
 * @returns {Promise<any>} - Resolves with the updated note data.
 * @throws {appError} - Throws an appError with appropriate status and message on failure.
 */
const editNote = async (req: Request, title: string, description: string, noteId: string) => {
  try {
    return await notesModel.findByIdAndUpdate(
      noteId,
      {
        $set: {
          title: title,
          description: description
        }
      },
      { new: true } // Return the updated document
    );
  } catch (error: any) {
    throw new appError(error.status, error.message);
  }
};

/**
 * Deletes a note.
 * Removes the note identified by noteId from the database.
 * Throws an appError if the note with the specified noteId is not found or if any error occurs during deletion.
 * @param {Request} req - The request object.
 * @param {string} noteId - The ID of the note to delete.
 * @returns {Promise<any>} - Resolves with the deleted note data.
 * @throws {appError} - Throws an appError with appropriate status and message on failure.
 */
const deleteNote = async (req: Request, noteId: string) => {
  try {
    return await notesModel.findByIdAndDelete(
      noteId,
    );
  } catch (error: any) {
    throw new appError(error.status, error.message);
  }
};

export default {
  addNote,
  getNoteList,
  editNote,
  deleteNote
};
