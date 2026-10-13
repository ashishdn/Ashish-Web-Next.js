export const landlords = [
  {
    id: 'landlord-001',
    name: {
      bn: 'মো. রফিকুল ইসলাম',
      en: 'Md. Rafiqul Islam',
    },
    role: {
      bn: 'বাড়িওয়ালা (অবসরপ্রাপ্ত সরকারি কর্মকর্তা)',
      en: 'Property Owner (Retd. Govt. Officer)',
    },
    phone: '+880 1711-456789 (ডেমো)',
    email: 'rafiqul.demo@bachelorbari.local',
    memberSince: '2024',
    responseTime: {
      bn: '৩০ মিনিটের মধ্যে উত্তর দেন',
      en: 'Replies within 30 minutes',
    },
    preferredContact: 'call',
  },
  {
    id: 'landlord-002',
    name: {
      bn: 'ইঞ্জি. মোস্তাফিজুর রহমান',
      en: 'Engr. Mostafizur Rahman',
    },
    role: {
      bn: 'ফ্ল্যাট মালিক ও সিভিল ইঞ্জিনিয়ার',
      en: 'Flat Owner & Civil Engineer',
    },
    phone: '+880 1819-334455 (ডেমো)',
    email: 'mostafiz.demo@bachelorbari.local',
    memberSince: '2024',
    responseTime: {
      bn: '১ ঘণ্টার মধ্যে উত্তর দেন',
      en: 'Replies within 1 hour',
    },
    preferredContact: 'whatsapp',
  },
  {
    id: 'landlord-003',
    name: {
      bn: 'বেগম সেলিনা আখতার',
      en: 'Begum Selina Akhter',
    },
    role: {
      bn: 'বাড়িওয়ালী (মহিলা হোস্টেল ও মেস তত্ত্বাবধায়ক)',
      en: 'House Owner & Hostel Manager',
    },
    phone: '+880 1912-778899 (ডেমো)',
    email: 'selina.demo@bachelorbari.local',
    memberSince: '2023',
    responseTime: {
      bn: '১৫ মিনিটের মধ্যে উত্তর দেন',
      en: 'Replies within 15 minutes',
    },
    preferredContact: 'call',
  },
  {
    id: 'landlord-004',
    name: {
      bn: 'অধ্যাপক মো. আসাদুজ্জামান',
      en: 'Prof. Md. Asaduzzaman',
    },
    role: {
      bn: 'বাড়িওয়ালা ও শিক্ষক, রাজশাহী',
      en: 'Property Owner & Teacher, Rajshahi',
    },
    phone: '+880 1715-998877 (ডেমো)',
    email: 'asad.demo@bachelorbari.local',
    memberSince: '2023',
    responseTime: {
      bn: '১ ঘণ্টার মধ্যে উত্তর দেন',
      en: 'Replies within 1 hour',
    },
    preferredContact: 'call',
  },
  {
    id: 'landlord-005',
    name: {
      bn: 'তানভীর আহমেদ',
      en: 'Tanveer Ahmed',
    },
    role: {
      bn: 'ফ্ল্যাট কেয়ারটেকার ও ম্যানেজার',
      en: 'Property Manager & Caretaker',
    },
    phone: '+880 1622-443322 (ডেমো)',
    email: 'tanveer.demo@bachelorbari.local',
    memberSince: '2025',
    responseTime: {
      bn: 'তাৎক্ষণিক উত্তর দেন',
      en: 'Replies instantly',
    },
    preferredContact: 'whatsapp',
  },
];

export function getLandlordById(id) {
  return landlords.find((l) => l.id === id) || landlords[0];
}
