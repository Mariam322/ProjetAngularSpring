import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompteComponent } from './add-compte.component';

describe('AddCompteComponent', () => {
  let component: AddCompteComponent;
  let fixture: ComponentFixture<AddCompteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCompteComponent]
    });
    fixture = TestBed.createComponent(AddCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
