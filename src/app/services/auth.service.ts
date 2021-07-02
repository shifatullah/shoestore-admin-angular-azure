import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IdentityClient } from "../clients/identity.client";
import { CacheService } from "./cache.service";

@Injectable()
export class AuthService {
    constructor(private client: IdentityClient, private cache: CacheService) {}

    authenticate(username: string, password: string): Observable<boolean> {
        return this.client.authenticate(username, password);
    }
    get authenticated(): boolean {
        var auth_token: string = this.cache.load("auth_token");
        return auth_token != null;
    }
    clear() {        
        this.cache.remove("auth_token");
    }
}