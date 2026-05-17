import { TestBed } from '@angular/core/testing';

import { CsvData } from './csv-data';

describe('CsvData', () => {
  let service: CsvData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
