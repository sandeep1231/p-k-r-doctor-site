import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay, map } from 'rxjs';

export type AppointmentStatus = 'new' | 'confirmed' | 'completed' | 'cancelled';

export interface AppointmentRequest {
  id: string;
  name: string;
  phone: string;
  date: string; // ISO date (YYYY-MM-DD)
  time: string; // HH:mm
  reason: string;
  uploadedFiles: string[]; // filenames only for now
  createdAt: string;
  status: AppointmentStatus;
  notes?: string;
}

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private requests$ = new BehaviorSubject<AppointmentRequest[]>([]);

  submit(req: Omit<AppointmentRequest, 'id' | 'createdAt' | 'status'>): Observable<AppointmentRequest> {
    const newReq: AppointmentRequest = {
      ...req,
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    // Simulate network latency
    return of(newReq).pipe(
      delay(800),
      map(r => {
        const list = this.requests$.value;
        this.requests$.next([...list, r]);
        return r;
      })
    );
  }

  list(): Observable<AppointmentRequest[]> {
    return this.requests$.asObservable();
  }

  updateStatus(id: string, status: AppointmentStatus, notes?: string): Observable<AppointmentRequest | undefined> {
    const list = this.requests$.value;
    const idx = list.findIndex(r => r.id === id);
    if (idx === -1) return of(undefined).pipe(delay(200));
    const updated: AppointmentRequest = { ...list[idx], status, notes };
    const newList = [...list];
    newList[idx] = updated;
    this.requests$.next(newList);
    return of(updated).pipe(delay(200));
  }

  exportCsv(): string {
    const header = ['id','name','phone','date','time','status','createdAt','reason','notes','files'];
    const rows = this.requests$.value.map(r => [
      r.id,
      r.name,
      r.phone,
      r.date,
      r.time,
      r.status,
      r.createdAt,
      r.reason.replace(/\n/g,' '),
      r.notes?.replace(/\n/g,' ') || '',
      r.uploadedFiles.join('|')
    ].map(v => '"'+String(v).replace(/"/g,'""')+'"').join(','));
    return [header.join(','), ...rows].join('\n');
  }
}
