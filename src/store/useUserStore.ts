import { create, StateCreator } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import axios from "axios";
import { SignupSchema } from "@/schemas/signup.schema";
import { LoginSchema } from "@/schemas/login.schema";
import { signIn, signOut } from "next-auth/react";
import { IUserState, loginMethod, IUser, IProfile  } from "@/types/user";

axios.defaults.withCredentials = true;

const userStore: StateCreator<IUserState> = (set) => ({
  user: null,
  profile: null,
  isLoading: false,
  error: "",
  signup: async (data: Omit<SignupSchema,'confirmPassword'>) => {
    set({ isLoading: true, error : "" });
    try {
        await axios.post("/api/auth/signup", data);
        return true;
    } catch (error : any) {
        set({ error: error.response.data.message });
    } finally {
        set({ isLoading: false });
    }
    return false;
  },
  login: async (method: loginMethod, data?: LoginSchema) => {
    set({ isLoading: true, error : "" });
    try {
        const res = await signIn(method, {
          redirect: false,
          ...data,
        });
        if(res?.ok){
          return true;
        }
        else {
          return false;
        }
    } catch (error) {
        set({ error: "Something went wrong" });
        return false;
    } finally {
        set({ isLoading: false });
    }
  },
  logout: async () => {
    set({ isLoading: true, error : "" });
    try {
        await signOut();
        return true;
    } catch (error) {
        set({ error: "Something went wrong" });
        return false;
    } finally {
        set({ isLoading: false });
    }
  },
  getProfile: async (userId) => {
    set({ isLoading: true, error : "" });
    try {
      const res = await axios.get(`api/u/${userId}`);
      if(res.data.success) {
        set({ profile: res.data.data });
        return true;
      }
      return false;
    } catch (error : any) {
      set({ error: error.message });
      return false;
    } finally {
      set({ isLoading: false });
    }
  }
});

export const useUserStore = create<IUserState>()(
  devtools(
    persist(userStore, {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    })
  )
);