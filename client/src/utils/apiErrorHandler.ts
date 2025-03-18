import { AxiosError } from "axios";

const handleApiError = (e: unknown) => {
    if (e instanceof AxiosError && e.response) {
        return {
            success: false,
            message: e.response.data.message || "Request failed",
            statusCode: e.response.status,
        };
    }
    return {
        success: false,
        message: "An unexpected error occurred.",
        statusCode: 500,
    };
};

export default handleApiError