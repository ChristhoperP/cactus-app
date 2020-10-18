import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControladorAdminComponent } from './controlador-admin.component';

describe('ControladorAdminComponent', () => {
  let component: ControladorAdminComponent;
  let fixture: ComponentFixture<ControladorAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControladorAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControladorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
