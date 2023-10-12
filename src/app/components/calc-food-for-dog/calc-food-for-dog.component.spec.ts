import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcFoodForDogComponent } from './calc-food-for-dog.component';

describe('CalcFoodForDogComponent', () => {
  let component: CalcFoodForDogComponent;
  let fixture: ComponentFixture<CalcFoodForDogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcFoodForDogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcFoodForDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
