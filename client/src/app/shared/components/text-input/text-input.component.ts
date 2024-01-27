import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() type = 'text';
  @Input() label = '';

  //@Self() - when we inject something into a component, it's going to try and reuse that service
  //and if it already exists, we will many inputs.
  //As we do not want to re-use the input that's already being passed into this injection.
  //And this decorator is used on constructor parameters, which tells the dependency injection framework
  //to start dependency resolution from the local injector.
  //So it's not going to try and look up the angular state tree to see if it's already got a service for
  //engine control in memory.
  //It's going to use local injection and we guarantee that by using this self decorator.
  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}

  getErrorMessage() {
    if (this.control.hasError('required')) {
      return 'Please enter your value';
    }
    if (this.control.hasError('email')) {
      return 'Invalid email address';
    }
    if (this.control.hasError('emailExists')) {
      return 'Email address is taken';
    }
    if (this.control.hasError('pattern')) {
      return 'Password must have 1 Uppercase, 1 Lowercase, 1 number, 1 non-alphanumeric, and at least 6 characters';
    }

    return '';
  }

  get control(): FormControl {
    return this.controlDir.control as FormControl;
  }
}
