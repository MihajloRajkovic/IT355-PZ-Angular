// src/app/menistavke/menistavke.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeniService, MeniStavka, Artikal } from '../meni/meni.service';

@Component({
  selector: 'app-menistavke',
  templateUrl: './menistavke.component.html',
  styleUrls: ['./menistavke.component.css']
})
export class MeniStavkeComponent implements OnInit {
  meniId: number;
  artikli: Artikal[] = [];
  selectedArtikli: number[] = [];
  meniStavke: MeniStavka[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private meniService: MeniService
  ) {
    this.meniId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.fetchArtikli();
    this.fetchMeniStavke();
  }

  fetchArtikli(): void {
    this.meniService.getArtikli().subscribe((data) => {
      this.artikli = data;
    });
  }

  fetchMeniStavke(): void {
    this.meniService.getMeniStavke(this.meniId).subscribe((data) => {
      this.meniStavke = data;
      this.meniStavke.forEach(stavka => {
        this.fetchArtikalDetails(stavka.artikalID.id).then(artikal => {
          if (artikal) {
            stavka.artikalID = artikal;
          }
        });
      });
    });
  }

  async fetchArtikalDetails(artikalId: number): Promise<Artikal | undefined> {
    try {
      return await this.meniService.getArtikal(artikalId).toPromise();
    } catch (error) {
      console.error('Failed to fetch artikal details', error);
      return undefined;
    }
  }

  addStavkeToMeni(): void {
    const stavke = this.selectedArtikli.map(artikalId => ({
      meniID: { id: this.meniId },
      artikalID: { id: artikalId } as Artikal
    }));

    stavke.forEach(stavka => {
      this.meniService.addMeniStavka(stavka).subscribe(() => {
        this.fetchMeniStavke();
      });
    });

    this.selectedArtikli = [];

  }

  goBack(): void {
    this.router.navigate(['/meni']);
  }
}
