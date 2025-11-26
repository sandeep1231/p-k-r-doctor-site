import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CLINIC_PLACE_ID, CLINIC_LAT, CLINIC_LNG } from '../../config/clinic-info';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent {
  clinicPlaceId = CLINIC_PLACE_ID;
  get hasRealPlaceId(): boolean {
    return !!this.clinicPlaceId && this.clinicPlaceId !== 'PLACE_ID_REPLACE';
  }
  get directionsUrl(): string {
    if (this.hasRealPlaceId) {
      return `https://www.google.com/maps/dir/?api=1&destination_place_id=${this.clinicPlaceId}&travelmode=driving`;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${CLINIC_LAT},${CLINIC_LNG}&travelmode=driving`;
  }
  get navigationUrl(): string {
    return `https://maps.google.com/?q=${CLINIC_LAT},${CLINIC_LNG}`;
  }
}
