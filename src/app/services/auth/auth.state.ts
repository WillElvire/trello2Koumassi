import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject, of, forkJoin } from 'rxjs';
import { User } from './auth.model'
import { StateService } from '../state'
import { HttpClient, HttpHeaders, HttpParams}from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { NativestorageService } from './../storage/nativestorage.service';
import { CredentialsService } from './credentials.service'


interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null
};

@Injectable({
  providedIn: 'root'
})
export class AuthStateService extends StateService<AuthState> {

  user$: Observable<User> = this.select(state => state.user);

  token$: Observable<string> = this.select(state => state.token);

  server: string = "https://pma-app-test.herokuapp.com/api/";

  constructor(private http: HttpClient, private storage: NativestorageService, private credentials: CredentialsService) {
    super(initialState);
  }

  setUser(user: User) {
    this.setState({ user })
  }

  setToken(token: string) {
    this.setState({ token })
  }

  removeUser(user: User) {
    this.setState({ user: null });
  }

  login(email, password) {
    const body = { email, password }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    });

    return this.http.post<User>(this.server + 'login', JSON.stringify(body), { headers })
  }
}
