import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CLINIC_PLACE_ID, CLINIC_LAT, CLINIC_LNG } from '../../config/clinic-info';

@Component({
  selector: 'app-clinic-details-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clinic-details-section.component.html',
  styleUrls: ['./clinic-details-section.component.scss']
})
export class ClinicDetailsSectionComponent {
  clinicPlaceId = CLINIC_PLACE_ID;
  hasRealPlaceId(): boolean {
    return !!this.clinicPlaceId && this.clinicPlaceId !== 'PLACE_ID_REPLACE';
  }
  get directionsUrl(): string {
    if (this.hasRealPlaceId()) {
      return `https://www.google.com/maps/dir/?api=1&destination_place_id=${this.clinicPlaceId}&travelmode=driving`;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${CLINIC_LAT},${CLINIC_LNG}&travelmode=driving`;
  }

  get navigationUrl(): string {
    // Mobile-friendly direct search / navigate fallback
    return `https://maps.google.com/?q=${CLINIC_LAT},${CLINIC_LNG}`;
  }
}
