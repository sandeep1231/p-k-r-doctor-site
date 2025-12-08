import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, serverTimestamp, query, orderByChild, limitToLast, get } from 'firebase/database';

export type Review = { name: string; rating: number; comment: string; createdAt?: number };

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private app = initializeApp(environment.firebase);
  private db = getDatabase(this.app);
  private colRef = ref(this.db, 'reviews');

  async add(review: Review) {
    const newRef = push(this.colRef);
    const doc = { ...review, createdAt: serverTimestamp() };
    await set(newRef, doc);
  }

  async listLatest(max = 50): Promise<Review[]> {
    const q = query(this.colRef, orderByChild('createdAt'), limitToLast(max));
    const snap = await get(q);
    const items: Review[] = [];
    snap.forEach(child => {
      const val = child.val() as Review;
      items.push(val);
    });
    // Reverse to show newest first (limitToLast returns ascending order)
    return items.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
  }
}
