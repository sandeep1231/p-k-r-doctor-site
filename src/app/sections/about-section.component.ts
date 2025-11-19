import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-5 bg-white">
      <div class="container">
        <h2 class="section-title">About the Doctor</h2>
        <div class="row g-4">
          <div class="col-lg-7">
            <h3 class="h4 fw-bold mb-2">Dr. Pragyan Kumar Routray</h3>
            <p class="text-muted mb-1">Senior Internal Medicine & Critical Care Physician</p>
            <p>Dr. Pragyan Kumar Routray is an experienced physician specialising in Internal Medicine and Critical Care with over two decades of dedicated service. He is known for his compassionate approach, clear communication, and evidence-based treatment plans.</p>
            <p>He provides adult medical consultations, chronic disease management, post-hospital recovery guidance, and critical-care follow-ups.</p>
            <p>He also consults at CARE Hospitals, Bhubaneswar, alongside running his independent personal clinic — Shree Radha Clinic.</p>
            <h4 class="h5 fw-semibold mt-4">Vision</h4>
            <p>To deliver advanced, ethical, and patient-centric medical care while ensuring every family receives clarity, support, and timely treatment — especially during critical medical situations.</p>
          </div>
          <div class="col-lg-5">
            <div class="p-4 rounded shadow-sm bg-light h-100">
              <h5 class="fw-semibold mb-3">Qualifications</h5>
              <ul class="list-unstyled small mb-4">
                <li>MBBS – SCB Medical College, Cuttack</li>
                <li>MD (Medicine) – SCB Medical College, Cuttack</li>
                <li>Diploma in Critical Care – Apollo Hospitals, Chennai</li>
                <li>European Diploma in Intensive Care (EDIC)</li>
                <li>AHA-Certified ACLS & BLS Instructor</li>
              </ul>
              <h5 class="fw-semibold mb-2">Languages Spoken</h5>
              <p class="small mb-0">Odia, English, Hindi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutSectionComponent {}
