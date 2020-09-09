import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  ConfigOption,
  Configurable
} from '../../models/admin.model';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ef-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent implements OnChanges, OnDestroy {

  @Input() model: Configurable;
  @Input() configs: ConfigOption[];
  @Output() update: EventEmitter<Configurable> = new EventEmitter<Configurable>();

  destroy$: Subject<void> = new Subject<void>();
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.destroy$.next();
    this.formGroup = this.fb.group(
      this.configs.reduce((acc, crt) => ({
        ...acc,
        [crt.id]: this.fb.control(this.model[crt.id]),
      }), {name: this.fb.control(this.model.name, Validators.required)})
    );
    this.formGroup.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(value => this.update.emit(value));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
