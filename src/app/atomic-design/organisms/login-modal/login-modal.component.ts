import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { ICONS } from 'src/app/util/icons.constants';

@Component({
  selector: 'organism-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  validationMessages: any;

  icon_close = ICONS.CLOSE;

  @Input() formData: any = {};
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();


  constructor(private fb: FormBuilder, 
    private validationService: ValidationService,
  ) {
    this.validationMessages = ValidationService.getValidationMessages();
   }

  ngOnInit(): void {

    this.form = this.fb.group({
      email: ['', this.validationService.getStandardValidators({ required: true, min: 3, max: 50, email:true })],
      password: ['', this.validationService.getStandardValidators({ required: true, min: 3, max: 200 })]
    });

    this.form.get('email')?.valueChanges.subscribe(() => {
      this.form.get('email')?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    });

    this.form.get('password')?.valueChanges.subscribe(() => {
      this.form.get('password')?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    })
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    let controlNameSpanish = '';
    if (controlName == 'email') {
      controlNameSpanish = 'correo'
    }
    if (controlName == 'password') {
      controlNameSpanish = 'contraseña'
    }
    if (control && (control.touched || control.dirty) && control.errors) {
      if (control.hasError('required')) {
        return this.validationMessages.required(controlNameSpanish);
      } else if (control.hasError('minlength')) {
        return this.validationMessages.minlength(controlNameSpanish, control.getError('minlength').requiredLength);
      } else if (control.hasError('maxlength')) {
        return this.validationMessages.maxlength(controlNameSpanish, control.getError('maxlength').requiredLength);
      } else if (control.hasError('email')){
        return this.validationMessages.email(controlNameSpanish);
      }
    }
    return '';
  }

  submitForm(): void {
    const dataLoginExport = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };

    if (this.form.invalid) {
      return;
    }
    if (this.formData.onFormSubmit) {
      this.formData.onFormSubmit(dataLoginExport);
    }
  }

  close(): void {
    this.closeModal.emit();
  }
}
