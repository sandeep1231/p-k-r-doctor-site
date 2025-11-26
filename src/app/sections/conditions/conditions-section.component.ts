import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conditions-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conditions-section.component.html',
  styleUrls: ['./conditions-section.component.scss']
})
export class ConditionsSectionComponent {
  conditions = [
    'Acute & chronic infections',
    'Uncontrolled fever',
    'Respiratory problems (asthma, pneumonia, breathlessness)',
    'Diabetes, hypertension & thyroid disorders',
    'Gastric issues, acidity, abdominal discomfort',
    'Cardiac symptoms (chest pain, palpitations)',
    'Weakness, fatigue, nutritional deficiencies',
    'Multi-system medical conditions',
    'Post-operative medical care',
    'Post-ICU follow-up & medication optimisation'
  ].map((label, i) => ({ id: i + 1, label }));
}
