import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-policies-section',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './policies-section.component.html',
  styleUrls: ['./policies-section.component.scss']
})
export class PoliciesSectionComponent {}
