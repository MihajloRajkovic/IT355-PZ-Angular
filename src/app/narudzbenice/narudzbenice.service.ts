// src/app/services/narudzbenice.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vlasnik {
  id: number;
  ime: string;
  prezime: string;
  korisnickoIme: string;
  lozinka: string;
  tipKorisnika: string;
  role: string;
}

export interface Narudzbenica {
  id: number;
  vlasnikID: Vlasnik;
  datumNarudzbine: string;  // format datuma kao string
}

@Injectable({
  providedIn: 'root'
})
export class NarudzbeniceService {
  private apiUrl = 'http://localhost:8080/api/narudzbenice';

  constructor(private http: HttpClient) {}

  getNarudzbenice(): Observable<Narudzbenica[]> {
    return this.http.get<Narudzbenica[]>(this.apiUrl);
  }

  updateNarudzbenica(narudzbenica: Narudzbenica): Observable<Narudzbenica> {
    return this.http.put<Narudzbenica>(`${this.apiUrl}`, narudzbenica);
  }

  addNarudzbenica(narudzbenica: Narudzbenica): Observable<Narudzbenica> {
    return this.http.post<Narudzbenica>(this.apiUrl, narudzbenica);
  }

  deleteNarudzbenica(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
