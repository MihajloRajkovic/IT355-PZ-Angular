
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Artikal {
  id: number;
  naziv: string;
  cena: number;
  kolicinaNaStanju: number;
}

@Injectable({
  providedIn: 'root'
})
export class ArtikliService {
  private apiUrl = 'http://localhost:8080/api/artikli';

  constructor(private http: HttpClient) {}

  getArtikli(): Observable<Artikal[]> {
    return this.http.get<Artikal[]>(this.apiUrl);
  }

  updateArtikal(artikal: Artikal): Observable<Artikal> {
    return this.http.put<Artikal>(`${this.apiUrl}`, artikal);
  }

  addArtikal(artikal: Artikal): Observable<Artikal> {
    return this.http.post<Artikal>(this.apiUrl, artikal);
  }

  deleteArtikal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
