import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { NewItemComponent } from './new-item.component';
import { FormBuilder } from '@angular/forms';

describe('NewItemComponent', () => {
  let component: NewItemComponent;
  let fixture: ComponentFixture<NewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewItemComponent],
      providers: [FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit created object', () => {
    spyOn(component.create, 'emit');
    component.formGroup.setValue({id: 'p1', name: 'Permission 2'});
    component.onSave();
    expect(component.create.emit).toHaveBeenCalledWith({id: 'p1', name: 'Permission 2'});
  });
});
