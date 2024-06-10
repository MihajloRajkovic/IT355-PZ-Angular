// src/app/services/korisnici.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Korisnik {
  id: number;
  ime: string;
  prezime: string;
  korisnickoIme: string;
  lozinka: string;
  tipKorisnika: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {
  private apiUrl = 'http://localhost:8080/api/korisnici';

  constructor(private http: HttpClient) {}

  getKorisnici(): Observable<Korisnik[]> {
    return this.http.get<Korisnik[]>(this.apiUrl);
  }

  updateKorisnik(korisnik: Korisnik): Observable<Korisnik> {
    return this.http.put<Korisnik>(`${this.apiUrl}`, korisnik);
  }

  addKorisnik(korisnik: Korisnik): Observable<Korisnik> {
    return this.http.post<Korisnik>(this.apiUrl, korisnik);
  }

  deleteKorisnik(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
