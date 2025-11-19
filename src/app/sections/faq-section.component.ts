import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section id="faq" class="py-5">
    <div class="container">
      <h2 class="section-title">FAQs</h2>
      <div class="accordion" id="faqAccordion">
        <div class="accordion-item" *ngFor="let f of faqs; let i = index">
          <h2 class="accordion-header" [id]="'faqHeading'+i">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" [attr.data-bs-target]="'#faqCollapse'+i" aria-expanded="false" [attr.aria-controls]="'faqCollapse'+i">
              {{f.q}}
            </button>
          </h2>
          <div [id]="'faqCollapse'+i" class="accordion-collapse collapse" [attr.aria-labelledby]="'faqHeading'+i" data-bs-parent="#faqAccordion">
            <div class="accordion-body small">{{f.a}}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `
})
export class FaqSectionComponent {
  faqs = [
    { q: 'Do you accept walk-in patients?', a: 'Walk-ins are allowed but subject to availability. Appointments are recommended.' },
    { q: 'Is tele-consultation available?', a: 'Yes, for follow-ups and non-emergency issues.' },
    { q: 'How do I reschedule my appointment?', a: 'Please notify at least 3 hours before the scheduled time.' },
    { q: 'Can I get a second opinion here?', a: 'Yes. Please bring all relevant medical reports.' },
    { q: 'Is family allowed during consultation?', a: 'Yes, one attendant may accompany you.' }
  ];
}
