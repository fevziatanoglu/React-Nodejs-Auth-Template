import { LoginFormValues } from "../pages/auth/Login";
import { RegisterFormValues } from "../pages/auth/Register";
import requestApi from "../utils/api";
import handleApiError from "../utils/apiErrorHandler";

export const login = async (data: LoginFormValues) => {
    try {
        const response = await requestApi.post('auth/login', data);
        return response.data
    } catch (e: unknown) {
        return handleApiError(e)
    }
}

export const register = async (data: RegisterFormValues) => {
    try {
        const response = await requestApi.post('auth/register', data);
        return response.data
    } catch (e: unknown) {
        return handleApiError(e)
    }
};

export const refresh = async () => {
    try {
        const response = await requestApi.post('auth/refresh-token', {});
        return response.data

    } catch (e: unknown) {
        return handleApiError(e)
    }
};

export const logout = async () => {
    try {
        const response = await requestApi.post('auth/logout');
        return response.data
    } catch (e: unknown) {
        return handleApiError(e)
    }
}
