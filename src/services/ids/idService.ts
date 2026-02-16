import { AuthenticationFailed } from '../../constants/errorCodes/ids/authFailed';
import { UserAlreadyExists } from '../../constants/errorCodes/ids/userAlreadyExists';
import { UserNotFound } from '../../constants/errorCodes/ids/userNotFound';
import { User } from '../../models/user/user';
import { registerUserUsingIdAndPassword } from '../../repositories/idsRepository';
import { hashPassword, verifyHash, filterUserObject, generateAccessToken } from '../../utils/utils';

/**
 * Handles user login logic
 */
async function loginUser(email: string, password: string) {
  // 1. Fetch user including the hidden password field
  const user = await User.findOne({ email }).select('+password').exec();

  if (!user) {
    throw new UserNotFound();
  }

  // 2. Verify credentials
  const isAuthSuccess = await verifyHash(password, user.password ?? '');
  if (!isAuthSuccess) {
    throw new AuthenticationFailed();
  }

  // 3. Prepare response
  const userResponse = filterUserObject(user);
  const access_token = generateAccessToken({ id: user._id });

  return {
    ...userResponse,
    access_token,
  };
}

/**
 * Handles user registration logic
 */
async function registerUser(email: string, password: string) {
  // 1. Check if user already exists
  const existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    // Audit: Use a "UserAlreadyExists" error instead of "UserNotFound"
    throw new UserAlreadyExists();
  }

  // 2. Security: Hash password before saving
  const hashedPassword = await hashPassword(password);

  // 3. Create user via repository
  const newUser = await registerUserUsingIdAndPassword({
    email,
    password: hashedPassword,
  });

  // 4. Return data only (Controller handles the Response)
  const userResponse = filterUserObject(newUser);
  const access_token = generateAccessToken({ id: newUser._id });

  return {
    ...userResponse,
    access_token,
  };
}

export { loginUser, registerUser };
