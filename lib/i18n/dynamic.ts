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
];
