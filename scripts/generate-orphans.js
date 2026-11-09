const fs = require('fs');
const path = require('path');

const banglaNameMap = {
  'Abdul Hakim': 'আব্দুল হাকিম',
  'Abdullah Fahad': 'আব্দুল্লাহ ফাহাদ',
  'Abdullah': 'আব্দুল্লাহ',
  'Abdur Rahim': 'আব্দুর রহিম',
  'Abdur Rahman': 'আব্দুর রহমান',
  'Abu Bakar': 'আবু বকর',
  'Abu Hanif': 'আবু হানিফ',
  'Abu Talha': 'আবু তালহা',
  'Al-Amin': 'আল-আমিন',
  'Ariana': 'আরিয়ানা',
  'Arifa': 'আরিফা',
  'Asiya': 'আসিয়া',
  'Baizid': 'বায়জিদ',
  'Easin': 'ইয়াসিন',
  'Fatima': 'ফাতিমা',
  'Hafsa': 'হাফসা',
  'Hasan Mahmud': 'হাসান মাহমুদ',
  'Hasan': 'হাসান',
  'Hasibul': 'হাসিবুল',
  'Hussain': 'হোসাইন',
  'Hussan H': 'হাসান এইচ.',
  'Hussan Mohammad': 'হাসান মোহাম্মদ',
  'Ismail': 'ইসমাইল',
  'Ismat Jahan': 'ইসমত জাহান',
  'Jihad Sarif': 'জিহাদ শরীফ',
  'Jobayer': 'জোবায়ের',
  'Junaid': 'জুনায়েদ',
  'Mahedi': 'মেহেদী',
  'Mahfuz': 'মাহফুজ',
  'Maryam': 'মরিয়ম',
  'Md Abu Bakar': 'মোঃ আবু বকর',
  'Naim': 'নাঈম',
  'Naimudiin': 'নাঈমুদ্দীন',
  'Rafi': 'রাফি',
  'Rafiul': 'রাফিউল',
  'Saiful': 'সাইফুল',
  'Saima': 'সাইমা',
  'Sakil': 'শাকিল',
  'Samsul Islam': 'শামসুল ইসলাম',
  'Shuvo Alam': 'শুভ আলম',
  'Sohag': 'সোহাগ',
  'Sumon': 'সুমন',
  'Tawhid': 'তাওহীদ',
  'Zunaid': 'জুনায়েদ'
};

const femaleNames = new Set(['Ariana', 'Arifa', 'Asiya', 'Fatima', 'Hafsa', 'Ismat Jahan', 'Maryam', 'Saima']);

const text = fs.readFileSync('public/images/orphans/extracted-text.txt', 'utf8');
const chunks = text.split(/(?=Name:\s*)/i).filter(c => c.trim().startsWith('Name:'));
const images = fs.readdirSync('public/images/orphans').filter(f => f.endsWith('.jpg'));

function clean(str) {
  return str ? str.replace(/\s+/g, ' ').replace(/\u2011/g, '-').trim() : '';
}

function normalizeName(str) {
  return str.toLowerCase().replace(/[^a-z]/g, '');
}

const list = [];

