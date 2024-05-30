import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NarudzbeniceComponent } from './narudzbenice.component';

describe('NarudzbeniceComponent', () => {
  let component: NarudzbeniceComponent;
  let fixture: ComponentFixture<NarudzbeniceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NarudzbeniceComponent]
    });
    fixture = TestBed.createComponent(NarudzbeniceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
