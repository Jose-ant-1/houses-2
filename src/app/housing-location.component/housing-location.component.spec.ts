import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouslingLocationComponent } from './housing-location.component';

describe('HouslingLocationComponent', () => {
  let component: HouslingLocationComponent;
  let fixture: ComponentFixture<HouslingLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouslingLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouslingLocationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
