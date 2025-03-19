import { StateCreator } from "zustand";
import User from "../../types/User";
import { login, logout, refresh, register } from "../../api/authService";

import { ApiResponse } from "../../types/ApiRespose";
import { LoginData } from "../../types/LoginData";
import { LoginFormValues, RegisterFormValues } from "../../validations/authSchema";

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
};

export interface AuthActions {
    loginFetch: (credential: LoginFormValues) => Promise<ApiResponse<LoginData>>;
    registerFetch: (credential: RegisterFormValues) => Promise<ApiResponse<LoginData>>;
    refreshToken: () => Promise<ApiResponse<LoginData>>;
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
            }
            return response

        },

        refreshToken: async () => {
            const response = await refresh();
            if (response.success && response.data) {
                set({ token: response.data.token, user: response.data.user, isAuthenticated: true });
            } else {
                set({ token: null, user: null, isAuthenticated: false });
            }
            return response
        },

        registerFetch: async (credential: RegisterFormValues) => {
            const response = await register(credential)
            if (response.success && response.data) {
                set({ token: response.data.token, user: response.data.user, isAuthenticated: true })
                window.location.href = "/";
            }
            return response
        },

        logoutFetch: async () => {
            const response = await logout();
            if (response.success) {
                set({ token: null, isAuthenticated: false, user: null });
                window.location.href = "/login";
            } else {
                console.error("Logout failed")
            }
        },
    }))
);
