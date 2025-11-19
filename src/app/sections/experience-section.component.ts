import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section id="experience" class="py-5">
    <div class="container">
      <h2 class="section-title">Clinical Experience</h2>
      <div class="row g-4">
        <div class="col-lg-7">
          <h5 class="fw-semibold mb-3">Professional Journey</h5>
          <ul class="timeline list-unstyled small">
            <li *ngFor="let role of journey" class="mb-2">
              <span class="fw-semibold">{{role.title}}</span>
              <span class="text-muted"> – {{role.place}}</span>
            </li>
          </ul>
        </div>
        <div class="col-lg-5">
          <div class="p-4 bg-light rounded shadow-sm h-100">
            <h5 class="fw-semibold mb-3">Achievements & Recognition</h5>
            <ul class="small mb-0 ps-3">
              <li>Presented research papers at APICON and International Critical Care Congress</li>
              <li>Publications in respected national and international medical journals</li>
              <li>Awarded Best Trainee – Critical Care, Apollo Hospitals, Chennai</li>
              <li>Executive Member – ISCCM, Bhubaneswar Chapter</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  `
})
export class ExperienceSectionComponent {
  journey = [
    { title: 'Medical Officer', place: 'Talcher (FCI Hospital)' },
    { title: 'Medical Officer', place: 'Neelachal Hospital, Bhubaneswar' },
    { title: 'Assistant Surgeon', place: 'SCB Medical College, Cuttack' },
    { title: 'Senior Resident', place: 'KIMS Hospital, Bhubaneswar' },
    { title: 'Junior Consultant, Critical Care', place: 'Apollo Hospitals, Chennai' },
    { title: 'Senior Critical Care Physician', place: 'CARE Hospitals, Bhubaneswar (present)' }
  ];
}
