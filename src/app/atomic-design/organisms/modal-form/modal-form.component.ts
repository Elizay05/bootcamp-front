import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Option } from 'src/app/interfaces/option.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { icons } from 'src/app/util/icons.enum';
import { FormData } from 'src/app/interfaces/form-data.interface';


@Component({
  selector: 'organism-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent {
  form: FormGroup = new FormGroup({});
  showSelect = false;
  selectedOptions: Option[] = [];
  isIncorrectSize: string = "";
  validationMessages: any;

  icon_close = icons.CLOSE;
  icon_add = icons.ADD;

  @Input() formData: any = {};
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder, 
    private validationService: ValidationService,
  ) {
    this.validationMessages = ValidationService.getValidationMessages();
   }

  ngOnInit(): void {
    console.log(this.formData)

    this.form = this.fb.group({
      nombre: ['', this.validationService.getStandardValidators({ required: true, min: 3, max: 50 })],
      descripcion: ['', this.validationService.getStandardValidators({ required: true, min: 5, max: 200 })]
    });

    this.form.get('nombre')?.valueChanges.subscribe(() => {
      this.form.get('nombre')?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    });

    this.form.get('descripcion')?.valueChanges.subscribe(() => {
      this.form.get('descripcion')?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    })
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control && (control.touched || control.dirty) && control.errors) {
      if (control.hasError('required')) {
        return this.validationMessages.required(controlName);
      } else if (control.hasError('minlength')) {
        return this.validationMessages.minlength(controlName, control.getError('minlength').requiredLength);
      } else if (control.hasError('maxlength')) {
        return this.validationMessages.maxlength(controlName, control.getError('maxlength').requiredLength);
      }
    }
    return '';
  }

  submitForm(): void {
    if (this.isDisabled) {
      return;
    }
    const formDataExport: FormData = {
      name: this.form.get('nombre')?.value,
      description: this.form.get('descripcion')?.value,
    };
    if (this.formData.isSelectCapacity) {
      formDataExport.technologies = this.selectedOptions.map(option => option.id);
    }
    if (this.formData.isSelectBootcamp){
      formDataExport.capacities = this.selectedOptions.map(option => option.id);
    }
    console.log('FormData:', this.formData.onFormSubmit);
    if (this.formData.onFormSubmit) {
      this.formData.onFormSubmit(formDataExport);
    }
  } 


  toggleInputSelect(): void {
    this.showSelect = true;
  }

  onSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = parseInt(selectElement.value, 10);
    const selectedOption = this.formData.options.find((opt: Option) => opt.id === selectedId);
  
    if (selectedOption) {
      if (!this.selectedOptions.some((opt: Option) => opt.id === selectedOption.id)) {
        this.selectedOptions.push(selectedOption);
      }
    }
  
    this.updateValidationState();
  }

  removeItem(optionToRemove: Option): void {
    this.selectedOptions = this.selectedOptions.filter((opt: Option) => opt.id !== optionToRemove.id);
    this.updateValidationState();
  }

  updateValidationState() {
    const result = this.validationService.validateListSize(
      this.formData.minOptionsSize, 
      this.formData.maxOptionsSize, 
      this.selectedOptions,
      this.formData.selectName
    );
    if (!result.valid) {
      this.isIncorrectSize = result.message ?? "Error desconocido";
    } else {
      this.isIncorrectSize = "valid";
    }
  }

  get isDisabled(): boolean {
    if (!this.formData.isSelectCapacity && !this.formData.isSelectBootcamp) {
      return this.form.invalid;
    } else {
      return this.form.invalid || this.isIncorrectSize !== "valid";
    }
  }

  close(): void {
    this.closeModal.emit();
  }

}