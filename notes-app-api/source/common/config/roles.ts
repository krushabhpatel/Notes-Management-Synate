import constant from "./constant";
/**
 * Defines roles and their corresponding rights using a Map data structure.
 * @constant {Array} roles - An array containing role constants for ADMIN and USER.
 * @constant {Map} roleRights - A Map object to store role rights mapping.
 * @returns None
 */
const roles = [constant.ROLES.ADMIN, constant.ROLES.USER];
const roleRights = new Map();

roleRights.set(roles[0], [
 
]);
roleRights.set(roles[1], [
  "addnote",
  "getnotes",
  "editnote",
  "deletenote"
]);

export { roles, roleRights };
