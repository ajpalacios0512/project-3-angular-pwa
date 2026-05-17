import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { CsvData } from '../../services/csv-data';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-production',
  imports: [Navbar],
  templateUrl: './production.html',
  styleUrl: './production.css'
})
export class Production implements OnInit {

  productionData: any[] = [];

  totalUnitsProduced = 0;
  totalDefectiveUnits = 0;
  averageUptime = 0;

  constructor(
    private csvData: CsvData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.csvData.loadCsv('production.csv').subscribe(data => {
      this.productionData = data;

      this.calculateTotals();
      this.createCharts();
      this.cdr.detectChanges();
    });
  }

  calculateTotals(): void {
    this.totalUnitsProduced = this.productionData.reduce(
      (total, item) => total + item.units_produced,
      0
    );

    this.totalDefectiveUnits = this.productionData.reduce(
      (total, item) => total + item.defective_units,
      0
    );

    const uptimeTotal = this.productionData.reduce(
      (total, item) => total + item.machine_uptime,
      0
    );

    this.averageUptime = Math.round(
      uptimeTotal / this.productionData.length
    );
  }

  createCharts(): void {
    const months = this.productionData.map(item => item.month);
    const plannedOutput = this.productionData.map(item => item.planned_output);
    const actualOutput = this.productionData.map(item => item.units_produced);
    const uptime = this.productionData.map(item => item.machine_uptime);

    new Chart('productionOutputChart', {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Planned Output',
            data: plannedOutput
          },
          {
            label: 'Actual Output',
            data: actualOutput
          }
        ]
      }
    });

    new Chart('productionUptimeChart', {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Machine Uptime %',
            data: uptime,
            borderWidth: 3
          }
        ]
      }
    });
  }
}