import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { CsvData } from '../../services/csv-data';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-finance',
  imports: [Navbar],
  templateUrl: './finance.html',
  styleUrl: './finance.css'
})
export class Finance implements OnInit {

  financeData: any[] = [];

  totalRevenue = 0;
  totalExpenses = 0;
  totalProfit = 0;

  constructor(
    private csvData: CsvData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.csvData.loadCsv('finance.csv').subscribe(data => {
      this.financeData = data;

      this.calculateTotals();
      this.createCharts();
      this.cdr.detectChanges();
    });
  }

  calculateTotals(): void {
    this.totalRevenue = this.financeData.reduce(
      (total, item) => total + item.revenue,
      0
    );

    this.totalExpenses = this.financeData.reduce(
      (total, item) => total + item.expenses,
      0
    );

    this.totalProfit = this.financeData.reduce(
      (total, item) => total + item.profit,
      0
    );
  }

  createCharts(): void {
    const months = this.financeData.map(item => item.month);
    const revenue = this.financeData.map(item => item.revenue);
    const expenses = this.financeData.map(item => item.expenses);
    const profit = this.financeData.map(item => item.profit);

    new Chart('financeRevenueChart', {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Revenue',
            data: revenue
          },
          {
            label: 'Expenses',
            data: expenses
          }
        ]
      }
    });

    new Chart('financeProfitChart', {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Profit',
            data: profit,
            borderWidth: 3
          }
        ]
      }
    });
  }
}