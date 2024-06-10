import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwt_decode(token);
    }
    return null;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.getDecodedToken();
      const expirationDate = decodedToken ? decodedToken.exp * 1000 : null;
      if (expirationDate) {
        return new Date().getTime() >= expirationDate;
      }
    }
    return true;
  }

  isAuthenticated(): boolean {
    const isExpired = this.isTokenExpired();
    if (isExpired) {
      this.logout();
      return false;
    }
    return true;
  }

  isAdmin(): boolean {
    const decodedToken = this.getDecodedToken();
    return decodedToken && decodedToken.Role === 'ADMIN';
  }

  getUserId(): number | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.ID_Korisnika : null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
