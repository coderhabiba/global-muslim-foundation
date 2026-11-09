/**
 * Bengali phrasing for strings that React builds at runtime (so they never
 * appear verbatim in the server-rendered HTML and cannot live in the static
 * phrase dictionary). Rules run before the money formatter.
 */
export const DYNAMIC_RULES: ReadonlyArray<readonly [RegExp, string]> = [
  [
    /^Sponsor (\d+) Meals\/month \((.+)\)$/,
    'প্রতি মাসে $1টি খাবার স্পনসর করুন ($2)',
  ],
  [/^Sponsor (\d+) Meals Now \((.+)\)$/, 'এখনই $1টি খাবার স্পনসর করুন ($2)'],
  [
    /^✨ Your (.+) will directly serve (\d+) nutritious warm meal sets\.$/,
    '✨ আপনার $1 সরাসরি $2 সেট পুষ্টিকর গরম খাবারে পৌঁছে যাবে।',
  ],
  [/^(.+) of (.+) raised$/, '$2-এর মধ্যে $1 তহবিল সংগ্রহ হয়েছে'],
  // Native dialogs whose only variable part is an amount.
  [
    /^Thank you for your generous pledge of (\$[\d.,]+)! Redirecting to 256-bit encrypted checkout\.\.\.$/,
    'আপনার উদার অঙ্গীকারের জন্য জাযাকাল্লাহু খাইরান! $1 — 256-বিট এনক্রিপ্টেড চেকআউটে নিয়ে যাওয়া হচ্ছে...',
  ],
  [
    /^Your calculated Zakat of (\$[\d.,]+) has been transferred to your donation tray\.$/,
    'আপনার হিসাবকৃত যাকাত $1 আপনার অনুদান ট্রেতে স্থানান্তরিত হয়েছে।',
  ],
  [
    /^JazakAllah Khair! Initiating secure checkout for (\$[\d.,]+) USD \(monthly recurring\)\. Designated as 100% Shariah Zakat\. Redirecting to bank gateway\.\.\.$/,
    'জাযাকাল্লাহু খাইরান! $1 USD-এর মাসিক পুনরাবৃত্ত অনুদানের নিরাপদ চেকআউট শুরু হচ্ছে। 100% শরিয়াহ যাকাত হিসেবে নির্ধারিত। ব্যাংক গেটওয়েতে নিয়ে যাওয়া হচ্ছে...',
  ],
  [
    /^JazakAllah Khair! Initiating secure checkout for (\$[\d.,]+) USD \(one-time\)\. Designated as 100% Shariah Zakat\. Redirecting to bank gateway\.\.\.$/,
    'জাযাকাল্লাহু খাইরান! $1 USD এককালীন অনুদানের নিরাপদ চেকআউট শুরু হচ্ছে। 100% শরিয়াহ যাকাত হিসেবে নির্ধারিত। ব্যাংক গেটওয়েতে নিয়ে যাওয়া হচ্ছে...',
  ],
  [
    /^JazakAllah Khair! Initiating secure checkout for (\$[\d.,]+) USD \(monthly recurring\)\. Sadaqah Relief Fund\. Redirecting to bank gateway\.\.\.$/,
    'জাযাকাল্লাহু খাইরান! $1 USD-এর মাসিক পুনরাবৃত্ত অনুদানের নিরাপদ চেকআউট শুরু হচ্ছে। সদকা ত্রাণ তহবিল। ব্যাংক গেটওয়েতে নিয়ে যাওয়া হচ্ছে...',
  ],
  [
    /^JazakAllah Khair! Initiating secure checkout for (\$[\d.,]+) USD \(one-time\)\. Sadaqah Relief Fund\. Redirecting to bank gateway\.\.\.$/,
    'জাযাকাল্লাহু খাইরান! $1 USD এককালীন অনুদানের নিরাপদ চেকআউট শুরু হচ্ছে। সদকা ত্রাণ তহবিল। ব্যাংক গেটওয়েতে নিয়ে যাওয়া হচ্ছে...',
  ],
];
