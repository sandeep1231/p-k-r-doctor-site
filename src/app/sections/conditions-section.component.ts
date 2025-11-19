import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conditions-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="conditions" class="py-5 bg-light">
      <div class="container">
        <h2 class="section-title">Conditions Managed</h2>
        <div class="row">
          <div class="col-lg-10">
            <div class="row g-3">
              <div class="col-sm-6" *ngFor="let cond of conditions">
                <div class="d-flex align-items-start gap-2">
                  <span class="badge rounded-pill bg-primary mt-1">{{cond.id}}</span>
                  <span class="small">{{cond.label}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
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
