import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './sections/hero/hero-section.component';
import { AboutSectionComponent } from './sections/about/about-section.component';
import { ServicesSectionComponent } from './sections/services/services-section.component';
import { ConditionsSectionComponent } from './sections/conditions/conditions-section.component';
import { ExperienceSectionComponent } from './sections/experience/experience-section.component';
import { ClinicDetailsSectionComponent } from './sections/clinic-details/clinic-details-section.component';
import { FeesPrepSectionComponent } from './sections/fees-prep/fees-prep-section.component';
import { AppointmentSectionComponent } from './sections/appointment/appointment-section.component';
import { ContactSectionComponent } from './sections/contact/contact-section.component';
import { FaqSectionComponent } from './sections/faq/faq-section.component';
import { PoliciesSectionComponent } from './sections/policies/policies-section.component';
import { BlogSectionComponent } from './sections/blog/blog-section.component';
import { ReviewsSectionComponent } from './sections/reviews/reviews-section.component';
import { GallerySectionComponent } from './sections/gallery/gallery-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    AboutSectionComponent,
    ServicesSectionComponent,
      GallerySectionComponent,
    ConditionsSectionComponent,
    ExperienceSectionComponent,
    ClinicDetailsSectionComponent,
    FeesPrepSectionComponent,
    AppointmentSectionComponent,
    ContactSectionComponent,
    FaqSectionComponent,
    PoliciesSectionComponent,
    BlogSectionComponent,
    ReviewsSectionComponent
  ],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light navbar-custom fixed-top shadow-sm">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#hero" [class.active]="activeSection==='hero'">Shree Radha Clinic</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0" (click)="handleNavClick($event)">
            <li class="nav-item"><a class="nav-link" [class.active]="activeSection==='about'" [attr.aria-current]="activeSection==='about' ? 'page' : null" href="#about">About</a></li>
            <li class="nav-item"><a class="nav-link" [class.active]="activeSection==='services'" [attr.aria-current]="activeSection==='services' ? 'page' : null" href="#services">Services</a></li>
            <li class="nav-item"><a class="nav-link" [class.active]="activeSection==='conditions'" [attr.aria-current]="activeSection==='conditions' ? 'page' : null" href="#conditions">Conditions</a></li>
            <li class="nav-item"><a class="nav-link" [class.active]="activeSection==='experience'" [attr.aria-current]="activeSection==='experience' ? 'page' : null" href="#experience">Experience</a></li>
            <li class="nav-item"><a class="nav-link" [class.active]="activeSection==='clinic'" [attr.aria-current]="activeSection==='clinic' ? 'page' : null" href="#clinic">Clinic</a></li>
            <li class="nav-item"><a class="nav-link" [class.active]="activeSection==='fees'" [attr.aria-current]="activeSection==='fees' ? 'page' : null" href="#fees">Fees</a></li>
            <li class="nav-item"><a class="nav-link" [class.active]="activeSection==='appointment'" [attr.aria-current]="activeSection==='appointment' ? 'page' : null" href="#appointment">Appointment</a></li>
            <li class="nav-item"><a class="nav-link" [class.active]="activeSection==='faq'" [attr.aria-current]="activeSection==='faq' ? 'page' : null" href="#faq">FAQs</a></li>
            <li class="nav-item"><a class="nav-link" [class.active]="activeSection==='blog'" [attr.aria-current]="activeSection==='blog' ? 'page' : null" href="#blog">Blog</a></li>
            <li class="nav-item"><a class="nav-link" [class.active]="activeSection==='contact'" [attr.aria-current]="activeSection==='contact' ? 'page' : null" href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="smooth-scroll">
      <app-hero-section></app-hero-section>
      <app-about-section></app-about-section>
      <app-services-section></app-services-section>
      <app-gallery-section></app-gallery-section>
      <app-conditions-section></app-conditions-section>
      <app-experience-section></app-experience-section>
      <app-clinic-details-section></app-clinic-details-section>
      <app-fees-prep-section></app-fees-prep-section>
      <app-appointment-section></app-appointment-section>
      <app-faq-section></app-faq-section>
      <app-policies-section></app-policies-section>
      <app-blog-section></app-blog-section>
      <app-reviews-section></app-reviews-section>
      <app-contact-section></app-contact-section>
    </div>

    <footer class="footer mt-5">
      <div class="container text-center small">
        <p class="mb-1">&copy; {{year}} Shree Radha Clinic. All rights reserved.</p>
        <p class="mb-0">Site for informational & appointment purposes. Not a substitute for emergency care.</p>
      </div>
    </footer>
  `
})
export class AppComponent implements AfterViewInit {
  year = new Date().getFullYear();
  activeSection = '';

  ngAfterViewInit() {
    const sectionIds = [
      'hero','about','services','conditions','experience','clinic','fees','appointment','faq','policies','blog','contact'
    ];
    const observer = new IntersectionObserver(entries => {
      // Collect intersecting entries
      const visible = entries.filter(e => e.isIntersecting);
      if (visible.length) {
        // Sort by largest intersection ratio first
        visible.sort((a,b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        const id = top.target.getAttribute('id');
        if (id) {
          this.activeSection = id; // hero can now be active
        }
      } else if (window.scrollY < 50) {
        // Near very top – hero is active
        this.activeSection = 'hero';
      }
    }, { root: null, threshold: [0.25,0.5,0.75] });
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  handleNavClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('nav-link')) return;
    // Close collapse
    const nav = document.getElementById('mainNav');
    if (nav && nav.classList.contains('show')) {
      const w: any = window as any;
      if (w.bootstrap && w.bootstrap.Collapse) {
        const collapseInstance = w.bootstrap.Collapse.getInstance(nav) || new w.bootstrap.Collapse(nav, { toggle: false });
        collapseInstance.hide();
      } else {
        nav.classList.remove('show');
      }
    }
    // Smooth scroll with offset for fixed navbar
    const href = (target.getAttribute('href') || '').trim();
    if (href.startsWith('#')) {
      event.preventDefault();
      const id = href.substring(1);
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 72; // approx navbar height
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }
}
