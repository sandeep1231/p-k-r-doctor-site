import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section id="services" class="py-5">
    <div class="container">
      <h2 class="section-title">Specialities & Services</h2>
      <div class="row g-4">
        <div class="col-md-6 col-lg-4" *ngFor="let svc of services">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <div class="card-icon mb-3">🩺</div>
              <h5 class="card-title fw-semibold">{{svc.title}}</h5>
              <p class="card-text small mb-0">{{svc.desc}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="alert alert-warning mt-4 small" role="alert">
        <strong>Note:</strong> The clinic is not equipped to handle emergencies. For urgent or life-threatening conditions, please proceed to the nearest emergency department.
      </div>
    </div>
  </section>
  `
})
export class ServicesSectionComponent {
  services = [
    { title: 'Adult Internal Medicine consultation & follow-up', desc: 'Comprehensive evaluation and ongoing care plans.' },
    { title: 'Diabetes, hypertension & cholesterol management', desc: 'Optimised treatment and lifestyle integration.' },
    { title: 'Fever, infections & respiratory illness evaluation', desc: 'Focused diagnostics & timely therapy.' },
    { title: 'Post-ICU / post-hospitalisation recovery guidance', desc: 'Holistic transition back to daily life.' },
    { title: 'Cardiac risk & preventive counselling', desc: 'Assess risks and build preventive strategies.' },
    { title: 'Vaccination counselling (adult vaccines)', desc: 'Evidence-based immunisation guidance.' },
    { title: 'Lifestyle & diet modification support', desc: 'Practical changes for long-term health.' }
  ];
}
