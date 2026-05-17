import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvData {

  constructor(private http: HttpClient) {}

  loadCsv(fileName: string): Observable<any[]> {
    return this.http
      .get(`/data/${fileName}`, { responseType: 'text' })
      .pipe(
        map(csvText => this.convertCsvToArray(csvText))
      );
  }

  private convertCsvToArray(csvText: string): any[] {
    const rows = csvText.trim().split('\n');
    const headers = rows[0].split(',').map(header => header.trim());

    return rows.slice(1).map(row => {
      const values = row.split(',').map(value => value.trim());
      const item: any = {};

      headers.forEach((header, index) => {
        const value = values[index] ?? '';
        const numberValue = Number(value);

        item[header] = value !== '' && !isNaN(numberValue)
          ? numberValue
          : value;
      });

      return item;
    });
  }
}