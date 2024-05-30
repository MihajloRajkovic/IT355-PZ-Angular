// src/app/porudzbine/porudzbine.component.ts
import { Component, OnInit } from '@angular/core';
import { PorudzbineService, Porudzbina, Radnik } from './porudzbine.service';

@Component({
  selector: 'app-porudzbine',
  templateUrl: './porudzbine.component.html',
  styleUrls: ['./porudzbine.component.css']
})
export class PorudzbineComponent implements OnInit {
  porudzbine: Porudzbina[] = [];
  newPorudzbina: Porudzbina = {
    id: 0,
    sto: 0,
    radnikID: { id: 0, ime: '', prezime: '', korisnickoIme: '', lozinka: '', tipKorisnika: '', role: '' },
    vremePorudzbine: new Date().toISOString().substring(0, 16)
  };

  constructor(private porudzbineService: PorudzbineService) {}

  ngOnInit(): void {
    this.fetchPorudzbine();
  }

  fetchPorudzbine(): void {
    this.porudzbineService.getPorudzbine().subscribe((data) => {
      this.porudzbine = data.map(porudzbina => {
        return {
          ...porudzbina,
          vremePorudzbine: new Date(porudzbina.vremePorudzbine).toISOString().substring(0, 16)
        };
      });
    });
  }

  get formattedNewVremePorudzbine(): string {
    return this.newPorudzbina.vremePorudzbine;
  }

  set formattedNewVremePorudzbine(value: string) {
    this.newPorudzbina.vremePorudzbine = value;
  }

  updatePorudzbina(porudzbina: Porudzbina): void {
    const updatedPorudzbina = {
      ...porudzbina,
      vremePorudzbina: new Date(porudzbina.vremePorudzbine).toISOString()
    };
    this.porudzbineService.updatePorudzbina(updatedPorudzbina).subscribe(() => {
      this.fetchPorudzbine();
    });
  }

  addPorudzbina(): void {
    if (this.newPorudzbina.sto > 0 && this.newPorudzbina.radnikID.id > 0 && this.newPorudzbina.vremePorudzbine) {
      const novaPorudzbina = {
        ...this.newPorudzbina,
        vremePorudzbina: new Date(this.newPorudzbina.vremePorudzbine).toISOString()
      };

      this.porudzbineService.addPorudzbina(novaPorudzbina).subscribe(() => {
        this.newPorudzbina = {
          id: 0,
          sto: 0,
          radnikID: { id: 0, ime: '', prezime: '', korisnickoIme: '', lozinka: '', tipKorisnika: '', role: '' },
          vremePorudzbine: new Date().toISOString().substring(0, 16)
        };
        this.fetchPorudzbine();
      });
    } else {
      alert("Molimo popunite sve potrebne podatke za novu porudžbinu.");
    }
  }

  deletePorudzbina(id: number): void {
    this.porudzbineService.deletePorudzbina(id).subscribe(() => {
      this.fetchPorudzbine();
    });
  }
}
