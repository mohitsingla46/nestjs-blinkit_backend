import { Model } from 'mongoose';
import { Admin } from '../mongoose/users.entity.js';

export const createAuthenticateFunction = (adminModel: Model<Admin>) => {
  return async (email: string, password: string): Promise<Admin | null> => {
    if (!email || !password) {
      return null;
    }

    const admin = await adminModel.findOne({ email, password }).exec();

    if (admin) {
      return admin;
    }

    return null;
  };
};
