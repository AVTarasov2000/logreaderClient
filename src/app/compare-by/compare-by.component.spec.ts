import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareByComponent } from './compare-by.component';

describe('CompareByComponent', () => {
  let component: CompareByComponent;
  let fixture: ComponentFixture<CompareByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareByComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
