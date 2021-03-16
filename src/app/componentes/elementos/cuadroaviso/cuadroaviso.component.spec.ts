import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroavisoComponent } from './cuadroaviso.component';

describe('CuadroavisoComponent', () => {
  let component: CuadroavisoComponent;
  let fixture: ComponentFixture<CuadroavisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuadroavisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuadroavisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
