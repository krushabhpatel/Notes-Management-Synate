/**
 * Importing the necessary routes for the Express application.
 * @module express
 * @module authRoute
 * @module noteRoute
 */
import express from "express";
import authRoute from "../modules/auth/authRoute";
import noteRoute from "../modules/notes/noteRoute";




const router = express.Router();

/**
 * Mounts the authentication routes under the '/auth' path and the note routes under the '/note' path.
 * @param {string} "/auth" - The base path for authentication routes.
 * @param {authRoute} authRoute - The authentication route handler.
 * @param {string} "/note" - The base path for note routes.
 * @param {noteRoute} noteRoute - The note route handler.
 */
router.use("/auth", authRoute);
router.use("/note",noteRoute)
export default router;
