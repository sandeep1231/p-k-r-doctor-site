import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  templateUrl: './whatsapp-fab.component.html',
  styleUrls: ['./whatsapp-fab.component.scss']
})
export class WhatsAppFabComponent {
  whatsappUrl = `https://wa.me/${environment.whatsappNumber}`;
}
