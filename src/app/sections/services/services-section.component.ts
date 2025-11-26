import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-section.component.html',
  styleUrls: ['./services-section.component.scss']
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
