import Joi from "joi";

/**
 * Validation schema for adding a note.
 * Ensures that the body of the request contains a userId, title, and description.
 */
const addNote = {
  body: Joi.object().keys({
    userId: Joi.string().required().label("userId"),
    title: Joi.string().required().label("title"),
    description: Joi.string().required().label("description"),
  }),
};

/**
 * Validation schema for editing a note.
 * Ensures that the body of the request contains a title and description.
 */
const editNote = {
  body: Joi.object().keys({
    title: Joi.string().required().label("title"),
    description: Joi.string().required().label("description"),
  }),
};

export default {
addNote,
editNote,

  };