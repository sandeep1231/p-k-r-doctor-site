import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="scroll-progress-bar" [style.width.%]="progress"></div>`,
  styles: [`
    .scroll-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #0b8f7b, #0d6efd);
      z-index: 1100;
      transition: width 0.1s linear;
    }
  `]
})
export class ScrollProgressComponent {
  progress = 0;

  @HostListener('window:scroll')
  onScroll() {
    const docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.progress = docH > 0 ? (window.scrollY / docH) * 100 : 0;
  }
}