chunks.forEach((c, idx) => {
  const nameM = c.match(/Name:\s*([\s\S]*?)\s*Age:/i);
  const ageM = c.match(/Age:\s*(\d+)/i);
  const classM = c.match(/Class Enrollment:\s*([\s\S]*?)\s*Family Details:/i);
  const familyM = c.match(/Family Details:\s*([\s\S]*?)\s*Family Status:/i);
  const statusM = c.match(/Family Status:\s*([\s\S]*?)\s*Student Background/i);
  const bgM = c.match(/Student Background\s*([\s\S]*?)$/i);

  let rawName = nameM ? clean(nameM[1]) : '';
  if (rawName.replace(/\s+/g, '') === 'AbdurRahman') rawName = 'Abdur Rahman';
  if (rawName.replace(/\s+/g, '') === 'AbuBakar') rawName = 'Abu Bakar';
  if (rawName.replace(/\s+/g, '') === 'AbuHanif') rawName = 'Abu Hanif';
  if (rawName.replace(/\s+/g, '') === 'AbuTalha') rawName = 'Abu Talha';

  const age = ageM ? parseInt(ageM[1]) : 10;
  const classEnrollment = classM ? clean(classM[1]) : 'Hifz Program';
  const familyDetails = familyM ? clean(familyM[1]) : '';
  const background = bgM ? clean(bgM[1]) : '';

  const juzM = background.match(/(\d+)\s*Juz/i);
  const juzCount = juzM ? juzM[1] : '';

  let locEn = 'Savar, Dhaka';
  if (/Maymansing|Mymensingh/i.test(background)) locEn = 'Mymensingh';
  else if (/Bagerhat/i.test(background)) locEn = 'Bagerhat';
  else if (/Kishoreganj/i.test(background)) locEn = 'Kishoreganj';
  else if (/Barisal/i.test(background)) locEn = 'Barisal';
  else if (/Kurigram/i.test(background)) locEn = 'Kurigram';
  else if (/Gaibandha/i.test(background)) locEn = 'Gaibandha';
  else if (/Sunamganj/i.test(background)) locEn = 'Sunamganj';
  else if (/Sirajganj/i.test(background)) locEn = 'Sirajganj';
  else if (/Rangpur/i.test(background)) locEn = 'Rangpur';
  else if (/Bogura|Bogra/i.test(background)) locEn = 'Bogura';
  else if (/Jamalpur/i.test(background)) locEn = 'Jamalpur';
  else if (/Netrokona/i.test(background)) locEn = 'Netrokona';
  else if (/Tangail/i.test(background)) locEn = 'Tangail';
  else if (/Noakhali/i.test(background)) locEn = 'Noakhali';

  const locBnMap = {
    'Savar, Dhaka': 'সাভার, ঢাকা',
    'Mymensingh': 'ময়মনসিংহ',
    'Bagerhat': 'বাগেরহাট',
    'Kishoreganj': 'কিশোরগঞ্জ',
    'Barisal': 'বরিশাল',
    'Kurigram': 'কুড়িগ্রাম',
    'Gaibandha': 'গাইবান্ধা',
    'Sunamganj': 'সুনামগঞ্জ',
    'Sirajganj': 'সিরাজগঞ্জ',
    'Rangpur': 'রংপুর',
    'Bogura': 'বগুড়া',
    'Jamalpur': 'জামালপুর',
    'Netrokona': 'নেত্রকোণা',
    'Tangail': 'টাঙ্গাইল',
    'Noakhali': 'নোয়াখালী'
  };

  const normName = normalizeName(rawName);
  let matchedImg = images.find(img => normalizeName(img.replace(/\.jpg$/i, '')) === normName);
  if (!matchedImg) {
    matchedImg = images.find(img => {
      const n = normalizeName(img.replace(/\.jpg$/i, ''));
      return normName.includes(n) || n.includes(normName);
    });
  }

  const nameBn = banglaNameMap[rawName] || rawName;
  const isGirl = femaleNames.has(rawName);

  const dreamEn = juzCount 
    ? 'Memorized ' + juzCount + ' Juz; dreams of becoming an Islamic scholar & teacher'
    : 'Dreams of completing Quran Tahfeez & serving impoverished communities';
  const dreamBn = juzCount
    ? 'ইতোমধ্যে ' + juzCount + ' পারা হিফজ সম্পন্ন; পূর্ণাঙ্গ হাফেজ ও শিক্ষক হতে চায়'
    : 'কুরআন হিফজ সম্পন্ন করে দ্বীনি শিক্ষক ও সেবাধর্মী কাজে নিজেকে নিয়োজিত করতে চায়';

  const storyEn = rawName + ' comes from an underprivileged family in ' + locEn + '. ' + familyDetails + ' Needs urgent educational & residential sponsorship.';
  const storyBn = nameBn + ' ' + (locBnMap[locEn] || locEn) + '-এর এক অতি দরিদ্র পরিবারের সন্তান। ' + (familyDetails ? 'পিতা দিনমজুর/শ্রমিক হওয়ায় মৌলিক শিক্ষা ও ভরণপোষণ চালানো অসম্ভব।' : '') + ' তার হিফজ ও ভবিষ্যৎ গড়তে আপনার পৃষ্ঠপোষকতা প্রয়োজন।';

  list.push({
    id: 'GMCF-ORP-' + String(idx + 1).padStart(2, '0'),
    nameEn: rawName,
    nameBn,
    age,
    gender: isGirl ? 'girl' : 'boy',
    classEn: classEnrollment,
    classBn: classEnrollment === 'Hifz Program' ? 'হিফজ বিভাগ' : 'নাজেরা / প্রি-হিফজ বিভাগ',
    locationEn: locEn,
    locationBn: locBnMap[locEn] || locEn,
    dreamEn,
    dreamBn,
    storyEn,
    storyBn,
    image: '/images/orphans/' + (matchedImg || 'Abdul-Hakim.jpg'),
    statusEn: 'Needs Immediate Sponsor',
    statusBn: 'জরুরি স্পনসর প্রয়োজন'
  });
});

const tsCode = `export type OrphanProfile = {
  id: string;
  nameEn: string;
  nameBn: string;
  age: number;
  gender: 'boy' | 'girl';
  classEn: string;
  classBn: string;
  locationEn: string;
  locationBn: string;
  dreamEn: string;
  dreamBn: string;
  storyEn: string;
  storyBn: string;
  image: string;
  statusEn: string;
  statusBn: string;
};

export const ORPHAN_PROFILES: OrphanProfile[] = ` + JSON.stringify(list, null, 2) + `;\n`;

fs.writeFileSync('lib/data/orphans.ts', tsCode, 'utf8');
console.log('Successfully written lib/data/orphans.ts with', list.length, 'students!');

