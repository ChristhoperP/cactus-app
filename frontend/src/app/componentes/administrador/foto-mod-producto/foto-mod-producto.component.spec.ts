import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoModProductoComponent } from './foto-mod-producto.component';

describe('FotoModProductoComponent', () => {
  let component: FotoModProductoComponent;
  let fixture: ComponentFixture<FotoModProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotoModProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoModProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
