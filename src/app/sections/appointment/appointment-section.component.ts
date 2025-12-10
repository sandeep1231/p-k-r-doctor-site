import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-appointment-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-section.component.html',
  styleUrls: ['./appointment-section.component.scss']
})
export class AppointmentSectionComponent {
  loading = false;
  submitted = false;
  form!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^(?:\+?91)?\d{10}$/)]],
      age: [null, [Validators.required, Validators.min(0), Validators.max(120)]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      sex: ['Male', [Validators.required]],
      reason: [''],
    });
  }
  invalid(control: string) {
    const c = this.form.get(control);
    return !!(c && c.invalid && (c.touched || this.submitted));
  }
  submit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.loading = true;
    const { name, phone, date, time, reason, age, sex } = this.form.value;
    const reasonText = reason ? reason : 'Not provided';
    const message = `Appointment Request%0AName: ${encodeURIComponent(name!)}%0APhone: ${encodeURIComponent(phone!)}%0AAge: ${encodeURIComponent(String(age))}%0ASex: ${encodeURIComponent(sex)}%0ADate: ${encodeURIComponent(date!)}%0ATime: ${encodeURIComponent(time!)}%0AReason: ${encodeURIComponent(reasonText)}`;
    const url = `https://wa.me/${environment.whatsappNumber}?text=${message}`;
    window.open(url, '_blank');
    this.loading = false;
    this.form.reset({ name: '', phone: '', age: null, date: '', time: '', sex: 'Male', reason: '' });
  }
}
