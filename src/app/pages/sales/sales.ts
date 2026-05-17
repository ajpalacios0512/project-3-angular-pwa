import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { CsvData } from '../../services/csv-data';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-sales',
  imports: [Navbar],
  templateUrl: './sales.html',
  styleUrl: './sales.css'
})
export class Sales implements OnInit {

  salesData: any[] = [];

  totalSales = 0;
  laptopSales = 0;
  headphoneSales = 0;

  constructor(
    private csvData: CsvData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.csvData.loadCsv('sales.csv').subscribe(data => {
      this.salesData = data;

      this.calculateTotals();
      this.createCharts();
      this.cdr.detectChanges();
    });
  }

  calculateTotals(): void {
    this.totalSales = this.salesData.reduce(
      (total, item) => total + item.total_sales,
      0
    );

    this.laptopSales = this.salesData.reduce(
      (total, item) => total + item.laptops,
      0
    );

    this.headphoneSales = this.salesData.reduce(
      (total, item) => total + item.headphones,
      0
    );
  }

  createCharts(): void {
    const months = this.salesData.map(item => item.month);
    const totalSales = this.salesData.map(item => item.total_sales);

    const laptops = this.salesData.reduce(
      (total, item) => total + item.laptops,
      0
    );

    const monitors = this.salesData.reduce(
      (total, item) => total + item.monitors,
      0
    );

    const keyboards = this.salesData.reduce(
      (total, item) => total + item.keyboards,
      0
    );

    const headphones = this.salesData.reduce(
      (total, item) => total + item.headphones,
      0
    );

    new Chart('salesTotalChart', {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Total Sales',
            data: totalSales,
            borderWidth: 3
          }
        ]
      }
    });

    new Chart('salesProductChart', {
      type: 'bar',
      data: {
        labels: ['Laptops', 'Monitors', 'Keyboards', 'Headphones'],
        datasets: [
          {
            label: 'Units Sold',
            data: [laptops, monitors, keyboards, headphones]
          }
        ]
      }
    });
  }
}