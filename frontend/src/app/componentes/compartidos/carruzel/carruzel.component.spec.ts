import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruzelComponent } from './carruzel.component';

describe('CarruzelComponent', () => {
  let component: CarruzelComponent;
  let fixture: ComponentFixture<CarruzelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarruzelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarruzelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
