import { User } from '../models/user/user.model.js'; 
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.js'; 


export const registerUserService = async (userData) => {
    console.log("User data in service: ", userData);
    const { username, email, password } = userData;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("User already exists");
    }

    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    // Return user data and token
    if (user) {
        const userResponse = user.toObject();
        delete userResponse.password; // Don't send password back
        return { user: userResponse, token: generateToken(user._id) };
    } else {
        throw new Error("Invalid user data");
    }
};

export const loginUserService = async ({ email, username, password }) => {
  // Find user by email or username
  const user = await User.findOne({ email } ? { email } : { username });
  if (!user) throw new Error("User not found");
  
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  const userResponse = user.toObject();
  delete userResponse.password;
  return { user: userResponse, token: generateToken(user._id) };
};