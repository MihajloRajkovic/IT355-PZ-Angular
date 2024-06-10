import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenistavkeComponent } from './menistavke.component';

describe('MenistavkeComponent', () => {
  let component: MenistavkeComponent;
  let fixture: ComponentFixture<MenistavkeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenistavkeComponent]
    });
    fixture = TestBed.createComponent(MenistavkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
