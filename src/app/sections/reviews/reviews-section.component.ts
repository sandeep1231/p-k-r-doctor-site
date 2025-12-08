import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReviewsService, Review as DbReview } from '../../services/reviews.service';

type Review = { name: string; rating: number; comment: string; date?: string };

@Component({
  selector: 'app-reviews-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reviews-section.component.html',
  styleUrls: ['./reviews-section.component.scss']
})
export class ReviewsSectionComponent {
  form!: FormGroup;
  submitted = false;
  reviews: Review[] = [];
  totalCount = 0;
  pageSize = 5;
  successMsg = '';
  ratingCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  ratingPercents: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  constructor(private fb: FormBuilder, private reviewsService: ReviewsService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      rating: [5, [Validators.required]],
      comment: ['', [Validators.required, Validators.minLength(1)]]
    });
    this.loadReviews();
  }

  private async loadReviews() {
    const all = await this.reviewsService.listLatest(200);
    this.totalCount = all.length;
    this.reviews = all.slice(0, this.pageSize);
    this.ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const r of all) {
      const val = Number((r as any).rating);
      if (val >= 1 && val <= 5) this.ratingCounts[val]++;
    }
    // compute percents for small bars
    for (let i = 1; i <= 5; i++) {
      this.ratingPercents[i] = this.totalCount ? Math.round((this.ratingCounts[i] / this.totalCount) * 100) : 0;
    }
  }

  private saveReviews() {}

  stars(n: number) { return Array(n).fill(0); }

  invalid(ctrl: string) {
    const c = this.form.get(ctrl);
    return !!c && c.touched && c.invalid;
  }

  async submit() {
    this.submitted = true;
    if (this.form.invalid) return;
    const v = this.form.value;
    const review: DbReview = {
      name: String(v.name),
      rating: Number(v.rating),
      comment: String(v.comment)
    };
    await this.reviewsService.add(review);
    await this.loadReviews();
    this.form.reset({ name: '', rating: 5, comment: '' });
    this.submitted = false;
    this.successMsg = 'Thank you! Your review was submitted successfully.';
    setTimeout(() => { this.successMsg = ''; }, 4000);
  }

  showMore() {
    this.pageSize += 5;
    this.loadReviews();
  }
}
