import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.scss']
})
export class ExperienceSectionComponent {
  journey = [
    { title: 'Medical Officer', place: 'Talcher (FCI Hospital)' },
    { title: 'Medical Officer', place: 'Neelachal Hospital, Bhubaneswar' },
    { title: 'Assistant Surgeon', place: 'SCB Medical College, Cuttack' },
    { title: 'Senior Resident', place: 'KIMS Hospital, Bhubaneswar' },
    { title: 'Junior Consultant, Critical Care', place: 'Apollo Hospitals, Chennai' },
    { title: 'Senior Critical Care Physician', place: 'CARE Hospitals, Bhubaneswar (present)' }
  ];
}
