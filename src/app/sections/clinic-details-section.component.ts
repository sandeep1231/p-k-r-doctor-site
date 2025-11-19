import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clinic-details-section',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section id="clinic" class="py-5 bg-white">
    <div class="container">
      <h2 class="section-title">Clinic Details</h2>
      <div class="row g-4">
        <div class="col-md-6">
          <h5 class="fw-semibold">Shree Radha Clinic</h5>
          <p class="small mb-2"><strong>Address:</strong> [Street Name], [Area], Bhubaneswar – 7510XX, Odisha<br><span class="text-muted">(Landmark: [Add Landmark] • Parking: Yes/No)</span></p>
          <p class="small mb-2"><strong>Timings:</strong><br>Monday – Saturday: 6:30 PM – 8:30 PM<br>Sunday: Closed</p>
          <p class="small mb-0"><em>You may adjust timings anytime.</em></p>
        </div>
        <div class="col-md-6">
          <div class="ratio ratio-4x3 bg-light border rounded overflow-hidden">
            <!-- Replace src with actual clinic coordinates when finalized -->
            <iframe title="Clinic Location" width="100%" height="100%" style="border:0" loading="lazy" allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.882709020172!2d85.8193999!3d20.2960586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a7410535e1df%3A0x4c6f8c9fe1d8cd53!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v0000000000000">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
  `
})
export class ClinicDetailsSectionComponent {}
