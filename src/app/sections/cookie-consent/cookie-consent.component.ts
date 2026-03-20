import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cookie-banner" *ngIf="showBanner" role="alert">
      <div class="container d-flex flex-wrap align-items-center justify-content-between gap-2 py-2">
        <p class="mb-0 small">We use cookies and analytics to improve your experience. No personal data is sold or shared with third parties.</p>
        <div class="d-flex gap-2 flex-shrink-0">
          <button class="btn btn-sm btn-light" (click)="dismiss()">Accept</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cookie-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(17, 17, 17, 0.95);
      color: #ced4da;
      z-index: 1060;
      backdrop-filter: blur(8px);
    }
  `]
})
export class CookieConsentComponent implements OnInit {
  showBanner = false;

  ngOnInit() {
    try {
      this.showBanner = !localStorage.getItem('cookie_consent');
    } catch {
      this.showBanner = false;
    }
  }

  dismiss() {
    this.showBanner = false;
    try {
      localStorage.setItem('cookie_consent', 'accepted');
    } catch {}
  }
}
