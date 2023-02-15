import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumUpComponent } from './sum-up.component';

describe('SumUpComponent', () => {
  let component: SumUpComponent;
  let fixture: ComponentFixture<SumUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SumUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
