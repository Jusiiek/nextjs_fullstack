export interface ServiceReturnInterface {
    res: Response;
    data: unknown;
}

export interface RequestParams {
    url: string;
    query?: Record<string, string | number | boolean>;
    headers?: Record<string, string>;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: Record<string, unknown>;
    formData?: FormData;
    skipRedirect?: boolean;
    [key: string]: unknown;
}

export interface RequestResponse extends ServiceReturnInterface {
    headers: Headers
}
