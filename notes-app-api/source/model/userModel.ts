import mongoose from "mongoose";
import constant from "../common/config/constant";


/**
 * Defines a Mongoose schema for the user entity with fields for full name, email, password, role, and status.
 * @param {Object} fullName - The full name of the user.
 * @param {Object} email - The email address of the user.
 * @param {Object} password - The password of the user.
 * @param {Object} role - The role of the user, default is "user".
 * @param {Object} status - The status of the user, can be one of ACTIVE, INACTIVE, or DELETE.
 * @returns A Mongoose model for the "users" collection with the defined schema.
 */
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true
  },
  password: {
    type: String,
    // required:true,
  },  
  role: {
    type: String,
    // required:true,
    default:"user"
  },
  status: {
    type: String,
    enum: [
      constant.STATUS.ACTIVE,
      constant.STATUS.INACTIVE,
      constant.STATUS.DELETE,
    ],
    default: constant.STATUS.ACTIVE,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
