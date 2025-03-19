
import { ApiResponse } from "../types/ApiRespose";
import { LoginData } from "../types/LoginData";
import requestApi from "../utils/api";
import handleApiError from "../utils/apiErrorHandler";
import { LoginFormValues, RegisterFormValues } from "../validations/authSchema";

export const login = async (data: LoginFormValues): Promise<ApiResponse<LoginData>> => {
    try {
        const response = await requestApi.post<ApiResponse<LoginData>>('auth/login', data);
        return response.data
    } catch (e: unknown) {
        return handleApiError(e)
    }
}

export const register = async (data: RegisterFormValues): Promise<ApiResponse<LoginData>> => {
    try {
        const response = await requestApi.post<ApiResponse<LoginData>>('auth/register', data);
        return response.data
    } catch (e: unknown) {
        return handleApiError(e)
    }
};

export const refresh = async (): Promise<ApiResponse<LoginData>> => {
    try {
        const response = await requestApi.post('auth/refresh-token');
        return response.data

    } catch (e: unknown) {
        return handleApiError(e)
    }
};

export const logout = async (): Promise<ApiResponse<null>> => {
    try {
        const response = await requestApi.post('auth/logout');
        return response.data
    } catch (e: unknown) {
        return handleApiError(e)
    }
}
