import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Configurable } from '../../models/admin.model';

@Component({
  selector: 'ef-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewItemComponent implements OnInit {

  @Output() create: EventEmitter<Configurable> = new EventEmitter<Configurable>();
  @Output() dismiss: EventEmitter<void> = new EventEmitter<void>();

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: this.fb.control('', Validators.required),
      name: this.fb.control('', Validators.required),
    });
  }

  onSave() {
    this.create.emit(this.formGroup.value);
  }
}
