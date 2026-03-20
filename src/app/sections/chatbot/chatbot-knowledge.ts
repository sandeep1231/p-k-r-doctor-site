export interface ChatbotRule {
  keywords: string[];
  answer: string;
  quickLabel?: string;
  action?: 'scroll-to-appointment' | 'scroll-to-clinic' | 'scroll-to-contact' | 'scroll-to-services' | 'scroll-to-fees' | 'open-whatsapp';
  category?: string;
}

export const CLINIC_HOURS = {
  days: [1, 2, 3, 4, 5, 6], // Mon–Sat (JS getDay: 0=Sun)
  openHour: 18,
  openMinute: 30,
  closeHour: 20,
  closeMinute: 30,
  label: 'Monday – Saturday: 6:30 PM – 8:30 PM',
  closedDay: 'Sunday'
};

export const CHATBOT_RULES: ChatbotRule[] = [
  // Quick-reply rules (shown as chips)
  {
    keywords: ['timing', 'timings', 'hours', 'open', 'when', 'schedule', 'time', 'close', 'closed', 'sunday'],
    answer: `Clinic timings: Monday – Saturday, 6:30 PM – 8:30 PM.\nSunday: Closed.`,
    quickLabel: 'Clinic Timings',
    action: 'scroll-to-clinic',
    category: 'timings'
  },
  {
    keywords: ['fee', 'fees', 'cost', 'charge', 'price', 'payment', 'pay', 'upi', 'cash', 'card'],
    answer: `First Visit: ₹500\nFollow-up (within 15 days): ₹300\nPayment: UPI · Card · Cash`,
    quickLabel: 'Fees',
    action: 'scroll-to-fees',
    category: 'fees'
  },
  {
    keywords: ['book', 'appointment', 'schedule visit', 'slot', 'booking'],
    answer: `You can book an appointment through the form on this page or message us on WhatsApp.\n\nSteps:\n1. Submit the online form or send a WhatsApp message.\n2. Receive confirmation & available slot.\n3. Complete payment (if tele-consult).`,
    quickLabel: 'Book Appointment',
    action: 'scroll-to-appointment',
    category: 'appointment'
  },
  {
    keywords: ['location', 'address', 'direction', 'directions', 'where', 'map', 'reach', 'patia', 'landmark'],
    answer: `181, 1st Floor, Kananshree Villa, Patia, Bhubaneswar\nLandmark: Near Punjab National Bank`,
    quickLabel: 'Location',
    action: 'scroll-to-clinic',
    category: 'location'
  },
  {
    keywords: ['service', 'services', 'speciality', 'specialities', 'offer', 'provide', 'treat'],
    answer: `Our specialities include:\n• Adult Internal Medicine consultation\n• Diabetes, hypertension & cholesterol management\n• Fever, infections & respiratory illness\n• Post-ICU / post-hospitalisation recovery\n• Cardiac risk & preventive counselling\n• Adult vaccination counselling\n• Lifestyle & diet modification\n• All blood tests available`,
    quickLabel: 'Services',
    action: 'scroll-to-services',
    category: 'services'
  },
  {
    keywords: ['contact', 'phone', 'call', 'whatsapp', 'number', 'reach'],
    answer: `Call / WhatsApp: +91 9338497282 / +91 9437260194\nFor emergencies, please visit the nearest emergency department.`,
    quickLabel: 'Contact',
    action: 'scroll-to-contact',
    category: 'contact'
  },

  // Non-quick-reply rules (matched by keyword only)
  {
    keywords: ['tele', 'teleconsult', 'teleconsultation', 'online', 'video', 'virtual'],
    answer: `Yes, tele-consultation is available for follow-ups and non-emergency issues. Payment link will be shared after confirmation. Please ensure a stable internet connection.`,
    category: 'teleconsult'
  },
  {
    keywords: ['diabetes', 'sugar', 'blood sugar', 'diabetic'],
    answer: `Yes, we manage diabetes and blood sugar disorders. Dr. Routray provides optimised treatment plans with lifestyle integration.`,
    action: 'scroll-to-services',
    category: 'conditions'
  },
  {
    keywords: ['hypertension', 'bp', 'blood pressure', 'high pressure'],
    answer: `Yes, hypertension management is one of our core services, including medication optimisation and preventive counselling.`,
    action: 'scroll-to-services',
    category: 'conditions'
  },
  {
    keywords: ['fever', 'infection', 'cold', 'cough', 'flu', 'respiratory', 'asthma', 'pneumonia', 'breathless'],
    answer: `We evaluate and treat fever, infections, and respiratory illnesses including asthma, pneumonia, and breathlessness.`,
    category: 'conditions'
  },
  {
    keywords: ['cardiac', 'heart', 'chest pain', 'palpitation'],
    answer: `We assess cardiac symptoms including chest pain and palpitations, and provide risk evaluation and preventive counselling.`,
    category: 'conditions'
  },
  {
    keywords: ['vaccine', 'vaccination', 'immunisation', 'immunization'],
    answer: `We offer evidence-based adult vaccination counselling. Please carry your previous vaccination records if available.`,
    category: 'services'
  },
  {
    keywords: ['icu', 'post-icu', 'hospital', 'discharge', 'recovery', 'post-operative'],
    answer: `We provide post-ICU follow-up, medication optimisation, and holistic recovery guidance after hospitalisation.`,
    category: 'conditions'
  },
  {
    keywords: ['bring', 'carry', 'prepare', 'preparation', 'document', 'report', 'prescription'],
    answer: `Please bring:\n• Previous prescriptions\n• Recent blood test / scan reports\n• List of current medications\n• Any discharge summary from past hospital visits`,
    action: 'scroll-to-fees',
    category: 'preparation'
  },
  {
    keywords: ['walk-in', 'walkin', 'walk in', 'without appointment'],
    answer: `Walk-ins are allowed but subject to availability. Appointments are recommended to ensure a smooth visit.`,
    category: 'faq'
  },
  {
    keywords: ['reschedule', 'cancel', 'change appointment'],
    answer: `To reschedule, please notify us at least 3 hours before the scheduled time via WhatsApp or call.`,
    category: 'faq'
  },
  {
    keywords: ['second opinion'],
    answer: `Yes, you can get a second opinion here. Please bring all relevant medical reports for review.`,
    category: 'faq'
  },
  {
    keywords: ['family', 'attendant', 'accompany'],
    answer: `Yes, one attendant may accompany the patient during consultation.`,
    category: 'faq'
  },
  {
    keywords: ['qualification', 'degree', 'education', 'doctor', 'experience', 'about'],
    answer: `Dr. Pragyan Kumar Routray\nMBBS – SCB Medical College, Cuttack\nMD (Medicine) – SCB Medical College\nDiploma in Critical Care – Apollo Hospitals, Chennai\nEuropean Diploma in Intensive Care (EDIC)\nAHA-Certified ACLS & BLS Instructor\n\n20+ years of clinical experience.`,
    category: 'about'
  },
  {
    keywords: ['emergency', 'urgent', 'accident', 'ambulance', 'serious'],
    answer: `⚠️ This clinic is NOT equipped for emergencies.\nFor urgent or life-threatening conditions, please proceed to the nearest emergency department or CARE Hospitals directly.`,
    category: 'emergency'
  },
  {
    keywords: ['blood test', 'lab', 'laboratory', 'test'],
    answer: `Yes, all blood tests are available at the clinic through trusted laboratory partners.`,
    category: 'services'
  },
  {
    keywords: ['language', 'odia', 'hindi', 'english'],
    answer: `Dr. Routray speaks Odia, English, and Hindi.`,
    category: 'about'
  },
  {
    keywords: ['care hospital', 'care hospitals'],
    answer: `Dr. Routray also consults at CARE Hospitals, Bhubaneswar, alongside running Shree Radha Clinic.`,
    category: 'about'
  }
];

export const GREETING_MESSAGE = `Hello! 👋 I'm the Shree Radha Clinic assistant. How can I help you today?`;
export const FALLBACK_MESSAGE = `I'm sorry, I couldn't find an answer to that. Would you like to message us on WhatsApp for personalised assistance?`;
