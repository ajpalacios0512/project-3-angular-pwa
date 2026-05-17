import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { CsvData } from '../../services/csv-data';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-supplychain',
  imports: [Navbar],
  templateUrl: './supplychain.html',
  styleUrl: './supplychain.css'
})
export class Supplychain implements OnInit {

  supplyChainData: any[] = [];

  totalInventory = 0;
  averageDelivery = 0;
  totalLateShipments = 0;

  constructor(
    private csvData: CsvData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.csvData.loadCsv('supplychain.csv').subscribe(data => {
      this.supplyChainData = data;

      this.calculateTotals();
      this.createCharts();
      this.cdr.detectChanges();
    });
  }

  calculateTotals(): void {
    this.totalInventory = this.supplyChainData.reduce(
      (total, item) => total + item.inventory_units,
      0
    );

    const deliveryTotal = this.supplyChainData.reduce(
      (total, item) => total + item.on_time_delivery,
      0
    );

    this.averageDelivery = Math.round(
      deliveryTotal / this.supplyChainData.length
    );

    this.totalLateShipments = this.supplyChainData.reduce(
      (total, item) => total + item.late_shipments,
      0
    );
  }

  createCharts(): void {
    const months = this.supplyChainData.map(item => item.month);
    const inboundShipments = this.supplyChainData.map(item => item.inbound_shipments);
    const outboundShipments = this.supplyChainData.map(item => item.outbound_shipments);
    const deliveryRates = this.supplyChainData.map(item => item.on_time_delivery);

    new Chart('supplyShipmentChart', {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Inbound Shipments',
            data: inboundShipments
          },
          {
            label: 'Outbound Shipments',
            data: outboundShipments
          }
        ]
      }
    });

    new Chart('supplyDeliveryChart', {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'On-Time Delivery %',
            data: deliveryRates,
            borderWidth: 3
          }
        ]
      }
    });
  }
}