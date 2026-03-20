import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CLINIC_PLACE_ID, CLINIC_LAT, CLINIC_LNG } from '../../config/clinic-info';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent {
  canShare = typeof navigator !== 'undefined' && !!navigator.share;

  async shareClinic() {
    try {
      await navigator.share({
        title: 'Shree Radha Clinic',
        text: 'Book an appointment with Dr. Pragyan Kumar Routray — Expert in Internal Medicine & Critical Care.',
        url: 'https://drpragyankumarroutray.com/'
      });
    } catch {}
  }

  async shareQR() {
    try {
      const res = await fetch('assets/qr-code.svg');
      const blob = await res.blob();
      const file = new File([blob], 'Shree-Radha-Clinic-QR.svg', { type: 'image/svg+xml' });
      await navigator.share({
        title: 'Shree Radha Clinic QR Code',
        text: 'Scan this QR code to visit Dr. Pragyan Kumar Routray\'s clinic website.',
        files: [file]
      });
    } catch {
      // Fallback: share URL if file sharing not supported
      try {
        await navigator.share({
          title: 'Shree Radha Clinic',
          text: 'Visit Dr. Pragyan Kumar Routray\'s clinic website:',
          url: 'https://drpragyankumarroutray.com/'
        });
      } catch {}
    }
  }
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
