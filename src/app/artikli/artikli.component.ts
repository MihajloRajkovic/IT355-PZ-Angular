// src/app/artikli/artikli.component.ts
import { Component, OnInit } from '@angular/core';
import { ArtikliService, Artikal } from './artikli.service';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-artikli',
  templateUrl: './artikli.component.html',
  styleUrls: ['./artikli.component.css']
})
export class ArtikliComponent implements OnInit {
  artikli: Artikal[] = [];
  newArtikal: Artikal = { id: 0, naziv: '', cena: 0, kolicinaNaStanju: 0 };
  isAdmin: boolean;

  constructor(private artikliService: ArtikliService, private authService: AuthService) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.fetchArtikli();
  }

  fetchArtikli(): void {
    this.artikliService.getArtikli().subscribe((data) => {
      this.artikli = data;
    });
  }

  updateArtikal(artikal: Artikal): void {
    this.artikliService.updateArtikal(artikal).subscribe(() => {
      console.log(artikal);
      this.fetchArtikli();
    });
  }

  addArtikal(): void {
    if (this.isAdmin) {
      this.artikliService.addArtikal(this.newArtikal).subscribe(() => {
        this.newArtikal = { id: 0, naziv: '', cena: 0, kolicinaNaStanju: 0 };
        this.fetchArtikli();
      });
    }
  }

  deleteArtikal(id: number): void {
    if (this.isAdmin) {
      this.artikliService.deleteArtikal(id).subscribe(() => {
        this.fetchArtikli();
      });
    }
  }
}
