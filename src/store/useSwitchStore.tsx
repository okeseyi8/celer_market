
import { create } from "zustand";

interface switchTypes {
    isLogin: boolean;
    authSwitch: () => void
}


export const useSwitchStore = create<switchTypes>((set) => ({
    isLogin: false,
    authSwitch: () => set((s) => ({isLogin: !s.isLogin } ))
}))
