import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorudzbineComponent } from './porudzbine.component';

describe('PorudzbineComponent', () => {
  let component: PorudzbineComponent;
  let fixture: ComponentFixture<PorudzbineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorudzbineComponent]
    });
    fixture = TestBed.createComponent(PorudzbineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
