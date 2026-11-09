import part1 from './bn-1';
import part2 from './bn-2';
import part3 from './bn-3';
import part4 from './bn-4';

/**
 * English → Bengali phrase dictionary used by the language switch.
 * Every visible string on the site lives in one of these batches.
 */
const bn: Record<string, string> = {
  ...part1,
  ...part2,
  ...part3,
  ...part4,
  'Field Gallery': 'ফিল্ড গ্যালারি',
  Gallery: 'গ্যালারি',
  // Attribute copy (tooltips, aria labels) rendered outside text nodes.
  'Toggle navigation menu': 'নেভিগেশন মেনু খুলুন',
  'Volunteer & Donor Portal': 'স্বেচ্ছাসেবক ও দাতা পোর্টাল',
  'Select currency': 'মুদ্রা নির্বাচন করুন',
  'Read Full Campaign Details': 'সম্পূর্ণ ক্যাম্পেইন বিবরণ দেখুন',
  'Project Alo: Pediatric Surgery': 'প্রজেক্ট আলো: শিশু অস্ত্রোপচার',
  'Clean Water & Deep Tube Wells': 'বিশুদ্ধ পানি ও গভীর নলকূপ',
  'Project Sheetolota: Winter Blanket & Warmth':
    'প্রজেক্ট শীতলতা: শীতের কম্বল ও উষ্ণতা',
  'Pediatric Emergency Hospital Care': 'জরুরি শিশু হাসপাতাল সেবা',
  'Inclusive Special Children Support': 'বিশেষ চাহিদাসম্পন্ন শিশুদের সহায়তা',
  // Form placeholders.
  Amount: 'পরিমাণ',
  'Subscribed!': 'সাবস্ক্রাইব সম্পন্ন!',
  Subscribe: 'সাবস্ক্রাইব করুন',
  Preferred: 'পছন্দনীয়',
  'Silver Nisab (BDT)': 'রুপ্যের নিসাব (BDT)',
  'Silver Nisab (GBP)': 'রুপ্যের নিসাব (GBP)',
  'Email / Phone': 'ইমেইল / ফোন',
  'Enter amount': 'পরিমাণ লিখুন',
  'Enter your email or phone...': 'আপনার ইমেইল বা ফোন লিখুন...',
  'Full Name (Optional)': 'পূর্ণ নাম (ঐচ্ছিক)',
  'Your email address...': 'আপনার ইমেইল ঠিকানা...',
  'e.g., Tariqul Islam': 'যেমন: তারিকুল ইসলাম',
  'e.g., 3rd-year Medical Student at DMC, fluent in Bangla/English, Red Crescent First Aid certified...':
    'যেমন: ডিএমসি-র তৃতীয় বর্ষের মেডিকেল শিক্ষার্থী, বাংলা/ইংরেজিতে সাবলীল, রেড ক্রিসেন্ট প্রাথমিক চিকিৎসা সনদপ্রাপ্ত...',
  'Search appeals (e.g., street food, eye surgery, tube well)...':
    'আবেদন খুঁজুন (যেমন: পথখাবার, চোখের অপারেশন, নলকূপ)...',
  // Calculator states that only exist after the visitor types an amount.
  'Nisab Reached (Zakat Obligatory)': 'নিসাব পূর্ণ (যাকাত ফরজ)',
  'Below Nisab ($581.75) — Optional Sadaqah':
    'নিসাবের নিচে ($581.75) — ঐচ্ছিক সদকা',
  'Designated as 100% Shariah Zakat.': '100% শরিয়াহ যাকাত হিসেবে নির্ধারিত।',
  'Sadaqah Relief Fund.': 'সদকা ত্রাণ তহবিল।',
  // Native confirmation dialogs (the DOM bridge cannot reach these).
  'All verified financial and Shariah audits for FY2023-2024 are available for public inspection. Please contact governance@gmcf-global.org or download the official PDF pack.':
    'FY2023-2024 সালের সব যাচাইকৃত আর্থিক ও শরিয়াহ নিরীক্ষা জনসাধারণের পরিদর্শনের জন্য খোলা। অনুগ্রহ করে governance@gmcf-global.org-এ যোগাযোগ করুন অথবা অফিসিয়াল PDF প্যাক ডাউনলোড করুন।',
  'Your net zakatable wealth is below the Nisab threshold ($520 USD) or currently zero.':
    'আপনার নিট যাকাতযোগ্য সম্পদ নিসাব সীমার ($520 USD) নিচে অথবা বর্তমানে শূন্য।',
  'Thank you! Your volunteer application has been received. Our team will reach out shortly.':
    'জাযাকাল্লাহু খাইরান! আপনার স্বেচ্ছাসেবক আবেদন পাওয়া গেছে। আমাদের দল শীঘ্রই যোগাযোগ করবে।',
  'Downloading the 2024 GMCF Annual Financial & Impact Report (PDF)...':
    '2024 GMCF বার্ষিক আর্থিক ও প্রভাব প্রতিবেদন (PDF) ডাউনলোড হচ্ছে...',
  'Thank you! Redirecting to the secure Tamleek-certified checkout gateway with zero administrative deductions.':
    'জাযাকাল্লাহু খাইরান! শূন্য প্রশাসনিক কাটতিসহ নিরাপদ তামলিক-সনদপ্রাপ্ত চেকআউট গেটওয়েতে নিয়ে যাওয়া হচ্ছে।',
  'Your current net wealth is below the Nisab threshold. You can still contribute voluntary Sadaqah.':
    'আপনার বর্তমান নিট সম্পদ নিসাব সীমার নিচে। আপনি এখনো ঐচ্ছিক সদকা দিতে পারেন।',
  // Browser tab titles (localised in place by the language bridge).
  'Global Muslim Charitable Foundation | Empowering Lives Through Faith & Stewardship':
    'গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন | বিশ্বাস ও তত্ত্বাবধানে জীবনের ক্ষমতায়ন',
  'About Us & Shariah Governance | Global Muslim Charitable Foundation':
    'আমাদের সম্পর্কে ও শরিয়াহ সুশাসন | গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন',
  'Active Appeals & Causes | Global Muslim Charitable Foundation':
    'সক্রিয় আবেদন ও প্রকল্প | গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন',
  'One Meal One Hope (Street Food Aid) | GMCF Appeal':
    'এক বেলা এক আশা (পথখাবার সহায়তা) | GMCF আবেদন',
  'Impact & Case Studies | Global Muslim Charitable Foundation':
    'প্রভাব ও কেস স্টাডি | গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন',
  'Youth Volunteers Field Portal | Global Muslim Charitable Foundation':
    'যুব স্বেচ্ছাসেবক ফিল্ড পোর্টাল | গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন',
  'Zakat Fund & Shariah Calculator | Global Muslim Charitable Foundation':
    'যাকাত তহবিল ও শরিয়াহ ক্যালকুলেটর | গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন',
  'Page Not Found (404) | Global Muslim Charitable Foundation':
    'পেজ পাওয়া যায়নি (404) | গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন',
};

export default bn;
