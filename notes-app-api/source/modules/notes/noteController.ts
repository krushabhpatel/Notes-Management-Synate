import httpStatus from "http-status";
import createResponse from "../../common/utils/response";
import { Request, Response, NextFunction } from "express";
import noteServices from "./noteServices";

/**
 * Handles adding a new note.
 * Retrieves title, description, and userId from the request body,
 * invokes noteServices to add the note, and sends a success response if successful.
 * Throws an error if any error occurs during note addition.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
const addNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, userId }: { title: string; description: string; userId: string } = req.body;
    await noteServices.addNote(req, title, description, userId);
    createResponse(
      res,
      httpStatus.OK,
      (req as any).t("successMessages.notesAdded"),
    );
  } catch (error: any) {
    createResponse(res, error.status, error.message);
  }
};

/**
 * Handles retrieving the list of notes for a user.
 * Retrieves userId from request parameters,
 * invokes noteServices to fetch the notes, and sends a response with the note list if successful.
 * Throws an error if any error occurs during note retrieval.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
const getNoteList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params['id'];
    const notes = await noteServices.getNoteList(req, userId);
    createResponse(
      res,
      httpStatus.OK,
      (req as any).t("successMessages.notelist"),
      notes
    );
  } catch (error: any) {
    createResponse(res, error.status, error.message);
  }
};

/**
 * Handles editing an existing note.
 * Retrieves noteId from request parameters, title and description from the request body,
 * invokes noteServices to edit the note, and sends a success response if successful.
 * Throws an error if any error occurs during note editing.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
const editNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const noteId = req.params['id'];
    const { title, description }: { title: string; description: string } = req.body;
    await noteServices.editNote(req, title, description, noteId);
    createResponse(
      res,
      httpStatus.OK,
      (req as any).t("successMessages.notesedited"),
    );
  } catch (error: any) {
    createResponse(res, error.status, error.message);
  }
};

/**
 * Handles deleting a note.
 * Retrieves noteId from request parameters,
 * invokes noteServices to delete the note, and sends a success response if successful.
 * Throws an error if any error occurs during note deletion.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const noteId = req.params['id'];
    await noteServices.deleteNote(req, noteId);
    createResponse(
      res,
      httpStatus.OK,
      (req as any).t("successMessages.notedeleted"),
    );
  } catch (error: any) {
    createResponse(res, error.status, error.message);
  }
};

export default {
  addNote,
  getNoteList,
  editNote,
  deleteNote,
};
