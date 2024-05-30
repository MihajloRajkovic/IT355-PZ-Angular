
import { Component, OnInit } from '@angular/core';
import { NarudzbeniceService, Narudzbenica, Vlasnik } from './narudzbenice.service';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-narudzbenice',
  templateUrl: './narudzbenice.component.html',
  styleUrls: ['./narudzbenice.component.css']
})
export class NarudzbeniceComponent implements OnInit {
  narudzbenice: Narudzbenica[] = [];
  newNarudzbenica: Narudzbenica = {
    id: 0,
    vlasnikID: { id: 0, ime: '', prezime: '', korisnickoIme: '', lozinka: '', tipKorisnika: '', role: '' },
    datumNarudzbine: new Date().toISOString().substring(0, 10)
  };

  constructor(private narudzbeniceService: NarudzbeniceService, public authService: AuthService) {}

  ngOnInit(): void {
    this.fetchNarudzbenice();
  }

  fetchNarudzbenice(): void {
    this.narudzbeniceService.getNarudzbenice().subscribe((data) => {
      this.narudzbenice = data.map(narudzbenica => {
        return {
          ...narudzbenica,
          datumNarudzbine: new Date(narudzbenica.datumNarudzbine).toISOString().substring(0, 10)
        };
      });
    });
  }

  updateNarudzbenica(narudzbenica: Narudzbenica): void {
    const updatedNarudzbenica = {
      ...narudzbenica,
      datumNarudzbine: new Date(narudzbenica.datumNarudzbine).toISOString().substring(0, 10)
    };
    this.narudzbeniceService.updateNarudzbenica(updatedNarudzbenica).subscribe(() => {
      this.fetchNarudzbenice();
    });
  }

  addNarudzbenica(): void {
    if (this.newNarudzbenica.vlasnikID.id > 0 && this.newNarudzbenica.datumNarudzbine) {
      const novaNarudzbenica = {
        ...this.newNarudzbenica,
        datumNarudzbine: new Date(this.newNarudzbenica.datumNarudzbine).toISOString().substring(0, 10)
      };

      this.narudzbeniceService.addNarudzbenica(novaNarudzbenica).subscribe(() => {
        this.newNarudzbenica = {
          id: 0,
          vlasnikID: { id: 0, ime: '', prezime: '', korisnickoIme: '', lozinka: '', tipKorisnika: '', role: '' },
          datumNarudzbine: new Date().toISOString().substring(0, 10)
        };
        this.fetchNarudzbenice();
      });
    } else {
      alert("Molimo popunite sve potrebne podatke za novu narudžbenicu.");
    }
  }

  deleteNarudzbenica(id: number): void {
    if (this.authService.isAdmin()) {
      this.narudzbeniceService.deleteNarudzbenica(id).subscribe(() => {
        this.fetchNarudzbenice();
      });
    } else {
      alert("Nemate ovlašćenja za brisanje narudžbenica.");
    }
  }
}
