import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotService } from '../chatbot/chatbot.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  isOpen = false;
  private timer: any;

  constructor(private chatbot: ChatbotService) {}

  ngOnInit() {
    this.checkStatus();
    this.timer = setInterval(() => this.checkStatus(), 60000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  private checkStatus() {
    this.isOpen = this.chatbot.isClinicOpen().open;
  }

  scrollTo(e: Event, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
