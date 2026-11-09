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
  // Attribute copy (tooltips, aria labels) rendered outside text nodes.
  'Toggle navigation menu': 'নেভিগেশন মেনু খুলুন',
  'Volunteer & Donor Portal': 'স্বেচ্ছাসেবক ও দাতা পোর্টাল',
  'Select currency': 'মুদ্রা নির্বাচন করুন',
};

export default bn;
