import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselPromoComponent } from './carrusel-promo.component';

describe('CarruselPromoComponent', () => {
  let component: CarruselPromoComponent;
  let fixture: ComponentFixture<CarruselPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarruselPromoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarruselPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
