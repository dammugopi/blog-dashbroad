import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BashbroadComponent } from './bashbroad.component';

describe('BashbroadComponent', () => {
  let component: BashbroadComponent;
  let fixture: ComponentFixture<BashbroadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BashbroadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BashbroadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
