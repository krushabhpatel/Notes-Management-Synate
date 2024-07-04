import mongoose from "mongoose";

/**
 * Defines a Mongoose schema for booking with userId, title, and description fields.
 * @param {Object} noteSchema - The Mongoose schema for booking.
 * @param {Object} noteModel - The Mongoose model for booking.
 */
const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    // required: true,
    default: null,
  },

  title: {
    type: String,
    default: "",
  },

  description: {
    type: String,
    default: "",
  }
});

const noteModel = mongoose.model("notes", noteSchema);

export default noteModel;