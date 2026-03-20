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
    keywords: ['who are you', 'what are you', 'your name', 'which bot', 'chatbot', 'are you a bot', 'are you human', 'are you real'],
    answer: `I'm the Shree Radha Clinic virtual assistant 🤖. I can help you with clinic timings, booking appointments, fees, services, directions, and other common questions. For anything else, you can reach us on WhatsApp!`,
    category: 'identity'
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon', 'howdy', 'namaste', 'namaskar'],
    answer: `Hello! 👋 Welcome to Shree Radha Clinic. How can I help you today? You can ask about timings, fees, services, appointments, or anything else!`,
    category: 'greeting'
  },
  {
    keywords: ['thank', 'thanks', 'thank you', 'thankyou', 'dhanyabad', 'dhanyavaad'],
    answer: `You're welcome! 😊 Feel free to ask if you need anything else. Wishing you good health!`,
    category: 'thanks'
  },
  {
    keywords: ['bye', 'goodbye', 'good bye', 'see you', 'take care', 'tata'],
    answer: `Goodbye! 👋 Take care and stay healthy. We're here whenever you need us!`,
    category: 'bye'
  },
  {
    keywords: ['help', 'what can you do', 'how can you help', 'options', 'menu', 'what do you know', 'assist'],
    answer: `I can help you with:\n• 🕐 Clinic timings & schedule\n• 💰 Consultation fees\n• 📋 Services & specialities\n• 📍 Clinic location & directions\n• 📅 Booking appointments\n• 👨‍⚕️ About the doctor\n• 💊 Conditions we treat\n• 📞 Contact details\n\nJust type your question or tap a quick reply below!`,
    category: 'help'
  },
  {
    keywords: ['how are you', 'how r u', 'hows it going', 'how do you do', 'whats up', 'wassup', 'sup'],
    answer: `I'm doing great, thank you for asking! 😊 How can I assist you today?`,
    category: 'greeting'
  },
  {
    keywords: ['insurance', 'cashless', 'mediclaim', 'claim', 'health insurance', 'covered'],
    answer: `Currently, we accept direct payment (Cash, UPI, Card). For insurance claims, you may submit the consultation receipt to your insurer for reimbursement. Please check with your insurance provider for coverage details.`,
    category: 'fees'
  },
  {
    keywords: ['parking', 'park', 'bike', 'car parking', 'two wheeler'],
    answer: `Yes, parking space is available near the clinic building for both two-wheelers and cars.`,
    category: 'location'
  },
  {
    keywords: ['age', 'child', 'children', 'kid', 'kids', 'paediatric', 'pediatric', 'baby', 'infant'],
    answer: `Shree Radha Clinic specialises in adult internal medicine. For children (paediatric patients), we recommend consulting a paediatrician. We can help refer you if needed.`,
    category: 'faq'
  },
  {
    keywords: ['covid', 'corona', 'rt-pcr', 'rtpcr', 'rapid test', 'corona test'],
    answer: `We can evaluate COVID symptoms and provide consultation. RT-PCR and rapid tests can be arranged through our lab partners. Please wear a mask during your visit.`,
    category: 'conditions'
  },
  {
    keywords: ['diet', 'nutrition', 'food', 'weight', 'obesity', 'overweight', 'bmi'],
    answer: `Yes, Dr. Routray provides lifestyle and diet modification counselling as part of holistic care, including weight management and nutrition guidance.`,
    action: 'scroll-to-services',
    category: 'services'
  },
  {
    keywords: ['thyroid', 'hypothyroid', 'hyperthyroid'],
    answer: `Yes, we diagnose and manage thyroid disorders including hypothyroidism and hyperthyroidism with regular monitoring and medication optimisation.`,
    category: 'conditions'
  },
  {
    keywords: ['kidney', 'renal', 'creatinine', 'urine'],
    answer: `We evaluate kidney function, manage early kidney disease, and provide referrals to nephrologists when needed. Blood and urine tests are available.`,
    category: 'conditions'
  },
  {
    keywords: ['liver', 'jaundice', 'hepatitis', 'fatty liver'],
    answer: `We assess and manage liver conditions including fatty liver, jaundice, and hepatitis with appropriate investigations and treatment plans.`,
    category: 'conditions'
  },
  {
    keywords: ['headache', 'migraine', 'dizziness', 'vertigo', 'giddiness'],
    answer: `We evaluate and treat headaches, migraines, dizziness, and vertigo. Persistent symptoms may need further investigation which we can arrange.`,
    category: 'conditions'
  },
  {
    keywords: ['joint', 'arthritis', 'joint pain', 'body pain', 'muscle pain', 'back pain'],
    answer: `We can evaluate joint pain, body aches, and arthritis symptoms. Treatment includes medication and lifestyle advice, with referral to a specialist if needed.`,
    category: 'conditions'
  },
  {
    keywords: ['anxiety', 'stress', 'depression', 'sleep', 'insomnia', 'mental health', 'tension'],
    answer: `We provide initial assessment for stress, anxiety, sleep issues, and general mental health concerns. Specialised psychiatric referral can be arranged if needed.`,
    category: 'conditions'
  },
  {
    keywords: ['gastric', 'acidity', 'stomach', 'digestion', 'ulcer', 'ibs', 'constipation', 'bloating', 'gas'],
    answer: `We treat digestive issues including acidity, gastritis, IBS, constipation, and bloating with medication and dietary guidance.`,
    category: 'conditions'
  },
  {
    keywords: ['allergy', 'skin', 'rash', 'itching', 'urticaria'],
    answer: `We can evaluate and treat common allergies and skin reactions. For persistent dermatological conditions, we may refer to a dermatologist.`,
    category: 'conditions'
  },
  {
    keywords: ['website', 'site', 'app', 'made by', 'developed', 'developer'],
    answer: `This website was built for Shree Radha Clinic to help patients access information and book appointments easily. For website-related queries, please contact us on WhatsApp.`,
    category: 'meta'
  },
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
export const FALLBACK_MESSAGE = `I'm not sure about that one. Here are some things I can help with:\n• Clinic timings & schedule\n• Consultation fees\n• Booking appointments\n• Services & conditions treated\n• Doctor information\n• Clinic location\n\nOr you can message us on WhatsApp for personalised assistance! 💬`;
