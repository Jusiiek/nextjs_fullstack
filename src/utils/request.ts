import { RequestParams, RequestResponse } from "@/interfaces/request";

export const redirectIfNotAuthenticated = (res: Response) => {
    if (res.status === 401) {
        return window.location.replace("/auth");
    }
    if (res.status === 403) return window.location.replace("/");
};

export const encodeQuery = (query: Record<string, string | number | boolean>) => {
    const searchParams = new URLSearchParams(
        Object.entries(query).map(([key, value]) => [key, String(value)])
    );
    return searchParams.toString();
};

export const request = async ({
                                  url,
                                  query,
                                  headers = {},
                                  method = "GET",
                                  body,
                                  formData,
                                  skipRedirect = false,
                                  ...rest
                              }: RequestParams): Promise<RequestResponse> => {
    const methodLower = method.toLowerCase();
    const jsonMethods = ["post", "put", "patch", "delete"];
    if (body && jsonMethods.includes(methodLower) && !headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
    }

    let requestBody: BodyInit | null | undefined = undefined;
    if (formData) {
        requestBody = formData;
    } else if (body) {
        if (typeof body === "object") {
            requestBody = JSON.stringify(body);
        } else {
            requestBody = body as BodyInit;
        }
    }
    if (query) {
        url = `${url}?${encodeQuery(query)}`;
    }
    const res = await fetch(url, {
        method: method,
        headers: headers,
        body: requestBody,
        credentials: "include",
        ...rest,
    });

    if (!skipRedirect) {
        redirectIfNotAuthenticated(res);
    }

    const contentType = res.headers.get("content-type");
    if (contentType !== "application/json" || res.status === 204) {
        return {
            res,
            data: {},
            headers: res.headers,
        };
    }

    const data = await res.json();

    return {
        res,
        data,
        headers: res.headers,
    };
};