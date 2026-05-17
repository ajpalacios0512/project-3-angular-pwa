import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { CsvData } from '../../services/csv-data';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-customers',
  imports: [Navbar],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers implements OnInit {

  customerData: any[] = [];

  totalNewCustomers = 0;
  averageSatisfaction = 0;
  totalSupportTickets = 0;

  constructor(
    private csvData: CsvData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.csvData.loadCsv('customers.csv').subscribe(data => {
      this.customerData = data;

      this.calculateTotals();
      this.createCharts();
      this.cdr.detectChanges();
    });
  }

  calculateTotals(): void {
    this.totalNewCustomers = this.customerData.reduce(
      (total, item) => total + item.new_customers,
      0
    );

    const satisfactionTotal = this.customerData.reduce(
      (total, item) => total + item.satisfaction_score,
      0
    );

    this.averageSatisfaction = Math.round(
      satisfactionTotal / this.customerData.length
    );

    this.totalSupportTickets = this.customerData.reduce(
      (total, item) => total + item.support_tickets,
      0
    );
  }

  createCharts(): void {
    const months = this.customerData.map(item => item.month);
    const newCustomers = this.customerData.map(item => item.new_customers);
    const returningCustomers = this.customerData.map(item => item.returning_customers);
    const satisfaction = this.customerData.map(item => item.satisfaction_score);

    new Chart('customerTypeChart', {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'New Customers',
            data: newCustomers
          },
          {
            label: 'Returning Customers',
            data: returningCustomers
          }
        ]
      }
    });

    new Chart('customerSatisfactionChart', {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Satisfaction Score',
            data: satisfaction,
            borderWidth: 3
          }
        ]
      }
    });
  }
}