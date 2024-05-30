// src/app/meni/meni.component.ts
import { Component, OnInit } from '@angular/core';
import { MeniService, Meni } from './meni.service';

@Component({
  selector: 'app-meni',
  templateUrl: './meni.component.html',
  styleUrls: ['./meni.component.css']
})
export class MeniComponent implements OnInit {
  meniji: Meni[] = [];
  newMeni: Meni = { id: 0, naziv: '' };

  constructor(private meniService: MeniService) {}

  ngOnInit(): void {
    this.fetchMeniji();
  }

  fetchMeniji(): void {
    this.meniService.getMeniji().subscribe((data) => {
      this.meniji = data;
    });
  }

  updateMeni(meni: Meni): void {
    this.meniService.updateMeni(meni).subscribe(() => {
      this.fetchMeniji();
    });
  }

  addMeni(): void {
    this.meniService.addMeni(this.newMeni).subscribe(() => {
      this.newMeni = { id: 0, naziv: '' };
      this.fetchMeniji();
    });
  }

  deleteMeni(id: number): void {
    this.meniService.deleteMeni(id).subscribe(() => {
      this.fetchMeniji();
    });
  }
}
