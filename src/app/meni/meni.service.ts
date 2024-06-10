import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Meni {
  id: number;
  naziv: string;
}

export interface MeniStavka {
  id?: number;
  meniID: { id: number };
  artikalID: Artikal;
}

export interface Artikal {
  id: number;
  naziv: string;
  cena: number;
  kolicinaNaStanju: number;
}

@Injectable({
  providedIn: 'root'
})
export class MeniService {
  private apiUrl = 'http://localhost:8080/api/meni';
  private apiStavkeUrl = 'http://localhost:8080/api/menistavke';
  private apiArtikliUrl = 'http://localhost:8080/api/artikli';

  constructor(private http: HttpClient) {}

  getMeniji(): Observable<Meni[]> {
    return this.http.get<Meni[]>(this.apiUrl);
  }

  getMeniStavke(meniId: number): Observable<MeniStavka[]> {
    return this.http.get<MeniStavka[]>(`${this.apiStavkeUrl}/meni/${meniId}`);
  }

  getArtikli(): Observable<Artikal[]> {
    return this.http.get<Artikal[]>(this.apiArtikliUrl);
  }

  getArtikal(artikalId: number): Observable<Artikal> {
    return this.http.get<Artikal>(`${this.apiArtikliUrl}/${artikalId}`);
  }

  updateMeni(meni: Meni): Observable<Meni> {
    return this.http.put<Meni>(`${this.apiUrl}`, meni);
  }

  addMeni(meni: Meni): Observable<Meni> {
    return this.http.post<Meni>(this.apiUrl, meni);
  }

  addMeniStavka(stavka: MeniStavka): Observable<MeniStavka> {
    return this.http.post<MeniStavka>(`${this.apiStavkeUrl}`, stavka);
  }

  deleteMeni(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
