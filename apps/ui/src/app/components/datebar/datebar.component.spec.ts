import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatebarComponent } from './datebar.component';

describe('DatebarComponent', () => {
  let component: DatebarComponent;
  let fixture: ComponentFixture<DatebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
