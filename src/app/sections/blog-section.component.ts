import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section id="blog" class="py-5">
    <div class="container">
      <h2 class="section-title">Health Insights (Blog)</h2>
      <p class="text-muted small">Optional educational content – add posts as needed.</p>
      <div class="row g-4">
        <div class="col-md-6 col-lg-3" *ngFor="let post of posts">
          <div class="card blog-card h-100 shadow-sm">
            <div class="card-body d-flex flex-column">
              <h6 class="fw-semibold mb-2">{{post.title}}</h6>
              <p class="small text-muted flex-grow-1 mb-3">{{post.excerpt}}</p>
              <a href="#" class="stretched-link small">Read more (coming soon)</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `
})
export class BlogSectionComponent {
  posts = [
    { title: 'Understanding Fever Causes & Warning Signs', excerpt: 'Recognise patterns, when to seek medical review...' },
    { title: 'Diabetes Risk Factors for Adults', excerpt: 'Lifestyle and metabolic markers to monitor...' },
    { title: 'Preventive Vaccinations Every Adult Should Consider', excerpt: 'Stay updated on essential adult immunisations...' },
    { title: 'How to Recover Safely After ICU Discharge', excerpt: 'Steps, nutrition and follow-up for stable recovery...' }
  ];
}
