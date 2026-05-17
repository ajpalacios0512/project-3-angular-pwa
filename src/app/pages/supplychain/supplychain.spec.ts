import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Supplychain } from './supplychain';

describe('Supplychain', () => {
  let component: Supplychain;
  let fixture: ComponentFixture<Supplychain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Supplychain],
    }).compileComponents();

    fixture = TestBed.createComponent(Supplychain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
