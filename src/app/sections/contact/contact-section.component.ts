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
      const png = await this.svgToPng('assets/qr-code.svg', 512);
      const file = new File([png], 'Shree-Radha-Clinic-QR.png', { type: 'image/png' });
      await navigator.share({
        title: 'Shree Radha Clinic QR Code',
        text: 'Scan this QR code to visit Dr. Pragyan Kumar Routray\'s clinic website.',
        files: [file]
      });
    } catch {
      try {
        await navigator.share({
          title: 'Shree Radha Clinic',
          text: 'Visit Dr. Pragyan Kumar Routray\'s clinic website:',
          url: 'https://drpragyankumarroutray.com/'
        });
      } catch {}
    }
  }

  private svgToPng(url: string, size: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
        canvas.toBlob(blob => blob ? resolve(blob) : reject(), 'image/png');
      };
      img.onerror = reject;
      img.src = url;
    });
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
