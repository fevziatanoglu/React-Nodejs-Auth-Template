
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: ValidationErrorItem[];
}


export interface ValidationErrorItem {
    field?: string;
    message: string;
}

