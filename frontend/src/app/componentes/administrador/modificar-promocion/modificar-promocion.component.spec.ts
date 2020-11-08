import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPromocionComponent } from './modificar-promocion.component';

describe('ModificarPromocionComponent', () => {
  let component: ModificarPromocionComponent;
  let fixture: ComponentFixture<ModificarPromocionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarPromocionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarPromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
