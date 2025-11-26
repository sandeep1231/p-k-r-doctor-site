import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-section.component.html',
  styleUrls: ['./faq-section.component.scss']
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
