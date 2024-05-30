// src/app/services/meni.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Meni {
  id: number;
  naziv: string;
}

@Injectable({
  providedIn: 'root'
})
export class MeniService {
  private apiUrl = 'http://localhost:8080/api/meni';

  constructor(private http: HttpClient) {}

  getMeniji(): Observable<Meni[]> {
    return this.http.get<Meni[]>(this.apiUrl);
  }

  updateMeni(meni: Meni): Observable<Meni> {
    return this.http.put<Meni>(`${this.apiUrl}`, meni);
  }

  addMeni(meni: Meni): Observable<Meni> {
    return this.http.post<Meni>(this.apiUrl, meni);
  }

  deleteMeni(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
