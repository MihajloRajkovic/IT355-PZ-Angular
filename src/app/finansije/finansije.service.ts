import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Finansije {
  id: number;
  datum: string;
  zarada: number;
  potrosnja: number;
  plateRadnika: number;
}


@Injectable({
  providedIn: 'root'
})
export class FinansijeService {

  private apiUrl = 'http://localhost:8080/api/finansije';

  constructor(private http: HttpClient) {}

  getFinansije(): Observable<Finansije[]> {
    return this.http.get<Finansije[]>(this.apiUrl);
  }

  updateFinansije(finansije: Finansije): Observable<Finansije> {
    return this.http.put<Finansije>(`${this.apiUrl}`, finansije);
  }

  addFinansije(finansije: Finansije): Observable<Finansije> {
    return this.http.post<Finansije>(this.apiUrl, finansije);
  }

  deleteFinansije(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
