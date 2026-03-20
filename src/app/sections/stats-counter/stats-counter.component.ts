import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-stats-counter',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section class="stats-section py-4" appScrollReveal>
      <div class="container">
        <div class="row text-center g-3">
          <div class="col-6 col-md-3" *ngFor="let stat of stats; let i = index">
            <div class="stat-item" #statItem [attr.data-target]="stat.value">
              <div class="stat-number fw-bold">{{ stat.current }}{{ stat.suffix }}</div>
              <div class="stat-label small text-muted">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .stats-section {
      background: linear-gradient(135deg, #0b8f7b 0%, #0d6efd 100%);
      color: #fff;
    }
    .stat-number { font-size: 2.2rem; line-height: 1.2; }
    .stat-label { opacity: 0.9; color: rgba(255,255,255,0.85) !important; }
    .stat-item { padding: 1rem 0; }
    @media (max-width: 576px) {
      .stat-number { font-size: 1.6rem; }
    }
  `]
})
export class StatsCounterComponent implements AfterViewInit {
  stats = [
    { value: 20, suffix: '+', label: 'Years Experience', current: 0 },
    { value: 10000, suffix: '+', label: 'Patients Treated', current: 0 },
    { value: 6, suffix: '+', label: 'Hospitals Served', current: 0 },
    { value: 5, suffix: '', label: 'Qualifications', current: 0 }
  ];

  @ViewChildren('statItem') statItems!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    const el = this.statItems?.first?.nativeElement;
    if (el) observer.observe(el.closest('.stats-section') || el);
  }

  private animateCounters() {
    const duration = 1500;
    const steps = 40;
    const interval = duration / steps;

    this.stats.forEach(stat => {
      let step = 0;
      const increment = stat.value / steps;
      const timer = setInterval(() => {
        step++;
        stat.current = Math.min(Math.round(increment * step), stat.value);
        if (step >= steps) {
          stat.current = stat.value;
          clearInterval(timer);
        }
      }, interval);
    });
  }
}
