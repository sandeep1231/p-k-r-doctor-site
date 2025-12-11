import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery-section.component.html',
  styleUrls: ['./gallery-section.component.scss']
})
export class GallerySectionComponent {
  // Dummy images (replace with your own image URLs)
  images = [
    { id: 1, src: 'assets/clinic-1.jpeg', alt: 'Clinic 1' },
    { id: 2, src: 'assets/clinic-2.jpeg', alt: 'Clinic 2' },
    { id: 3, src: 'assets/clinic-3.jpeg', alt: 'Clinic 3' },
    { id: 4, src: 'assets/clinic-4.jpeg', alt: 'Clinic 4' },
    { id: 5, src: 'assets/clinic-5.jpeg', alt: 'Clinic 5' },
    { id: 6, src: 'assets/clinic-6.jpeg', alt: 'Clinic 6' },
    { id: 7, src: 'assets/clinic-7.jpeg', alt: 'Clinic 7' }
  ];

  activeImage: any = null;

  open(img: any) {
    this.activeImage = img;
  }

  close() {
    this.activeImage = null;
  }

  prev() {
    if (!this.activeImage) return;
    const idx = this.images.findIndex(i => i.id === this.activeImage.id);
    const prev = (idx - 1 + this.images.length) % this.images.length;
    this.activeImage = this.images[prev];
  }

  next() {
    if (!this.activeImage) return;
    const idx = this.images.findIndex(i => i.id === this.activeImage.id);
    const next = (idx + 1) % this.images.length;
    this.activeImage = this.images[next];
  }

  get featured() {
    return this.images;
  }
}
