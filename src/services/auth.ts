import { request } from "@/utils/request";
import { RequestResponse } from "@/interfaces/request";

class Auth {
    async register(email: string, password: string): Promise<RequestResponse> {
        return await request({
            url: "/api/auth/register",
            method: "POST",
            body: {email, password},
        });
    }
}

export const AuthService = new Auth();
