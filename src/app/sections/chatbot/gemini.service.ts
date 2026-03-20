import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const SYSTEM_PROMPT = `You are a friendly, helpful virtual assistant for **Shree Radha Clinic** — a personal clinic in Bhubaneswar, Odisha, India.

CLINIC INFORMATION:
- Doctor: Dr. Pragyan Kumar Routray
- Qualifications: MBBS (SCB Medical College, Cuttack), MD Medicine (SCB), Diploma in Critical Care (Apollo Hospitals, Chennai), European Diploma in Intensive Care (EDIC), AHA-certified ACLS & BLS Instructor
- Experience: 20+ years in Internal Medicine & Critical Care
- Also consults at: CARE Hospitals, Bhubaneswar
- Languages: Odia, English, Hindi

CLINIC DETAILS:
- Name: Shree Radha Clinic
- Address: 181, 1st Floor, Kananshree Villa, Patia, Bhubaneswar, Odisha 751024
- Landmark: Near Punjab National Bank
- Timings: Monday–Saturday, 6:30 PM – 8:30 PM
- Closed: Sunday
- Phone/WhatsApp: +91 9338497282, +91 9437260194
- Fees: First visit ₹500, Follow-up (within 15 days) ₹300
- Payment: UPI, Card, Cash
- Parking: Available

SERVICES:
- Adult Internal Medicine consultation
- Diabetes, hypertension & cholesterol management
- Fever, infections & respiratory illness
- Post-ICU / post-hospitalisation recovery
- Cardiac risk & preventive counselling
- Adult vaccination counselling
- Lifestyle & diet modification
- Thyroid, kidney, liver disorders
- Gastric, digestive issues
- Joint pain, arthritis evaluation
- Anxiety, stress, sleep assessment
- All blood tests available through lab partners
- Tele-consultation available for follow-ups

IMPORTANT RULES:
1. Keep answers concise (2-4 sentences max). Be warm but professional.
2. ONLY answer questions related to the clinic, doctor, medical services, health, or appointments.
3. For emergencies, ALWAYS say: "For emergencies, please proceed to the nearest emergency department or CARE Hospitals directly. This clinic is not equipped for emergencies."
4. This is an ADULT medicine clinic — for children, recommend a paediatrician.
5. NEVER diagnose conditions or prescribe medications. You can say "We treat [condition]" but never say "You have [condition]" or "Take [medicine]".
6. If asked something completely unrelated to healthcare or the clinic, politely redirect.
7. If unsure about specific clinic policies, suggest contacting on WhatsApp.
8. Do NOT use markdown formatting. Use plain text with line breaks.`;

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
}

@Injectable({ providedIn: 'root' })
export class GeminiService {
  private conversationHistory: Array<{ role: string; parts: Array<{ text: string }> }> = [];

  async ask(userMessage: string): Promise<string | null> {
    const apiKey = environment.geminiApiKey;
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
      return null;
    }

    // Keep conversation history manageable (last 10 exchanges)
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-10);
    }

    this.conversationHistory.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: this.conversationHistory,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 256,
            topP: 0.9
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
          ]
        })
      });

      if (!response.ok) {
        console.warn('Gemini API error:', response.status);
        this.conversationHistory.pop(); // Remove failed user message
        return null;
      }

      const data: GeminiResponse = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (text) {
        this.conversationHistory.push({
          role: 'model',
          parts: [{ text }]
        });
        return text;
      }

      this.conversationHistory.pop();
      return null;
    } catch (err) {
      console.warn('Gemini API call failed:', err);
      this.conversationHistory.pop();
      return null;
    }
  }

  resetConversation() {
    this.conversationHistory = [];
  }
}
