import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ReactFormProject';
  submitted = false;
  formData: any;

  frm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
      Validators.pattern('^[A-Za-z]+$'),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.pattern('^[A-Za-z]+$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', Validators.required),
    dept: new FormControl('', Validators.required),
    isverified: new FormControl(false, Validators.requiredTrue),
  });

  onSubmit() {
    if (this.frm.valid) {
      this.submitted = true;
      this.formData = this.frm.value;
    }
  }
}
