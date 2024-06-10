// src/app/finansije/finansije.component.ts
import { Component, OnInit } from '@angular/core';
import { FinansijeService, Finansije } from './finansije.service';
import { ChartOptions, ChartType } from 'chart.js';
import { ChartData, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-finansije',
  templateUrl: './finansije.component.html',
  styleUrls: ['./finansije.component.css']
})
export class FinansijeComponent implements OnInit {
  finansije: Finansije[] = [];
  newFinansija: Finansije = {
    id: 0,
    datum: new Date().toISOString().substring(0, 10),
    zarada: 0,
    potrosnja: 0,
    plateRadnika: 0
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataset[] = [
    { data: [], label: 'Zarada' },
    { data: [], label: 'Potrošnja' },
    { data: [], label: 'Plate Radnika' }
  ];

  constructor(private finansijeService: FinansijeService) {}

  ngOnInit(): void {
    this.fetchFinansije();
  }

  fetchFinansije(): void {
    this.finansijeService.getFinansije().subscribe((data) => {
      this.finansije = data;
      this.updateChartData();
    });
  }

  updateChartData(): void {
    this.barChartLabels = this.finansije.map(f => f.datum);
    this.barChartData[0].data = this.finansije.map(f => f.zarada);
    this.barChartData[1].data = this.finansije.map(f => f.potrosnja);
    this.barChartData[2].data = this.finansije.map(f => f.plateRadnika);
  }

  updateFinansije(finansije: Finansije): void {
    this.finansijeService.updateFinansije(finansije).subscribe(() => {
      this.fetchFinansije();
    });
  }

  addFinansije(): void {
    this.finansijeService.addFinansije(this.newFinansija).subscribe(() => {
      this.newFinansija = {
        id: 0,
        datum: new Date().toISOString().substring(0, 10),
        zarada: 0,
        potrosnja: 0,
        plateRadnika: 0
      };
      this.fetchFinansije();
    });
  }

  deleteFinansije(id: number): void {
    this.finansijeService.deleteFinansije(id).subscribe(() => {
      this.fetchFinansije();
    });
  }
}
