import { SignupSchema } from "@/schemas/signup.schema";
import { LoginSchema } from "@/schemas/login.schema";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAddress{
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  }
}

export interface IProfile{
  _id: string;
  userId: string;
  name: string;
  photo?: string;
  description?: string;
  interests?: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  }
  address?: IAddress;
  createdAt: string;
  updatedAt: string;
}

export enum loginMethod {
  CREDENTIALS = "credentials",
}

export interface IUserState {
  user: IUser | null;
  profile: IProfile | null;
  isLoading: boolean;
  error: string;
  signup: (data: Omit<SignupSchema, "confirmPassword">) => Promise<boolean>;
  login: (method: loginMethod, data?: LoginSchema) => Promise<boolean>;
  logout: () => Promise<boolean>;
  getProfile: () => Promise<IProfile>;
}
