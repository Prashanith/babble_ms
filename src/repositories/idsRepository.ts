import { User, IUser } from "../models/user/user";

/**
 * Creates a new user record in the database.
 * 
 * @param {Partial<IUser>} userData - The user data to persist.
 * @returns {Promise<IUser>} The newly created user document.
 * @throws {Error} Database connection or validation error.
 */
async function registerUserUsingIdAndPassword(userData: Partial<IUser>): Promise<IUser> {
  try {
    const user = await User.create(userData);

    return user;
  } catch (error: any) {
    throw error;
  }
}

export { registerUserUsingIdAndPassword };
