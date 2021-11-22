import { Injectable } from "@angular/core";
import { NativestorageService } from './../storage/nativestorage.service';
import { Credentials } from "./auth.model";
import { Platform } from '@ionic/angular';

const credentialsKey = "token";

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
    providedIn: "root",
})
export class CredentialsService {

    private _credentials: Credentials | null = null;

    constructor(private storage: NativestorageService, public platform: Platform) {

        const [token, user]  : any  = this.storage.GetItems([credentialsKey, 'user'])

        this._credentials = { token: token?.value, user: user?.value }
    }

    /**
     * Checks is the user is authenticated.
     *
     * @return True if the user is authenticated.
     */
    isAuthenticated(): boolean {
        return !!this._credentials;
    }

    /**
     * Gets the user credentials.
     *
     * @return The user credentials or null if the user is not authenticated.
     */
    get credentials(): Credentials | null {
        return this._credentials;
    }

    /**
     * Gets the user access token
     *
     * @param credentials string
     */
    public getAccessToken() {
        return this.isAuthenticated()
            ? this._credentials.token && this._credentials.token
            : null;
    }

    /**
     * Gets the user access token
     *
     * @param credentials string
     */
    public getUser() {
        return this.isAuthenticated() ? this._credentials.user : null;
    }

    /**
     * Sets the user credentials.
     *
     * @param credentials The user credentials.
     */
    setCredentials(credentials?: Credentials) {

        this._credentials = credentials;

        if (credentials) {
            this.storage.StoreArray([{key:'token', value: credentials.token},{key:'user',value: JSON.stringify(credentials.user)}]);
        } else {
            this.storage.StoreArray([{key:'token', value: credentials.token},{key:'user',value: JSON.stringify(credentials.user)}]);
        }
    }
}
