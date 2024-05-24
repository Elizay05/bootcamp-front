import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { icons } from 'src/app/util/icons.enum';

@Component({
  selector: 'organism-form-version',
  templateUrl: './form-version.component.html',
  styleUrls: ['./form-version.component.scss']
})
export class FormVersionComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  validationMessages: any;

  icon_close = icons.CLOSE;
  icon_add = icons.ADD;

  @Input() formData: any = {};
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();


  constructor(private fb: FormBuilder, private validationService: ValidationService) {
    this.validationMessages = ValidationService.getValidationMessages();
  }

  ngOnInit(): void {
    console.log(this.formData);

    this.form = this.fb.group({
      release_date: ['', this.validationService.getStandardValidators({ required: true})],
      final_date: ['', this.validationService.getStandardValidators({ required: true })],
      maximum_quota: ['', this.validationService.getStandardValidators({ required: true, pattern: '^[0-9]+$' })]
    });

    this.subscribeToValueChanges();
  }

  subscribeToValueChanges(): void {
    Object.keys(this.form.controls).forEach(controlName => {
      this.form.get(controlName)?.valueChanges.subscribe(() => {
        this.form.get(controlName)?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      });
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (controlName == 'maximum_quota') {
      controlName = 'cupo máximo'
    }
    if (controlName == 'release_date') {
      controlName = 'fecha de lanzamiento'
    }
    if (controlName == 'final_date') {
      controlName = 'fecha final'
    }
    if (control && (control.touched || control.dirty) && control.errors) {
      if (control.hasError('required')) {
        return this.validationMessages.required(controlName);
      }
      if (control.hasError('pattern')) {
        return this.validationMessages.pattern(controlName);
      }
    }
    return '';
  }

  submitForm(): void {
    if (this.isDisabled) {
      return;
    }
    const formData: any = {
      maximumQuota: this.form.get('maximum_quota')?.value,
      startDate: this.form.get('release_date')?.value,
      endDate: this.form.get('final_date')?.value,
    };
    if (this.formData.onFormSubmit) {
      this.formData.onFormSubmit(formData);
    }
    console.log(formData);
  }

  get isDisabled(): boolean {
    return this.form.invalid;
  }

  close(): void {
    this.closeModal.emit();
  }
}
