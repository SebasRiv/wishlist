import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelosDetallesComponentComponent } from './vuelos-detalles-component.component';

describe('VuelosDetallesComponentComponent', () => {
  let component: VuelosDetallesComponentComponent;
  let fixture: ComponentFixture<VuelosDetallesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VuelosDetallesComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VuelosDetallesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
