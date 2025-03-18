import { create } from "zustand";
import { AuthActions, AuthState, createAuthSlice } from "./slices/authSlice";

export type Store = AuthState & AuthActions;

export const useStore = create<Store>((set, get, api) => ({
    ...createAuthSlice(set, get, api),
}));
export default useStore;
