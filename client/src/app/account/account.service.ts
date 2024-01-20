import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(values: any): Observable<void> {
    return this.http.post<User>(this.baseUrl + 'account/login', values).pipe(
      map((user) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);

        //NOTE:
        //Passing in the user into currentUserSource.next(user) means that we're storing that user object inside the observable.
        //That would allow any components that subscribe to currentUser$ access to the latest value,
        //because each time this value changes, then any subscribers are notified.
      })
    );
  }

  register(values: any): Observable<void> {
    return this.http.post<User>(this.baseUrl + 'account/register', values).pipe(
      map((user) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) : Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl + 'account/email-exists?email=' + email);
  }
}
