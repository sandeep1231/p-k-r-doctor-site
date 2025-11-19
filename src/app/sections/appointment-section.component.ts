import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-appointment-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <section id="appointment" class="py-5">
    <div class="container">
      <h2 class="section-title">Appointment Booking</h2>
      <div class="row g-4">
        <div class="col-lg-7">
          <form [formGroup]="form" (ngSubmit)="submit()" novalidate class="appointment-form">
            <div class="row g-3">
              <div class="col-sm-6">
                <label class="form-label">Name *</label>
                <input type="text" formControlName="name" class="form-control" placeholder="Full name">
                <div class="form-text error" *ngIf="invalid('name')">Required (min 2 chars).</div>
              </div>
              <div class="col-sm-6">
                <label class="form-label">Phone *</label>
                <input type="tel" formControlName="phone" class="form-control" placeholder="10-digit number">
                <div class="form-text error" *ngIf="invalid('phone')">Valid Indian phone required.</div>
              </div>
              <div class="col-sm-6">
                <label class="form-label">Date *</label>
                <input type="date" formControlName="date" class="form-control">
                <div class="form-text error" *ngIf="invalid('date')">Select a date.</div>
              </div>
              <div class="col-sm-6">
                <label class="form-label">Time *</label>
                <input type="time" formControlName="time" class="form-control">
                <div class="form-text error" *ngIf="invalid('time')">Select a time.</div>
              </div>
              <div class="col-12">
                <label class="form-label">Reason for Visit *</label>
                <textarea rows="3" formControlName="reason" class="form-control" placeholder="Brief description"></textarea>
                <div class="form-text error" *ngIf="invalid('reason')">Please describe reason (min 10 chars).</div>
              </div>
              <div class="col-12">
                <label class="form-label">Upload Reports (optional)</label>
                <input type="file" (change)="handleFiles($event)" class="form-control" multiple>
                <div class="form-text">PDF / images for reference only.</div>
              </div>
              <div class="col-12">
                <button class="btn btn-accent btn-lg px-4" [disabled]="form.invalid || loading">
                  {{ loading ? 'Submitting...' : 'Submit Request' }}
                </button>
              </div>
              <div class="col-12" *ngIf="submitted && form.valid">
                <div class="alert alert-success py-2 small mb-0">Request received. You will be contacted for confirmation & payment link (for tele-consult).</div>
              </div>
            </div>
          </form>
        </div>
        <div class="col-lg-5">
          <div class="p-4 bg-light rounded shadow-sm h-100 small">
            <h5 class="fw-semibold">Tele-Consultation Available</h5>
            <p class="mb-2">Payment link will be shared after confirmation. Please ensure a stable internet connection.</p>
            <h6 class="fw-semibold">How to Book</h6>
            <ol class="mb-0 ps-3">
              <li>Submit the online form OR message via WhatsApp.</li>
              <li>Receive confirmation & available slot.</li>
              <li>Complete payment (if tele-consult).</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>
  `
})
export class AppointmentSectionComponent {
  loading = false;
  submitted = false;
  uploadedFiles: File[] = [];
  form!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  invalid(control: string) {
    const c = this.form.get(control);
    return !!(c && c.invalid && (c.touched || this.submitted));
  }
  handleFiles(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) this.uploadedFiles = Array.from(input.files);
  }
  submit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.loading = true;
    const { name, phone, date, time, reason } = this.form.value;
    const files = this.uploadedFiles.map(f => f.name).join(', ');
    // Build WhatsApp message (attachments cannot be auto-sent; filenames included for reference)
    const message = `Appointment Request%0AName: ${encodeURIComponent(name!)}%0APhone: ${encodeURIComponent(phone!)}%0ADate: ${encodeURIComponent(date!)}%0ATime: ${encodeURIComponent(time!)}%0AReason: ${encodeURIComponent(reason!)}${files ? '%0AFiles: ' + encodeURIComponent(files) : ''}%0A(Note: Please attach the reports in WhatsApp after this message.)`;
    const url = `https://wa.me/${environment.whatsappNumber}?text=${message}`;
    window.open(url, '_blank');
    this.loading = false;
    this.form.reset();
    this.uploadedFiles = [];
  }
}
