import { login, register } from "@/lib/apiServices/authServices";
import toast from "react-hot-toast";
import { create } from "zustand";

type authType = {
  loginLoading: boolean;
  loginUser: (payload: any) => void;
  registerLoading: boolean;
  registerUser: (payload: any) => void;

  user: any;
  userToken: string;
};

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("celerUser") || "{}"),
  userToken: localStorage.getItem("celerAuth") || "",
  loginLoading: false,
  loginUser: async (payload: any) => {
    set({ loginLoading: true });

    try {
      const data = await login(payload);
      console.log("Login Data:", data);
      localStorage.setItem("celerAuth", data.token);
      localStorage.setItem("celerUser", JSON.stringify(data.user));
      set({ user: data.user });
      set({ userToken: data.token });
      toast.success("Login Successful!!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response.data.error || "Internal Server Error");
    } finally {
      set({ loginLoading: false });
    }
  },
  registerUser: async (payload: any) => {
    set({ registerLoading: true });

    try {
      const data = await register(payload);
      console.log("Register Data:", data);
      localStorage.setItem("celerAuth", data.token);
      localStorage.setItem("celerUser", JSON.stringify(data.user));
      set({ user: data.user });
      set({ userToken: data.token });
      toast.success("Registration Successful!!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response.data.error || "Internal Server Error");
    } finally {
      set({ registerLoading: false });
    }
  },
  logout: () => {
    set({ user: null, userToken: null });
    localStorage.clear();
  },
}));
