import { StateCreator } from "zustand";
import User from "../../types/User";
import { login, logout, refresh, register } from "../../api/authService";
import { LoginFormValues } from "../../pages/auth/Login";
import { RegisterFormValues } from "../../pages/auth/Register";

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
};

export interface AuthActions {
    loginFetch: (credential: LoginFormValues) => Promise<void>;
    registerFetch: (credential: RegisterFormValues) => Promise<void>;
    refreshToken: () => Promise<void>;
    logoutFetch: () => void;
};

export const createAuthSlice: StateCreator<AuthState & AuthActions> = (
    ((set) => ({
        user: null,
        token: null,
        isAuthenticated: false,

        loginFetch: async (credential: LoginFormValues) => {
            const response = await login(credential)
            if (response.success) {
                set({ token: response.data?.token, user: response.data?.user, isAuthenticated: true })
                window.location.href = "/";
                return response
            } else {
                return response
            }

        },

        refreshToken: async () => {
            const response = await refresh();
            if (response.success) {
                set({ token: response.token, user: response.user, isAuthenticated: true });
            } else {
                set({ token: null, user: null, isAuthenticated: false });
            }
        },

        registerFetch: async (credential: RegisterFormValues) => {
            const response = await register(credential)
            if (response.success) {
                set({ token: response.data?.token, user: response.data?.user, isAuthenticated: true })
                window.location.href = "/";
                return response
            } else {
                return response
            }
        },

        logoutFetch: async () => {
            const response = await logout();
            console.log(response)
            if (response.success) {
                set({ token: null, isAuthenticated: false, user: null });
                window.location.href = "/login";
            } else {
                console.error("Logout failed")
            }
        },
    }))
);
