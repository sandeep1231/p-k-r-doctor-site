import { Injectable } from '@angular/core';
import { CHATBOT_RULES, CLINIC_HOURS, GREETING_MESSAGE, FALLBACK_MESSAGE, ChatbotRule } from './chatbot-knowledge';
import { GeminiService } from './gemini.service';

@Injectable({ providedIn: 'root' })
export class ChatbotService {

  constructor(private gemini: GeminiService) {}

  // Synonym map for normalization
  private synonyms: Record<string, string> = {
    'dr': 'doctor', 'doc': 'doctor', 'physician': 'doctor',
    'appt': 'appointment', 'apt': 'appointment',
    'mon': 'monday', 'tue': 'tuesday', 'wed': 'wednesday',
    'thu': 'thursday', 'fri': 'friday', 'sat': 'saturday', 'sun': 'sunday',
    'rs': 'fee', 'rupees': 'fee', 'rupee': 'fee', 'charges': 'charge',
    'consult': 'consultation', 'checkup': 'consultation', 'check-up': 'consultation',
    'addr': 'address', 'loc': 'location', 'dir': 'direction',
    'msg': 'message', 'wp': 'whatsapp', 'wa': 'whatsapp',
    'no': 'number', 'ph': 'phone', 'mob': 'phone', 'mobile': 'phone',
    'u': 'you', 'r': 'are', 'ur': 'your', 'pls': 'please', 'plz': 'please',
    'info': 'information', 'abt': 'about',
    'thnx': 'thanks', 'thx': 'thanks', 'ty': 'thanks',
  };

  private normalize(input: string): string {
    return input.toLowerCase().trim()
      .replace(/[?!.,;:]+/g, ' ')
      .replace(/\s+/g, ' ')
      .split(' ')
      .map(w => this.synonyms[w] || w)
      .join(' ')
      .trim();
  }

  findAnswer(input: string): ChatbotRule | null {
    const lower = this.normalize(input);
    if (!lower) return null;

    let bestMatch: ChatbotRule | null = null;
    let bestScore = 0;

    for (const rule of CHATBOT_RULES) {
      let score = 0;
      for (const kw of rule.keywords) {
        if (lower.includes(kw)) {
          // Multi-word phrases get higher weight
          score += kw.split(' ').length;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = rule;
      }
    }
    return bestMatch;
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    let timeGreeting: string;
    if (hour < 12) {
      timeGreeting = 'Good morning';
    } else if (hour < 17) {
      timeGreeting = 'Good afternoon';
    } else {
      timeGreeting = 'Good evening';
    }
    const status = this.isClinicOpen();
    return `${timeGreeting}! ${GREETING_MESSAGE}\n\n🏥 Clinic is currently ${status.open ? '🟢 Open' : '🔴 Closed'}. ${status.message}`;
  }

  isClinicOpen(): { open: boolean; message: string } {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentMinutes = hours * 60 + minutes;
    const openMinutes = CLINIC_HOURS.openHour * 60 + CLINIC_HOURS.openMinute;
    const closeMinutes = CLINIC_HOURS.closeHour * 60 + CLINIC_HOURS.closeMinute;

    if (!CLINIC_HOURS.days.includes(day)) {
      return { open: false, message: `Closed today (${CLINIC_HOURS.closedDay}). Opens Mon 6:30 PM.` };
    }
    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      return { open: true, message: `Open until ${CLINIC_HOURS.closeHour - 12}:${String(CLINIC_HOURS.closeMinute).padStart(2, '0')} PM.` };
    }
    if (currentMinutes < openMinutes) {
      return { open: false, message: `Opens today at 6:30 PM.` };
    }
    return { open: false, message: `Closed for today. Opens tomorrow at 6:30 PM.` };
  }

  getQuickReplies(): ChatbotRule[] {
    return CHATBOT_RULES.filter(r => !!r.quickLabel);
  }

  getFallbackMessage(): string {
    return FALLBACK_MESSAGE;
  }

  async askGemini(input: string): Promise<string | null> {
    return this.gemini.ask(input);
  }

  resetGeminiConversation() {
    this.gemini.resetConversation();
  }
}
