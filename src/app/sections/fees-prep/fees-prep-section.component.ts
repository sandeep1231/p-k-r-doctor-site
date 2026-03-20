import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-fees-prep-section',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './fees-prep-section.component.html',
  styleUrls: ['./fees-prep-section.component.scss']
})
export class FeesPrepSectionComponent {}
