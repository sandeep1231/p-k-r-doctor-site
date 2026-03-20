import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-testimonial-ticker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ticker-strip" *ngIf="reviews.length" aria-label="Patient testimonials">
      <div class="ticker-track">
        <div class="ticker-item" *ngFor="let r of doubledReviews">
          <span class="ticker-stars">{{ starString(r.rating) }}</span>
          <span class="ticker-text">"{{ truncate(r.comment, 80) }}"</span>
          <span class="ticker-name">— {{ r.name }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ticker-strip {
      background: #f0fdf9;
      border-top: 1px solid #e0f2ee;
      border-bottom: 1px solid #e0f2ee;
      overflow: hidden;
      padding: 10px 0;
      white-space: nowrap;
    }
    :host-context([data-bs-theme="dark"]) .ticker-strip {
      background: #1a2e2a;
      border-color: #2a3e3a;
    }
    .ticker-track {
      display: inline-flex;
      animation: ticker-scroll 40s linear infinite;
      gap: 3rem;
    }
    .ticker-track:hover { animation-play-state: paused; }
    .ticker-item {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      flex-shrink: 0;
    }
    .ticker-stars { color: #f5a623; }
    .ticker-text { color: #495057; }
    .ticker-name { font-weight: 600; color: #0b8f7b; }
    :host-context([data-bs-theme="dark"]) .ticker-text { color: #ced4da; }
    @keyframes ticker-scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `]
})
export class TestimonialTickerComponent implements OnInit {
  reviews: Array<{ name: string; rating: number; comment: string }> = [];

  constructor(private reviewsService: ReviewsService) {}

  async ngOnInit() {
    const all = await this.reviewsService.listLatest(20);
    this.reviews = all
      .filter((r: any) => r.rating >= 4)
      .slice(0, 10)
      .map((r: any) => ({ name: r.name, rating: r.rating, comment: r.comment }));
  }

  get doubledReviews() {
    return [...this.reviews, ...this.reviews];
  }

  starString(n: number): string {
    return '★'.repeat(n);
  }

  truncate(text: string, max: number): string {
    return text.length > max ? text.substring(0, max) + '…' : text;
  }
}
