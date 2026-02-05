import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingVisitFormComponent } from './housing-visit-form.component';

describe('HousingVisitFormComponent', () => {
  let component: HousingVisitFormComponent;
  let fixture: ComponentFixture<HousingVisitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousingVisitFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingVisitFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
