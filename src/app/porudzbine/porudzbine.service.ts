// src/app/services/porudzbine.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Radnik {
  id: number;
  ime: string;
  prezime: string;
  korisnickoIme: string;
  lozinka: string;
  tipKorisnika: string;
  role: string;
}

export interface Porudzbina {
  id: number;
  sto: number;
  radnikID: Radnik;
  vremePorudzbine: string;
}

@Injectable({
  providedIn: 'root'
})
export class PorudzbineService {
  private apiUrl = 'http://localhost:8080/api/porudzbine';

  constructor(private http: HttpClient) {}

  getPorudzbine(): Observable<Porudzbina[]> {
    return this.http.get<Porudzbina[]>(this.apiUrl);
  }

  updatePorudzbina(porudzbina: Porudzbina): Observable<Porudzbina> {
    return this.http.put<Porudzbina>(`${this.apiUrl}`, porudzbina);
  }

  addPorudzbina(porudzbina: {
    radnikID: Radnik;
    vremePorudzbine: string;
    id: number;
    sto: number
  }): Observable<Porudzbina> {
    return this.http.post<Porudzbina>(this.apiUrl, porudzbina);
  }

  deletePorudzbina(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
