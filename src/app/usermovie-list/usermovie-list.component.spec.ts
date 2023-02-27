import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermovieListComponent } from './usermovie-list.component';

describe('UsermovieListComponent', () => {
  let component: UsermovieListComponent;
  let fixture: ComponentFixture<UsermovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsermovieListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsermovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
