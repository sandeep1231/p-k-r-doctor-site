import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dark-mode-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="dark-mode-btn" (click)="toggle()" [attr.aria-label]="isDark ? 'Switch to light mode' : 'Switch to dark mode'" [title]="isDark ? 'Light mode' : 'Dark mode'">
      <svg *ngIf="!isDark" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
      <svg *ngIf="isDark" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    </button>
  `,
  styles: [`
    .dark-mode-btn {
      background: none;
      border: 1px solid rgba(0,0,0,0.15);
      border-radius: 50%;
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: inherit;
      transition: background 0.2s, border-color 0.2s;
    }
    .dark-mode-btn:hover { background: rgba(0,0,0,0.08); }
    :host-context([data-bs-theme="dark"]) .dark-mode-btn {
      border-color: rgba(255,255,255,0.2);
    }
    :host-context([data-bs-theme="dark"]) .dark-mode-btn:hover {
      background: rgba(255,255,255,0.1);
    }
  `]
})
export class DarkModeToggleComponent {
  isDark = false;

  constructor() {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) {
        this.isDark = saved === 'dark';
      } else {
        this.isDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
      }
      this.apply();
    } catch {}
  }

  toggle() {
    this.isDark = !this.isDark;
    this.apply();
    try { localStorage.setItem('theme', this.isDark ? 'dark' : 'light'); } catch {}
  }

  private apply() {
    document.documentElement.setAttribute('data-bs-theme', this.isDark ? 'dark' : 'light');
  }
}
