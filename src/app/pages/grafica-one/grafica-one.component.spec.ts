import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaOneComponent } from './grafica-one.component';

describe('GraficaOneComponent', () => {
  let component: GraficaOneComponent;
  let fixture: ComponentFixture<GraficaOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficaOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
