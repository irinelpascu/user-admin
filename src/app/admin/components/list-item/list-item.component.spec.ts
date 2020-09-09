import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { FormBuilder } from '@angular/forms';
import { Configurable } from '../../models/admin.model';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemComponent],
      providers: [FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    component.model = {id: 'p1', name: 'Permission 1'};
    component.configs = [{id: 'permissions', options: [{id: 'p1', name: 'Permission1'}]}];
    component.ngOnChanges(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit updated permission', () => {
    spyOn(component.update, 'emit');
    component.formGroup.patchValue({name: 'Permission 2'});
    expect(component.update.emit).toHaveBeenCalledWith({id: 'p1', name: 'Permission 2', permissions: null} as Configurable);
  });

  it('should have permissions list', () => {
    component.permissions = [{id: 'p1', name: 'Permission 1'}, {id: 'p2', name: 'Permission 2'}];
    component.ngOnChanges(null);
    fixture.detectChanges();
    expect(component.permissionsNames).toBe('Permission 1, Permission 2');
  });
});
