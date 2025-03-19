import { AxiosError } from "axios";
import { ApiResponse } from "../types/ApiRespose";

const handleApiError = <T>(e: unknown): ApiResponse<T> => {
    if (e instanceof AxiosError && e.response) {
        return {
            success: false,
            error: e.response.data.error,
            message: e.response.data.message || "Request failed",
        };
    }
    return {
        success: false,
        message: "An unexpected error occurred.",
    };
};

export default handleApiError