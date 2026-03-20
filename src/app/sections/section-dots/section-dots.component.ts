import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-dots',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="section-dots" *ngIf="visible" aria-label="Section navigation">
      <a *ngFor="let dot of dots"
         [href]="'#' + dot.id"
         class="dot"
         [class.active]="activeId === dot.id"
         [attr.aria-label]="dot.label"
         [title]="dot.label"
         (click)="navigate($event, dot.id)">
        <span class="dot-tooltip">{{ dot.label }}</span>
      </a>
    </nav>
  `,
  styles: [`
    .section-dots {
      position: fixed;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1030;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .dot {
      width: 10px; height: 10px;
      border-radius: 50%;
      background: rgba(0,0,0,0.2);
      border: 2px solid rgba(0,0,0,0.15);
      transition: all 0.3s ease;
      position: relative;
      display: block;
      text-decoration: none;
    }
    .dot:hover { background: #0b8f7b; transform: scale(1.4); }
    .dot.active {
      background: #0b8f7b; border-color: #0b8f7b;
      transform: scale(1.3);
      box-shadow: 0 0 0 3px rgba(11,143,123,0.25);
    }
    .dot-tooltip {
      position: absolute; left: 22px; top: 50%;
      transform: translateY(-50%);
      background: #111; color: #fff;
      font-size: 0.72rem; padding: 3px 10px;
      border-radius: 4px; white-space: nowrap;
      opacity: 0; pointer-events: none;
      transition: opacity 0.2s;
    }
    .dot:hover .dot-tooltip { opacity: 1; }
    :host-context([data-bs-theme="dark"]) .dot {
      background: rgba(255,255,255,0.15);
      border-color: rgba(255,255,255,0.1);
    }
    :host-context([data-bs-theme="dark"]) .dot.active {
      background: #0b8f7b; border-color: #0b8f7b;
    }
    @media (max-width: 992px) { .section-dots { display: none; } }
  `]
})
export class SectionDotsComponent implements AfterViewInit, OnDestroy {
  dots = [
    { id: 'hero', label: 'Home' }, { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' }, { id: 'gallery', label: 'Gallery' },
    { id: 'conditions', label: 'Conditions' }, { id: 'experience', label: 'Experience' },
    { id: 'clinic', label: 'Clinic' }, { id: 'fees', label: 'Fees' },
    { id: 'appointment', label: 'Appointment' }, { id: 'faq', label: 'FAQs' },
    { id: 'blog', label: 'Blog' }, { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' }
  ];
  activeId = 'hero';
  visible = false;
  private observer?: IntersectionObserver;
  private visibleSet = new Set<string>();

  ngAfterViewInit() {
    this.visible = true;
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const id = e.target.getAttribute('id');
        if (!id) return;
        if (e.isIntersecting) {
          this.visibleSet.add(id);
        } else {
          this.visibleSet.delete(id);
        }
      });
      // Pick the topmost visible section based on dots order
      for (const dot of this.dots) {
        if (this.visibleSet.has(dot.id)) {
          this.activeId = dot.id;
          break;
        }
      }
    }, { threshold: [0.15] });
    this.dots.forEach(d => {
      const el = document.getElementById(d.id);
      if (el) this.observer!.observe(el);
    });
  }

  ngOnDestroy() { this.observer?.disconnect(); }

  navigate(e: Event, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
