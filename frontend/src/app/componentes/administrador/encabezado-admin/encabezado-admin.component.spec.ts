import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoAdminComponent } from './encabezado-admin.component';

describe('EncabezadoAdminComponent', () => {
  let component: EncabezadoAdminComponent;
  let fixture: ComponentFixture<EncabezadoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncabezadoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncabezadoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
