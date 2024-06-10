// src/app/korisnici/korisnici.component.ts
import { Component, OnInit } from '@angular/core';
import { KorisniciService, Korisnik } from './korisnici.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css']
})
export class KorisniciComponent implements OnInit {
  korisnici: Korisnik[] = [];
  newKorisnik: Korisnik = {
    id: 0,
    ime: '',
    prezime: '',
    korisnickoIme: '',
    lozinka: '',
    tipKorisnika: '',
    role: ''
  };

  constructor(private korisniciService: KorisniciService, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchKorisnici();
  }

  fetchKorisnici(): void {
    this.korisniciService.getKorisnici().subscribe((data) => {
      this.korisnici = data;
    });
  }

  updateKorisnik(korisnik: Korisnik): void {
    this.korisniciService.updateKorisnik(korisnik).subscribe(() => {
      this.fetchKorisnici();
    });
  }

  addKorisnik(): void {
    this.korisniciService.addKorisnik(this.newKorisnik).subscribe(() => {
      this.newKorisnik = {
        id: 0,
        ime: '',
        prezime: '',
        korisnickoIme: '',
        lozinka: '',
        tipKorisnika: '',
        role: ''
      };
      this.fetchKorisnici();
    });
  }

  deleteKorisnik(id: number): void {
    this.korisniciService.deleteKorisnik(id).subscribe(() => {
      this.fetchKorisnici();
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
