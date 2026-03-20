import { Injectable } from '@angular/core';
import { CHATBOT_RULES, CLINIC_HOURS, GREETING_MESSAGE, FALLBACK_MESSAGE, ChatbotRule } from './chatbot-knowledge';

@Injectable({ providedIn: 'root' })
export class ChatbotService {

  findAnswer(input: string): ChatbotRule | null {
    const lower = input.toLowerCase().trim();
    if (!lower) return null;

    let bestMatch: ChatbotRule | null = null;
    let bestCount = 0;

    for (const rule of CHATBOT_RULES) {
      const matchCount = rule.keywords.filter(kw => lower.includes(kw)).length;
      if (matchCount > bestCount) {
        bestCount = matchCount;
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
}
