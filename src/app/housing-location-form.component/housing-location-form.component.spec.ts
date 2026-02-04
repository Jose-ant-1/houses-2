import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingLocationFormComponent } from './housing-location-form.component';

describe('HousingLocationFormComponent', () => {
  let component: HousingLocationFormComponent;
  let fixture: ComponentFixture<HousingLocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousingLocationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingLocationFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
