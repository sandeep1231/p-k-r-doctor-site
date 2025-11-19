import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService, AppointmentRequest, AppointmentStatus } from '../appointment.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-appointments-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <section id="admin" class="py-5 bg-dark text-light">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="section-title text-white mb-0">Admin: Appointments</h2>
        <button class="btn btn-sm btn-outline-light" (click)="downloadCsv()">Export CSV</button>
      </div>
      <div class="row g-3 mb-4">
        <div class="col-md-3">
          <label class="form-label">Filter Status</label>
          <select class="form-select" [(ngModel)]="filter.status">
            <option value="">All</option>
            <option *ngFor="let s of statuses" [value]="s">{{s}}</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label">Search Name/Phone</label>
          <input class="form-control" [(ngModel)]="filter.search" placeholder="Type to search" />
        </div>
        <div class="col-md-3">
          <label class="form-label">Date (YYYY-MM-DD)</label>
          <input type="date" class="form-control" [(ngModel)]="filter.date" />
        </div>
        <div class="col-md-3 d-flex align-items-end">
          <button class="btn btn-outline-light w-100" (click)="resetFilters()">Reset Filters</button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-sm table-striped table-dark align-middle">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Files</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let appt of filteredAppointments()">
              <td>{{appt.date}}</td>
              <td>{{appt.time}}</td>
              <td class="small">
                <strong>{{appt.name}}</strong><br>
                <span class="text-muted">{{appt.createdAt | date:'short'}}</span>
              </td>
              <td>{{appt.phone}}</td>
              <td>
                <span class="badge" [ngClass]="badgeClass(appt.status)">{{appt.status}}</span>
              </td>
              <td class="small" style="max-width:220px;">{{appt.reason}}</td>
              <td class="small">
                <span *ngIf="appt.uploadedFiles.length; else none">{{appt.uploadedFiles.length}} file(s)</span>
                <ng-template #none>-</ng-template>
              </td>
              <td class="small">
                <div class="btn-group btn-group-sm">
                  <button class="btn btn-outline-light" (click)="setStatus(appt,'confirmed')" [disabled]="appt.status==='confirmed'">Confirm</button>
                  <button class="btn btn-outline-success" (click)="setStatus(appt,'completed')" [disabled]="appt.status==='completed'">Done</button>
                  <button class="btn btn-outline-danger" (click)="setStatus(appt,'cancelled')" [disabled]="appt.status==='cancelled'">Cancel</button>
                </div>
                <button class="btn btn-link text-decoration-none text-info p-0 mt-1" (click)="toggleNotes(appt)">Notes</button>
                <div *ngIf="openNotes===appt.id" class="mt-1">
                  <textarea rows="2" class="form-control form-control-sm" [(ngModel)]="notesDraft"></textarea>
                  <div class="d-flex gap-2 mt-1">
                    <button class="btn btn-sm btn-primary" (click)="saveNotes(appt)">Save</button>
                    <button class="btn btn-sm btn-secondary" (click)="closeNotes()">Close</button>
                  </div>
                </div>
                <div *ngIf="appt.notes && openNotes!==appt.id" class="mt-1 small text-warning">{{appt.notes}}</div>
              </td>
            </tr>
            <tr *ngIf="filteredAppointments().length===0">
              <td colspan="8" class="text-center py-4 text-muted">No appointments match filters.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
  `
})
export class AdminAppointmentsSectionComponent {
  appointments$!: Observable<AppointmentRequest[]>; // initialized in constructor after DI
  statuses: AppointmentStatus[] = ['new','confirmed','completed','cancelled'];
  filter = { status: '', search: '', date: '' };
  openNotes: string | null = null;
  notesDraft = '';

  constructor(private appointmentService: AppointmentService) {
    this.appointments$ = this.appointmentService.list();
  }

  filteredAppointments(): AppointmentRequest[] {
    let list: AppointmentRequest[] = [];
    (this.appointments$ as any)._value ? list = (this.appointments$ as any)._value : null; // accessing BehaviorSubject value
    // Fallback if direct access fails, subscribe (synchronous for BehaviorSubject)
    if (!list.length) {
      this.appointmentService.list().subscribe(l => list = l);
    }
    return list.filter(a => {
      if (this.filter.status && a.status !== this.filter.status) return false;
      if (this.filter.date && a.date !== this.filter.date) return false;
      if (this.filter.search) {
        const s = this.filter.search.toLowerCase();
        if (!a.name.toLowerCase().includes(s) && !a.phone.includes(s)) return false;
      }
      return true;
    });
  }

  setStatus(appt: AppointmentRequest, status: AppointmentStatus) {
    if (appt.status === status) return;
    this.appointmentService.updateStatus(appt.id, status).subscribe();
  }

  badgeClass(status: AppointmentStatus) {
    switch(status) {
      case 'new': return 'bg-primary';
      case 'confirmed': return 'bg-info';
      case 'completed': return 'bg-success';
      case 'cancelled': return 'bg-danger';
    }
  }

  toggleNotes(appt: AppointmentRequest) {
    if (this.openNotes === appt.id) { this.closeNotes(); return; }
    this.openNotes = appt.id;
    this.notesDraft = appt.notes || '';
  }
  closeNotes() { this.openNotes = null; this.notesDraft = ''; }
  saveNotes(appt: AppointmentRequest) {
    this.appointmentService.updateStatus(appt.id, appt.status, this.notesDraft).subscribe(() => this.closeNotes());
  }

  resetFilters() { this.filter = { status: '', search: '', date: '' }; }

  downloadCsv() {
    const csv = this.appointmentService.exportCsv();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'appointments.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  }
}
