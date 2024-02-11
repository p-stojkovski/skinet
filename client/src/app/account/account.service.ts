import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address, User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  //The issue is that, upon refreshing the checkout component, it redirects to the login page despite having a valid token. 
  //This is caused by using a behavior subject with an initial value of null for the current user observable when the AuthGuard is accessed. 
  //To fix this, the behavior subject is replaced with a replay subject, eliminating the need for an initial value. 
  //However, a new issue arises when refreshing the application, causing the replay subject to be empty, preventing redirection to the login page and breaking the checkout functionality. 
  //To address this, adjustments are made to the load current user methods and app component to ensure the replay subject is populated, even with null values. 
  //Additionally, changes are made to properly handle observable returns in the account service, resolving the issues with the replay subject.

  private baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  loadCurrentUser(token: string | null): Observable<User | null> {
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(this.baseUrl + 'account', { headers }).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          return user;
        } else {
          return null;
        }
      })
    );
  }

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

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(
      this.baseUrl + 'account/email-exists?email=' + email
    );
  }

  getUserAddress() : Observable<Address> {
    return this.http.get<Address>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address: Address): Observable<object> {
    return this.http.put(this.baseUrl + 'account/address', address);
  }
}
