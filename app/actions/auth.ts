'use server';

import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateAccessToken, generateRefreshToken, setAuthCookies, clearAuthCookies } from '@/lib/auth';
import { signupSchema, loginSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export async function signup(formData: FormData): Promise<AuthResponse> {
  try {
    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const validatedData = signupSchema.parse(rawData);

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return {
        success: false,
        message: 'User with this email already exists',
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create user
    const user = await User.create({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
      role: 'USER',
    });

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Set cookies
    await setAuthCookies(accessToken, refreshToken);

    revalidatePath('/dashboard');

    return {
      success: true,
      message: 'Account created successfully',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return {
        success: false,
        message: error.errors[0].message,
      };
    }
    return {
      success: false,
      message: error.message || 'Failed to create account',
    };
  }
}

export async function login(formData: FormData): Promise<AuthResponse> {
  try {
    const rawData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const validatedData = loginSchema.parse(rawData);

    await connectDB();

    // Find user with password
    const user = await User.findOne({ email: validatedData.email }).select('+password');
    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Set cookies
    await setAuthCookies(accessToken, refreshToken);

    revalidatePath('/dashboard');

    return {
      success: true,
      message: 'Logged in successfully',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return {
        success: false,
        message: error.errors[0].message,
      };
    }
    return {
      success: false,
      message: error.message || 'Failed to login',
    };
  }
}

export async function logout(): Promise<{ success: boolean; message: string }> {
  try {
    await clearAuthCookies();
    revalidatePath('/');
    return {
      success: true,
      message: 'Logged out successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to logout',
    };
  }
}
