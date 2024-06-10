// src/app/meni/meni.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeniService, Meni, Artikal } from './meni.service';

@Component({
  selector: 'app-meni',
  templateUrl: './meni.component.html',
  styleUrls: ['./meni.component.css']
})
export class MeniComponent implements OnInit {
  meniji: Meni[] = [];
  artikli: Artikal[] = [];
  meniStavke: { [key: number]: any[] } = {};
  newMeni: Meni = {
    id: 0,
    naziv: ''
  };

  constructor(private meniService: MeniService, private router: Router) {}

  ngOnInit(): void {
    this.fetchMeniji();
    this.fetchArtikli();
  }

  fetchMeniji(): void {
    this.meniService.getMeniji().subscribe((data) => {
      this.meniji = data;
      this.meniji.forEach(meni => {
        this.fetchMeniStavke(meni.id);
      });
    });
  }

  fetchMeniStavke(meniId: number): void {
    this.meniService.getMeniStavke(meniId).subscribe((data) => {
      this.meniStavke[meniId] = data;
    });
  }

  fetchArtikli(): void {
    this.meniService.getArtikli().subscribe((data) => {
      this.artikli = data;
    });
  }

  updateMeni(meni: Meni): void {
    this.meniService.updateMeni(meni).subscribe(() => {
      this.fetchMeniji();
    });
  }

  addMeni(): void {
    this.meniService.addMeni(this.newMeni).subscribe((meni) => {
      this.router.navigate([`/meni/${meni.id}/stavke`]);
    });
  }

  deleteMeni(id: number): void {
    this.meniService.deleteMeni(id).subscribe(() => {
      this.fetchMeniji();
    });
  }
}
