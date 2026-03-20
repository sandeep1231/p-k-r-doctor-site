import { Component, HostListener, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ChatbotService } from './chatbot.service';
import { ChatbotRule } from './chatbot-knowledge';
import { NewlineToBrPipe } from '../../pipes/newline-to-br.pipe';
import { environment } from '../../../environments/environment';

interface ChatMessage {
  text: string;
  sender: 'bot' | 'user';
  action?: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, NewlineToBrPipe],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  animations: [
    trigger('panelAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px) scale(0.95)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(20px) scale(0.95)' }))
      ])
    ]),
    trigger('messageAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fabAnim', [
      state('closed', style({ transform: 'scale(1)' })),
      state('open', style({ transform: 'scale(0)' })),
      transition('closed <=> open', animate('200ms ease-in-out'))
    ])
  ]
})
export class ChatbotComponent implements AfterViewChecked {
  isOpen = false;
  messages: ChatMessage[] = [];
  userInput = '';
  isTyping = false;
  quickReplies: ChatbotRule[] = [];
  private shouldScroll = false;
  private hasGreeted = false;

  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;

  constructor(private chatService: ChatbotService) {
    this.quickReplies = this.chatService.getQuickReplies();
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && !this.hasGreeted) {
      this.hasGreeted = true;
      this.addBotMessage(this.chatService.getGreeting());
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen) {
      this.isOpen = false;
    }
  }

  send(text?: string) {
    const input = (text || this.userInput).trim();
    if (!input) return;

    this.messages.push({ text: input, sender: 'user' });
    this.userInput = '';
    this.shouldScroll = true;
    this.isTyping = true;

    // Try rule-based first
    const rule = this.chatService.findAnswer(input);
    if (rule) {
      setTimeout(() => {
        this.isTyping = false;
        this.addBotMessage(rule.answer, rule.action);
      }, 500);
      return;
    }

    // Fallback to Gemini AI
    this.chatService.askGemini(input).then(aiReply => {
      this.isTyping = false;
      if (aiReply) {
        this.addBotMessage(aiReply);
      } else {
        this.addBotMessage(this.chatService.getFallbackMessage(), 'open-whatsapp');
      }
    });
  }

  handleQuickReply(rule: ChatbotRule) {
    if (rule.quickLabel) {
      this.send(rule.quickLabel);
    }
  }

  handleAction(action: string) {
    if (action === 'open-whatsapp') {
      window.open(`https://wa.me/${environment.whatsappNumber}`, '_blank');
      return;
    }
    const sectionMap: Record<string, string> = {
      'scroll-to-appointment': 'appointment',
      'scroll-to-clinic': 'clinic',
      'scroll-to-contact': 'contact',
      'scroll-to-services': 'services',
      'scroll-to-fees': 'fees'
    };
    const sectionId = sectionMap[action];
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: y, behavior: 'smooth' });
        this.isOpen = false;
      }
    }
  }

  private addBotMessage(text: string, action?: string) {
    this.messages.push({ text, sender: 'bot', action });
    this.shouldScroll = true;
  }

  private scrollToBottom() {
    if (this.messagesContainer?.nativeElement) {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }

  get clinicStatus() {
    return this.chatService.isClinicOpen();
  }
}
