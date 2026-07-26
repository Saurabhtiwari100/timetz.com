export type RelatedLink = {
  href: string;
  label: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type ConversionTableTarget = {
  label: string;
  offsetMinutes: number;
};

export type ConverterSeoPage = {
  kind: 'converter';
  slug: string;
  navLabel: string;
  sourceCity: string;
  targetCities: string[];
  h1: string;
  intro: string;
  title: string;
  description: string;
  tableSourceLabel: string;
  tableTargets: ConversionTableTarget[];
  tableNote: string;
  dstNotes: string[];
  meetingWindow: string;
  faq: FaqItem[];
  related: RelatedLink[];
};

export type GuideSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type GuideSeoPage = {
  kind: 'guide';
  slug: string;
  navLabel: string;
  h1: string;
  intro: string;
  title: string;
  description: string;
  defaultCities: string[];
  keyTakeaways: string[];
  sections: GuideSection[];
  faq: FaqItem[];
  related: RelatedLink[];
};

export type SeoPage = ConverterSeoPage | GuideSeoPage;

const coreRelated = [
  { href: '/utc-to-ist', label: 'UTC to IST' },
  { href: '/ist-to-est', label: 'IST to EST' },
  { href: '/pst-to-ist', label: 'PST to IST' },
  { href: '/india-to-usa-time', label: 'India to USA time' },
  { href: '/new-york-to-london', label: 'New York to London' },
  { href: '/london-to-mumbai', label: 'London to Mumbai' },
];

export const converterPages: ConverterSeoPage[] = [
  {
    kind: 'converter',
    slug: 'ist-to-est',
    navLabel: 'IST to EST',
    sourceCity: 'Mumbai',
    targetCities: ['New York'],
    h1: 'IST to EST Time Converter',
    intro:
      'Convert India Standard Time (IST, UTC+5:30) to US Eastern time. Mumbai is 10 hours 30 minutes ahead of EST in winter and 9 hours 30 minutes ahead of EDT during US Daylight Saving Time.',
    title: 'IST to EST Converter - India to US Eastern Time | timetz',
    description:
      "Instantly convert IST to EST. See what time it is in New York when it is any given time in India. Handles DST automatically.",
    tableSourceLabel: 'IST',
    tableTargets: [
      { label: 'EST', offsetMinutes: -630 },
      { label: 'EDT', offsetMinutes: -570 },
    ],
    tableNote: 'Reference table from IST to Eastern Time. Use the live converter for exact dates around DST changes.',
    dstNotes: [
      'India does not observe Daylight Saving Time, so IST stays UTC+5:30 year-round.',
      'US Eastern Time is EST (UTC-5) in winter and EDT (UTC-4) during daylight saving.',
      'The India to New York offset changes by one hour when the US changes clocks.',
    ],
    meetingWindow:
      'The most practical India to US East Coast overlap is usually 6:30-8:30 PM IST, which is 8:00-10:00 AM EST or 9:00-11:00 AM EDT.',
    faq: [
      {
        q: 'How many hours ahead is IST compared to EST?',
        a: 'IST is 10 hours 30 minutes ahead of EST. During EDT, the gap is 9 hours 30 minutes.',
      },
      {
        q: 'What is 9 AM IST in EST?',
        a: '9:00 AM IST is 10:30 PM EST the previous day, or 11:30 PM EDT during US daylight saving.',
      },
      {
        q: 'Does India observe Daylight Saving Time?',
        a: 'No. India stays on IST all year, so only the US side changes the offset.',
      },
    ],
    related: [
      { href: '/est-to-ist', label: 'EST to IST' },
      { href: '/edt-to-ist', label: 'EDT to IST' },
      { href: '/india-to-usa-time', label: 'India to USA time' },
    ],
  },
  {
    kind: 'converter',
    slug: 'est-to-ist',
    navLabel: 'EST to IST',
    sourceCity: 'New York',
    targetCities: ['Mumbai'],
    h1: 'EST to IST Time Converter',
    intro:
      'Convert Eastern Standard Time (EST, UTC-5) to India Standard Time (IST, UTC+5:30). EST is 10 hours 30 minutes behind IST.',
    title: 'EST to IST Converter - Eastern Time to India Time | timetz',
    description:
      'Convert EST to IST instantly. See New York winter time in India time and plan calls across the US East Coast and India.',
    tableSourceLabel: 'EST',
    tableTargets: [{ label: 'IST', offsetMinutes: 630 }],
    tableNote: 'Reference table for EST to IST. During EDT, use the EDT to IST page or the live converter.',
    dstNotes: [
      'EST is UTC-5 and is used by many Eastern Time locations during standard time.',
      'When daylight saving is active, New York uses EDT instead of EST.',
      'India stays UTC+5:30 year-round, so the EST to IST difference is always 10 hours 30 minutes.',
    ],
    meetingWindow:
      'A good EST to India call window is 8:00-10:00 AM EST, which is 6:30-8:30 PM IST.',
    faq: [
      { q: 'What is 9 AM EST in IST?', a: '9:00 AM EST is 7:30 PM IST the same day.' },
      { q: 'What is 5 PM EST in IST?', a: '5:00 PM EST is 3:30 AM IST the next day.' },
      { q: 'Is EST the same as EDT?', a: 'No. EST is UTC-5 and EDT is UTC-4. Use the date-aware converter for exact results.' },
    ],
    related: [
      { href: '/edt-to-ist', label: 'EDT to IST' },
      { href: '/ist-to-est', label: 'IST to EST' },
      { href: '/usa-to-india-time', label: 'USA to India time' },
    ],
  },
  {
    kind: 'converter',
    slug: 'edt-to-ist',
    navLabel: 'EDT to IST',
    sourceCity: 'New York',
    targetCities: ['Mumbai'],
    h1: 'EDT to IST Time Converter',
    intro:
      'Convert Eastern Daylight Time (EDT, UTC-4) to India Standard Time (IST, UTC+5:30). EDT is 9 hours 30 minutes behind IST.',
    title: 'EDT to IST Converter - Eastern Daylight Time to India | timetz',
    description:
      'Convert EDT to IST instantly for US summer scheduling. Handles New York to India time with date-aware conversion.',
    tableSourceLabel: 'EDT',
    tableTargets: [{ label: 'IST', offsetMinutes: 570 }],
    tableNote: 'Reference table for EDT to IST. During winter, use EST to IST instead.',
    dstNotes: [
      'EDT is UTC-4 and is used during daylight saving in Eastern Time locations.',
      'India does not change clocks, so EDT is 9 hours 30 minutes behind IST.',
      'The switch between EST and EDT is why US-India meeting times shift in March and November.',
    ],
    meetingWindow:
      'A practical EDT to India meeting slot is 9:00-11:00 AM EDT, which is 6:30-8:30 PM IST.',
    faq: [
      { q: 'What is 9 AM EDT in IST?', a: '9:00 AM EDT is 6:30 PM IST the same day.' },
      { q: 'What is noon EDT in IST?', a: '12:00 PM EDT is 9:30 PM IST.' },
      { q: 'When should I use EDT instead of EST?', a: 'Use EDT for Eastern Time during US daylight saving, usually March to November.' },
    ],
    related: [
      { href: '/est-to-ist', label: 'EST to IST' },
      { href: '/ist-to-est', label: 'IST to EST' },
      { href: '/daylight-saving-time-conversion', label: 'DST conversion guide' },
    ],
  },
  {
    kind: 'converter',
    slug: 'cst-to-ist',
    navLabel: 'CST to IST',
    sourceCity: 'Chicago',
    targetCities: ['Mumbai'],
    h1: 'CST to IST Time Converter',
    intro:
      'Convert Central Standard Time (CST, UTC-6) to India Standard Time (IST, UTC+5:30). CST is 11 hours 30 minutes behind IST.',
    title: 'CST to IST Converter - Central Time to India Time | timetz',
    description:
      'Convert CST to IST instantly. Plan Chicago, Dallas, and Central US calls with India using a DST-aware converter.',
    tableSourceLabel: 'CST',
    tableTargets: [
      { label: 'IST', offsetMinutes: 690 },
      { label: 'CDT to IST', offsetMinutes: 630 },
    ],
    tableNote: 'Reference table for Central Time. CST is winter standard time; CDT is summer daylight time.',
    dstNotes: [
      'CST is UTC-6. CDT is UTC-5 during daylight saving.',
      'India stays on UTC+5:30, so Central US meetings move by one hour after DST changes.',
      'Use the live converter with a date when planning recurring meetings.',
    ],
    meetingWindow:
      'Central US to India overlap is tight. Try 7:00-9:00 AM CST, which is 6:30-8:30 PM IST.',
    faq: [
      { q: 'What is 8 AM CST in IST?', a: '8:00 AM CST is 7:30 PM IST.' },
      { q: 'What is 10 PM IST in CST?', a: '10:00 PM IST is 10:30 AM CST.' },
      { q: 'Does CST become CDT?', a: 'Regions that observe daylight saving use CDT in summer, one hour ahead of CST.' },
    ],
    related: [
      { href: '/usa-to-india-time', label: 'USA to India time' },
      { href: '/est-to-ist', label: 'EST to IST' },
      { href: '/pst-to-ist', label: 'PST to IST' },
    ],
  },
  {
    kind: 'converter',
    slug: 'mst-to-ist',
    navLabel: 'MST to IST',
    sourceCity: 'Denver',
    targetCities: ['Mumbai'],
    h1: 'MST to IST Time Converter',
    intro:
      'Convert Mountain Standard Time (MST, UTC-7) to India Standard Time (IST, UTC+5:30). MST is 12 hours 30 minutes behind IST.',
    title: 'MST to IST Converter - Mountain Time to India Time | timetz',
    description:
      'Convert MST to IST instantly for India calls with Denver, Phoenix, and Mountain Time teams.',
    tableSourceLabel: 'MST',
    tableTargets: [
      { label: 'IST', offsetMinutes: 750 },
      { label: 'MDT to IST', offsetMinutes: 690 },
    ],
    tableNote: 'Reference table for Mountain Time. Arizona and daylight saving rules can differ, so confirm exact city and date.',
    dstNotes: [
      'MST is UTC-7. MDT is UTC-6 where daylight saving is observed.',
      'Some Mountain Time areas do not observe daylight saving, so city-based conversion is safer than abbreviation-only math.',
      'India remains UTC+5:30 all year.',
    ],
    meetingWindow:
      'For Mountain Time and India, try 7:00-8:30 AM MST, which is 7:30-9:00 PM IST.',
    faq: [
      { q: 'What is 7 AM MST in IST?', a: '7:00 AM MST is 7:30 PM IST.' },
      { q: 'What is 9 PM IST in MST?', a: '9:00 PM IST is 8:30 AM MST.' },
      { q: 'Why can MST be confusing?', a: 'Some places use MST all year while others switch to MDT, so date and city matter.' },
    ],
    related: [
      { href: '/cst-to-ist', label: 'CST to IST' },
      { href: '/pst-to-ist', label: 'PST to IST' },
      { href: '/usa-to-india-time', label: 'USA to India time' },
    ],
  },
  {
    kind: 'converter',
    slug: 'pst-to-ist',
    navLabel: 'PST to IST',
    sourceCity: 'Los Angeles',
    targetCities: ['Mumbai'],
    h1: 'PST to IST Time Converter',
    intro:
      'Convert Pacific Standard Time (PST, UTC-8) to India Standard Time (IST, UTC+5:30). Los Angeles is 13 hours 30 minutes behind Mumbai in winter and 12 hours 30 minutes behind during PDT.',
    title: 'PST to IST Converter - US Pacific to India Time | timetz',
    description:
      'Convert PST to IST instantly. See the current time in India from any US West Coast time. Handles PDT and PST automatically.',
    tableSourceLabel: 'PST',
    tableTargets: [
      { label: 'IST', offsetMinutes: 810 },
      { label: 'PDT to IST', offsetMinutes: 750 },
    ],
    tableNote: 'Reference table for Pacific Time. PST is standard time; PDT is daylight time.',
    dstNotes: [
      'PST is UTC-8 and PDT is UTC-7.',
      'India stays UTC+5:30, so the Pacific to India gap is 13h 30m in winter and 12h 30m in summer.',
      'Use the live converter for exact dates near March and November DST changes.',
    ],
    meetingWindow:
      'For Pacific US and India, 7:00-8:30 AM PST maps to 8:30-10:00 PM IST. Earlier India evenings usually require late Pacific evening the previous day.',
    faq: [
      { q: 'What is 9 AM PST in IST?', a: '9:00 AM PST is 10:30 PM IST the same day.' },
      { q: 'What is midnight PST in IST?', a: 'Midnight PST is 1:30 PM IST the same day.' },
      { q: 'What is 6 PM IST in PST?', a: '6:00 PM IST is 4:30 AM PST.' },
    ],
    related: [
      { href: '/mst-to-ist', label: 'MST to IST' },
      { href: '/est-to-ist', label: 'EST to IST' },
      { href: '/india-to-usa-time', label: 'India to USA time' },
    ],
  },
  {
    kind: 'converter',
    slug: 'gmt-to-ist',
    navLabel: 'GMT to IST',
    sourceCity: 'UTC',
    targetCities: ['Mumbai', 'London'],
    h1: 'GMT to IST Time Converter',
    intro:
      'Convert Greenwich Mean Time (GMT, UTC+0) to India Standard Time (IST, UTC+5:30). IST is always 5 hours 30 minutes ahead of GMT.',
    title: 'GMT to IST Converter - Greenwich Mean Time to India | timetz',
    description:
      'Convert GMT to IST instantly. Get India time from GMT with a 24-hour table, DST notes, and a live converter.',
    tableSourceLabel: 'GMT',
    tableTargets: [{ label: 'IST', offsetMinutes: 330 }],
    tableNote: 'Reference table from GMT to IST. UK summer time is BST, which is one hour ahead of GMT.',
    dstNotes: [
      'GMT is UTC+0 and does not include British Summer Time.',
      'London uses BST (UTC+1) during summer, so London to India is often 4 hours 30 minutes.',
      'India does not observe DST.',
    ],
    meetingWindow:
      'For GMT to India meetings, 8:00-11:00 AM GMT maps to 1:30-4:30 PM IST and usually works well.',
    faq: [
      { q: 'What is 12 PM GMT in IST?', a: '12:00 PM GMT is 5:30 PM IST.' },
      { q: 'What is 9 AM GMT in IST?', a: '9:00 AM GMT is 2:30 PM IST.' },
      { q: 'Is GMT the same as London time?', a: 'Only in winter. London uses BST during summer, which is UTC+1.' },
    ],
    related: [
      { href: '/utc-to-ist', label: 'UTC to IST' },
      { href: '/london-to-mumbai', label: 'London to Mumbai' },
      { href: '/utc-vs-gmt', label: 'UTC vs GMT' },
    ],
  },
  {
    kind: 'converter',
    slug: 'cet-to-ist',
    navLabel: 'CET to IST',
    sourceCity: 'Paris',
    targetCities: ['Mumbai'],
    h1: 'CET to IST Time Converter',
    intro:
      'Convert Central European Time (CET, UTC+1) to India Standard Time (IST, UTC+5:30). CET is 4 hours 30 minutes behind IST.',
    title: 'CET to IST Converter - Europe to India Time | timetz',
    description:
      'Convert CET to IST instantly for Paris, Berlin, Madrid, and Central Europe to India scheduling.',
    tableSourceLabel: 'CET',
    tableTargets: [
      { label: 'IST', offsetMinutes: 270 },
      { label: 'CEST to IST', offsetMinutes: 210 },
    ],
    tableNote: 'Reference table for Central Europe. CET is winter standard time; CEST is summer daylight time.',
    dstNotes: [
      'CET is UTC+1 and CEST is UTC+2 during European summer time.',
      'India is UTC+5:30 all year, so the Europe to India gap shrinks by one hour in summer.',
      'City-based conversion is safest for dates near European DST transitions.',
    ],
    meetingWindow:
      'A good Central Europe to India overlap is 9:00 AM-1:00 PM CET, which is 1:30-5:30 PM IST.',
    faq: [
      { q: 'What is 10 AM CET in IST?', a: '10:00 AM CET is 2:30 PM IST.' },
      { q: 'What is 6 PM IST in CET?', a: '6:00 PM IST is 1:30 PM CET.' },
      { q: 'Does CET change in summer?', a: 'Many CET regions switch to CEST in summer, moving one hour ahead.' },
    ],
    related: [
      { href: '/gmt-to-ist', label: 'GMT to IST' },
      { href: '/london-to-mumbai', label: 'London to Mumbai' },
      { href: '/daylight-saving-time-conversion', label: 'DST conversion guide' },
    ],
  },
  {
    kind: 'converter',
    slug: 'utc-to-ist',
    navLabel: 'UTC to IST',
    sourceCity: 'UTC',
    targetCities: ['Mumbai'],
    h1: 'UTC to IST Time Converter',
    intro:
      'Convert Coordinated Universal Time (UTC) to India Standard Time (IST, UTC+5:30). IST is always 5 hours and 30 minutes ahead of UTC with no daylight saving adjustment.',
    title: 'UTC to IST Converter - Convert UTC to India Time | timetz',
    description:
      'Convert UTC to IST instantly. India Standard Time is UTC+5:30 with no DST. Enter any UTC timestamp to get the IST equivalent.',
    tableSourceLabel: 'UTC',
    tableTargets: [{ label: 'IST', offsetMinutes: 330 }],
    tableNote: 'Reference table from UTC to IST. The offset is fixed all year.',
    dstNotes: [
      'UTC does not observe daylight saving time.',
      'IST is fixed at UTC+5:30 across all of India.',
      'UTC timestamps are a reliable base for logs, APIs, and distributed systems.',
    ],
    meetingWindow:
      'For teams using UTC, 3:30-12:30 UTC maps to 9:00 AM-6:00 PM IST.',
    faq: [
      { q: 'What is UTC+5:30?', a: 'UTC+5:30 is India Standard Time, used across India year-round.' },
      { q: 'What is 00:00 UTC in IST?', a: '00:00 UTC is 5:30 AM IST the same day.' },
      { q: 'How do I convert a Unix timestamp to IST?', a: 'Use the Epoch tab on timetz to convert seconds or milliseconds into IST and other zones.' },
    ],
    related: [
      { href: '/gmt-to-ist', label: 'GMT to IST' },
      { href: '/unix-timestamp-to-local-time', label: 'Unix timestamp guide' },
      { href: '/time-in-mumbai', label: 'Time in Mumbai' },
    ],
  },
  {
    kind: 'converter',
    slug: 'new-york-to-london',
    navLabel: 'New York to London',
    sourceCity: 'New York',
    targetCities: ['London'],
    h1: 'New York to London Time Converter',
    intro:
      'Convert New York time to London time across EST, EDT, GMT, and BST. The cities are usually 5 hours apart, but the gap briefly changes when US and UK clocks switch on different dates.',
    title: 'New York to London Time Converter - ET to GMT/BST | timetz',
    description:
      'Convert New York time to London time. Handles EST, EDT, GMT, and BST transitions automatically so you always get the right offset.',
    tableSourceLabel: 'New York',
    tableTargets: [
      { label: 'London typical', offsetMinutes: 300 },
      { label: 'DST gap weeks', offsetMinutes: 240 },
    ],
    tableNote: 'Reference table for New York to London. The 4-hour column applies during short DST mismatch windows.',
    dstNotes: [
      'New York changes clocks on US daylight saving dates.',
      'London changes clocks on UK daylight saving dates.',
      'The offset is usually 5 hours, but can be 4 hours during transition windows.',
    ],
    meetingWindow:
      'The cleanest meeting window is 9:00 AM-12:00 PM New York, which is usually 2:00-5:00 PM London.',
    faq: [
      { q: 'How many hours ahead is London from New York?', a: 'Usually 5 hours, but sometimes 4 hours around spring and autumn DST transition weeks.' },
      { q: 'What is 9 AM New York time in London?', a: 'Usually 2:00 PM in London.' },
      { q: 'What is noon London time in New York?', a: 'Usually 7:00 AM in New York.' },
    ],
    related: [
      { href: '/time-in-new-york', label: 'Time in New York' },
      { href: '/time-in-london', label: 'Time in London' },
      { href: '/daylight-saving-time-conversion', label: 'DST conversion guide' },
    ],
  },
  {
    kind: 'converter',
    slug: 'london-to-mumbai',
    navLabel: 'London to Mumbai',
    sourceCity: 'London',
    targetCities: ['Mumbai'],
    h1: 'London to Mumbai Time Converter',
    intro:
      'Convert London time to Mumbai time. Mumbai is 5 hours 30 minutes ahead of London during GMT and 4 hours 30 minutes ahead during BST.',
    title: 'London to Mumbai Time Converter - GMT/BST to IST | timetz',
    description:
      'Convert London time to Mumbai IST instantly. Handles GMT and BST automatically with a live converter and 24-hour table.',
    tableSourceLabel: 'London',
    tableTargets: [
      { label: 'Mumbai from GMT', offsetMinutes: 330 },
      { label: 'Mumbai from BST', offsetMinutes: 270 },
    ],
    tableNote: 'Reference table for London to Mumbai. Use the GMT or BST column based on the date.',
    dstNotes: [
      'London uses GMT in winter and BST in summer.',
      'Mumbai uses IST all year.',
      'The India-UK gap is 5h 30m in winter and 4h 30m in summer.',
    ],
    meetingWindow:
      'A practical London to Mumbai call window is 8:30-11:30 AM London, which is afternoon or early evening in Mumbai.',
    faq: [
      { q: 'How many hours ahead is Mumbai from London?', a: 'Mumbai is 5h 30m ahead during GMT and 4h 30m ahead during BST.' },
      { q: 'What is 9 AM London time in Mumbai?', a: '9:00 AM GMT is 2:30 PM IST. 9:00 AM BST is 1:30 PM IST.' },
      { q: 'Does Mumbai use daylight saving?', a: 'No. Mumbai stays on India Standard Time all year.' },
    ],
    related: [
      { href: '/india-to-uk-time', label: 'India to UK time' },
      { href: '/time-in-london', label: 'Time in London' },
      { href: '/time-in-mumbai', label: 'Time in Mumbai' },
    ],
  },
  {
    kind: 'converter',
    slug: 'india-to-usa-time',
    navLabel: 'India to USA time',
    sourceCity: 'Mumbai',
    targetCities: ['New York', 'Chicago', 'Denver', 'Los Angeles'],
    h1: 'India to USA Time Converter',
    intro:
      'Convert India Standard Time (IST) to major US time zones at once: Eastern, Central, Mountain, and Pacific. Useful for calls, releases, webinars, and remote work.',
    title: 'India to USA Time Converter - IST to EST, CST, MST, PST | timetz',
    description:
      'Convert India time to US Eastern, Central, Mountain, and Pacific time at once. Useful for scheduling calls across India and the United States.',
    tableSourceLabel: 'IST',
    tableTargets: [
      { label: 'EST', offsetMinutes: -630 },
      { label: 'CST', offsetMinutes: -690 },
      { label: 'MST', offsetMinutes: -750 },
      { label: 'PST', offsetMinutes: -810 },
    ],
    tableNote: 'Reference table for US standard time zones. During US daylight saving, each US result is one hour later.',
    dstNotes: [
      'India stays on IST all year.',
      'Most US regions observe daylight saving from spring to autumn.',
      'Arizona, Hawaii, and some territories do not follow the same DST rules as most US states.',
    ],
    meetingWindow:
      'The easiest India to USA overlap is often 6:30-8:30 PM IST for the East Coast. West Coast overlap usually requires early US morning or late India evening.',
    faq: [
      { q: 'What is 10 AM IST in US time?', a: '10:00 AM IST is 11:30 PM EST, 10:30 PM CST, 9:30 PM MST, and 8:30 PM PST on the previous day.' },
      { q: 'What is the best time for India-USA calls?', a: '6:30-8:30 PM IST works best for US East Coast. US West Coast calls are harder and often fall late in India.' },
      { q: 'Does the USA have one time zone?', a: 'No. The continental US spans Eastern, Central, Mountain, and Pacific time, plus Alaska and Hawaii.' },
    ],
    related: [
      { href: '/usa-to-india-time', label: 'USA to India time' },
      { href: '/best-time-for-india-usa-meetings', label: 'India-USA meeting guide' },
      { href: '/est-to-ist', label: 'EST to IST' },
    ],
  },
  {
    kind: 'converter',
    slug: 'india-to-uk-time',
    navLabel: 'India to UK time',
    sourceCity: 'Mumbai',
    targetCities: ['London'],
    h1: 'India to UK Time Converter',
    intro:
      'Convert India time to UK time. IST is 5 hours 30 minutes ahead of GMT in winter and 4 hours 30 minutes ahead of BST in summer.',
    title: 'India to UK Time Converter - IST to London Time | timetz',
    description:
      'Convert India time to UK time instantly. Handles IST to GMT and BST with DST-aware London conversion.',
    tableSourceLabel: 'IST',
    tableTargets: [
      { label: 'UK GMT', offsetMinutes: -330 },
      { label: 'UK BST', offsetMinutes: -270 },
    ],
    tableNote: 'Reference table from India to UK time. Use GMT in winter and BST in UK summer.',
    dstNotes: [
      'India does not observe DST.',
      'The UK uses GMT in winter and BST in summer.',
      'The India-UK gap changes from 5h 30m to 4h 30m when the UK is on BST.',
    ],
    meetingWindow:
      'A good India to UK meeting time is 1:00-5:30 PM IST, which is morning to early afternoon in the UK.',
    faq: [
      { q: 'What is 2 PM IST in UK time?', a: '2:00 PM IST is 8:30 AM GMT or 9:30 AM BST.' },
      { q: 'What is 6 PM IST in London?', a: '6:00 PM IST is 12:30 PM GMT or 1:30 PM BST.' },
      { q: 'Why does India to UK time change?', a: 'The UK uses summer time, while India stays fixed on IST.' },
    ],
    related: [
      { href: '/london-to-mumbai', label: 'London to Mumbai' },
      { href: '/gmt-to-ist', label: 'GMT to IST' },
      { href: '/time-in-london', label: 'Time in London' },
    ],
  },
  {
    kind: 'converter',
    slug: 'usa-to-india-time',
    navLabel: 'USA to India time',
    sourceCity: 'New York',
    targetCities: ['Mumbai', 'Chicago', 'Los Angeles'],
    h1: 'USA to India Time Converter',
    intro:
      'Convert US time to India time across Eastern, Central, Mountain, and Pacific offsets. Use it for calls, releases, and distributed team schedules.',
    title: 'USA to India Time Converter - EST, CST, MST, PST to IST | timetz',
    description:
      'Convert USA time to India time instantly. Compare US Eastern, Central, Mountain, and Pacific time with IST.',
    tableSourceLabel: 'US standard time',
    tableTargets: [
      { label: 'Eastern to IST', offsetMinutes: 630 },
      { label: 'Central to IST', offsetMinutes: 690 },
      { label: 'Pacific to IST', offsetMinutes: 810 },
    ],
    tableNote: 'Reference table for US standard time. During US daylight saving, India time is one hour earlier than shown.',
    dstNotes: [
      'Most US regions switch between standard and daylight time.',
      'India does not observe DST.',
      'Use city names like New York, Chicago, Denver, and Los Angeles for date-aware results.',
    ],
    meetingWindow:
      'For US to India calls, early US morning maps to India evening. Eastern 8:00-10:00 AM is often the best overlap.',
    faq: [
      { q: 'What is 9 AM EST in India?', a: '9:00 AM EST is 7:30 PM IST.' },
      { q: 'What is 9 AM PST in India?', a: '9:00 AM PST is 10:30 PM IST.' },
      { q: 'Which US time zone is easiest for India calls?', a: 'Eastern Time usually has the easiest overlap because it is closest to India among the main US zones.' },
    ],
    related: [
      { href: '/india-to-usa-time', label: 'India to USA time' },
      { href: '/best-time-for-india-usa-meetings', label: 'India-USA meeting guide' },
      { href: '/pst-to-ist', label: 'PST to IST' },
    ],
  },
  {
    kind: 'converter',
    slug: 'time-in-mumbai',
    navLabel: 'Time in Mumbai',
    sourceCity: 'Mumbai',
    targetCities: ['UTC', 'London', 'New York'],
    h1: 'Current Time in Mumbai, India',
    intro:
      'Check the current time in Mumbai and compare India Standard Time with UTC, London, and New York. Mumbai uses IST year-round.',
    title: 'Current Time in Mumbai, India - IST Time Now | timetz',
    description:
      'See the current time in Mumbai, India. Compare IST with UTC, London, New York, and other cities instantly.',
    tableSourceLabel: 'UTC',
    tableTargets: [{ label: 'Mumbai IST', offsetMinutes: 330 }],
    tableNote: 'Reference table from UTC to Mumbai time. Mumbai uses IST all year.',
    dstNotes: [
      'Mumbai uses India Standard Time, UTC+5:30.',
      'Mumbai does not observe daylight saving time.',
      'All Indian cities use the same time zone.',
    ],
    meetingWindow:
      'Mumbai business hours are typically 9:00 AM-6:00 PM IST, which is 3:30 AM-12:30 PM UTC.',
    faq: [
      { q: 'What time zone is Mumbai in?', a: 'Mumbai is in India Standard Time, or IST, which is UTC+5:30.' },
      { q: 'Does Mumbai change clocks?', a: 'No. Mumbai does not observe daylight saving time.' },
      { q: 'Is Mumbai time the same as Delhi and Bangalore?', a: 'Yes. All of India uses IST.' },
    ],
    related: [
      { href: '/utc-to-ist', label: 'UTC to IST' },
      { href: '/london-to-mumbai', label: 'London to Mumbai' },
      { href: '/time-in-new-york', label: 'Time in New York' },
    ],
  },
  {
    kind: 'converter',
    slug: 'time-in-new-york',
    navLabel: 'Time in New York',
    sourceCity: 'New York',
    targetCities: ['London', 'Mumbai', 'UTC'],
    h1: 'Current Time in New York',
    intro:
      'Check the current time in New York and compare Eastern Time with London, Mumbai, UTC, and other cities.',
    title: 'Current Time in New York - Eastern Time Now | timetz',
    description:
      'See the current time in New York. Compare EST or EDT with London, Mumbai, UTC, and other time zones instantly.',
    tableSourceLabel: 'UTC',
    tableTargets: [
      { label: 'New York EST', offsetMinutes: -300 },
      { label: 'New York EDT', offsetMinutes: -240 },
    ],
    tableNote: 'Reference table from UTC to New York. Use EST in winter and EDT in daylight saving time.',
    dstNotes: [
      'New York uses Eastern Time.',
      'New York switches between EST and EDT.',
      'Use the live converter for exact offsets near DST transition dates.',
    ],
    meetingWindow:
      'New York business hours are typically 9:00 AM-5:00 PM Eastern Time.',
    faq: [
      { q: 'What time zone is New York in?', a: 'New York uses Eastern Time: EST in winter and EDT during daylight saving.' },
      { q: 'Does New York observe daylight saving?', a: 'Yes. New York changes clocks in spring and autumn.' },
      { q: 'What is New York time compared to India?', a: 'New York is 10h 30m behind IST during EST and 9h 30m behind during EDT.' },
    ],
    related: [
      { href: '/new-york-to-london', label: 'New York to London' },
      { href: '/est-to-ist', label: 'EST to IST' },
      { href: '/time-in-london', label: 'Time in London' },
    ],
  },
  {
    kind: 'converter',
    slug: 'time-in-london',
    navLabel: 'Time in London',
    sourceCity: 'London',
    targetCities: ['Mumbai', 'New York', 'UTC'],
    h1: 'Current Time in London',
    intro:
      'Check the current time in London and compare UK time with Mumbai, New York, UTC, and other cities.',
    title: 'Current Time in London - UK Time Now | timetz',
    description:
      'See the current time in London. Compare GMT or BST with India, New York, UTC, and other time zones instantly.',
    tableSourceLabel: 'UTC',
    tableTargets: [
      { label: 'London GMT', offsetMinutes: 0 },
      { label: 'London BST', offsetMinutes: 60 },
    ],
    tableNote: 'Reference table from UTC to London. Use GMT in winter and BST during UK summer time.',
    dstNotes: [
      'London uses GMT in winter.',
      'London uses BST, UTC+1, during summer time.',
      'The UK and US change clocks on different dates, which can briefly alter offsets.',
    ],
    meetingWindow:
      'London business hours are typically 9:00 AM-5:30 PM UK time.',
    faq: [
      { q: 'What time zone is London in?', a: 'London uses GMT in winter and BST in summer.' },
      { q: 'Is London always UTC?', a: 'No. London is UTC+0 during GMT and UTC+1 during BST.' },
      { q: 'What is London time compared to India?', a: 'London is 5h 30m behind IST during GMT and 4h 30m behind during BST.' },
    ],
    related: [
      { href: '/london-to-mumbai', label: 'London to Mumbai' },
      { href: '/new-york-to-london', label: 'New York to London' },
      { href: '/utc-vs-gmt', label: 'UTC vs GMT' },
    ],
  },
];

export const guidePages: GuideSeoPage[] = [
  {
    kind: 'guide',
    slug: 'utc-vs-gmt',
    navLabel: 'UTC vs GMT',
    h1: 'UTC vs GMT: What Is the Difference?',
    intro:
      'UTC and GMT are often used as if they mean the same thing, but they are not identical. This guide explains when to use each one for time conversion, logs, meetings, and scheduling.',
    title: 'UTC vs GMT - Difference, Meaning, and Time Conversion | timetz',
    description:
      'Understand UTC vs GMT, when they are equivalent, and how to convert UTC or GMT to local time zones like IST, EST, PST, and London time.',
    defaultCities: ['UTC', 'London', 'Mumbai', 'New York'],
    keyTakeaways: [
      'UTC is the modern global time standard used by computers, APIs, and logs.',
      'GMT is a time zone term tied to Greenwich Mean Time and UK winter time.',
      'For most everyday conversions, UTC and GMT have the same clock time.',
    ],
    sections: [
      {
        heading: 'Short answer',
        body:
          'UTC is the global time standard. GMT is a time zone historically based on mean solar time at Greenwich. For normal conversion math, UTC+0 and GMT show the same clock time.',
      },
      {
        heading: 'When to use UTC',
        body:
          'Use UTC for software systems, timestamps, APIs, server logs, databases, and globally coordinated schedules. UTC avoids daylight saving ambiguity.',
        bullets: ['Unix timestamps are based on UTC.', 'ISO timestamps with Z are UTC.', 'Distributed systems should store event times in UTC.'],
      },
      {
        heading: 'When to use GMT',
        body:
          'Use GMT when the user or region specifically refers to Greenwich Mean Time or UK winter time. London uses GMT in winter and BST in summer.',
      },
      {
        heading: 'Conversion examples',
        body:
          'UTC 12:00 is 12:00 GMT, 5:30 PM IST, 7:00 AM EST, and 4:00 AM PST. Use city names when daylight saving can affect the result.',
      },
    ],
    faq: [
      { q: 'Are UTC and GMT the same?', a: 'For common clock conversion, UTC and GMT are both UTC+0. Technically, UTC is a time standard and GMT is a time zone term.' },
      { q: 'Is London always GMT?', a: 'No. London uses GMT in winter and BST in summer.' },
      { q: 'Should developers use UTC or GMT?', a: 'Developers should use UTC for storage, logs, APIs, and timestamps.' },
    ],
    related: [
      { href: '/utc-to-ist', label: 'UTC to IST' },
      { href: '/gmt-to-ist', label: 'GMT to IST' },
      { href: '/unix-timestamp-to-local-time', label: 'Unix timestamp guide' },
    ],
  },
  {
    kind: 'guide',
    slug: 'est-vs-edt',
    navLabel: 'EST vs EDT',
    h1: 'EST vs EDT: Eastern Time Explained',
    intro:
      'EST and EDT are both Eastern Time, but they are one hour apart. This guide explains when each abbreviation applies and how to avoid meeting mistakes.',
    title: 'EST vs EDT - Eastern Standard and Daylight Time Explained | timetz',
    description:
      'Learn the difference between EST and EDT, when Eastern Time changes, and how to convert Eastern Time to IST, UTC, London, and other zones.',
    defaultCities: ['New York', 'Mumbai', 'London', 'UTC'],
    keyTakeaways: [
      'EST is Eastern Standard Time, UTC-5.',
      'EDT is Eastern Daylight Time, UTC-4.',
      'Use a city plus date, such as New York on July 26, for exact conversion.',
    ],
    sections: [
      {
        heading: 'EST vs EDT in one line',
        body:
          'EST is used during standard time and EDT is used during daylight saving time. EDT is one hour ahead of EST.',
      },
      {
        heading: 'Why this matters',
        body:
          'If someone says EST during summer, they may actually mean Eastern Time in New York, which is EDT. This can shift meetings by one hour.',
      },
      {
        heading: 'Best practice',
        body:
          'Use city names and dates instead of abbreviation-only input. New York to Mumbai on a date is safer than EST to IST without context.',
      },
    ],
    faq: [
      { q: 'Is EDT ahead of EST?', a: 'Yes. EDT is one hour ahead of EST.' },
      { q: 'What is EST in UTC?', a: 'EST is UTC-5.' },
      { q: 'What is EDT in UTC?', a: 'EDT is UTC-4.' },
    ],
    related: [
      { href: '/est-to-ist', label: 'EST to IST' },
      { href: '/edt-to-ist', label: 'EDT to IST' },
      { href: '/daylight-saving-time-conversion', label: 'DST conversion guide' },
    ],
  },
  {
    kind: 'guide',
    slug: 'best-time-for-india-usa-meetings',
    navLabel: 'India-USA meetings',
    h1: 'Best Time for India-USA Meetings',
    intro:
      'India and the United States have limited working-hour overlap. This guide gives practical windows for India meetings with US Eastern, Central, Mountain, and Pacific teams.',
    title: 'Best Time for India-USA Meetings - IST and US Time Zones | timetz',
    description:
      'Find the best meeting times between India and the USA across EST, CST, MST, PST, and daylight saving changes.',
    defaultCities: ['Mumbai', 'New York', 'Chicago', 'Los Angeles'],
    keyTakeaways: [
      'India to US East Coast has the best overlap around India evening and US morning.',
      'US West Coast overlap usually means early US morning or late India evening.',
      'DST shifts US meeting times by one hour while India stays fixed.',
    ],
    sections: [
      {
        heading: 'Best overlap by region',
        body:
          'For US Eastern, try 6:30-8:30 PM IST. For Central, try 7:30-9:00 PM IST. For Pacific, overlap is harder and often needs 8:30-10:00 PM IST.',
      },
      {
        heading: 'Recurring meetings',
        body:
          'For recurring calls, review the schedule around March and November because US daylight saving changes while India does not.',
      },
      {
        heading: 'Team-friendly rule',
        body:
          'Alternate inconvenience for teams spread across India and the US. Do not make the same region always take early morning or late night calls.',
      },
    ],
    faq: [
      { q: 'What is the best India to US East Coast meeting time?', a: 'Usually 6:30-8:30 PM IST, which maps to US East Coast morning.' },
      { q: 'What is the best India to US West Coast meeting time?', a: '8:30-10:00 PM IST can work, but it is still early in Pacific Time.' },
      { q: 'Does DST affect India-USA meetings?', a: 'Yes. The US changes clocks but India does not, so recurring meetings shift by one hour for one side.' },
    ],
    related: [
      { href: '/india-to-usa-time', label: 'India to USA time' },
      { href: '/usa-to-india-time', label: 'USA to India time' },
      { href: '/est-vs-edt', label: 'EST vs EDT' },
    ],
  },
  {
    kind: 'guide',
    slug: 'daylight-saving-time-conversion',
    navLabel: 'DST conversion',
    h1: 'How Daylight Saving Affects Time Conversion',
    intro:
      'Daylight saving time changes offsets for many cities, which can move meetings by one hour. This guide explains how to convert safely.',
    title: 'Daylight Saving Time Conversion - Avoid DST Meeting Mistakes | timetz',
    description:
      'Learn how daylight saving time affects timezone conversion, recurring meetings, and offsets like EST, EDT, PST, PDT, GMT, and BST.',
    defaultCities: ['New York', 'London', 'Mumbai', 'Los Angeles'],
    keyTakeaways: [
      'DST changes local offsets by one hour in many regions.',
      'Not every country observes DST.',
      'City and date are more reliable than timezone abbreviations.',
    ],
    sections: [
      {
        heading: 'Why DST breaks simple math',
        body:
          'A fixed offset like UTC-5 is not always correct for a city. New York is UTC-5 during EST and UTC-4 during EDT.',
      },
      {
        heading: 'Use city plus date',
        body:
          'For accurate conversion, enter the city and the date. A phrase like tomorrow 9am New York to London gives the converter enough context.',
      },
      {
        heading: 'Watch recurring meetings',
        body:
          'Recurring meetings are the most common DST failure. Check schedules around March, October, and November depending on the countries involved.',
      },
    ],
    faq: [
      { q: 'Does DST always add one hour?', a: 'Usually yes, but rules vary by country and region.' },
      { q: 'Does India use DST?', a: 'No. India stays on IST year-round.' },
      { q: 'Why do US and UK meetings shift?', a: 'The US and UK change clocks on different dates, creating short mismatch periods.' },
    ],
    related: [
      { href: '/est-vs-edt', label: 'EST vs EDT' },
      { href: '/new-york-to-london', label: 'New York to London' },
      { href: '/india-to-usa-time', label: 'India to USA time' },
    ],
  },
  {
    kind: 'guide',
    slug: 'unix-timestamp-to-local-time',
    navLabel: 'Unix timestamp',
    h1: 'Unix Timestamp to Local Time',
    intro:
      'Unix timestamps are common in logs, APIs, and databases. This guide explains seconds vs milliseconds and how to convert epoch values to local time zones.',
    title: 'Unix Timestamp to Local Time - Epoch Converter Guide | timetz',
    description:
      'Convert Unix timestamps to local time. Learn seconds vs milliseconds, UTC storage, ISO format, and timezone conversion for logs and APIs.',
    defaultCities: ['UTC', 'Mumbai', 'New York', 'London'],
    keyTakeaways: [
      'Unix timestamps count time from 1970-01-01 00:00:00 UTC.',
      'Some systems use seconds and others use milliseconds.',
      'Store timestamps in UTC, then display them in the user local time zone.',
    ],
    sections: [
      {
        heading: 'Seconds vs milliseconds',
        body:
          'A 10-digit Unix timestamp is usually seconds. A 13-digit timestamp is usually milliseconds. Mixing them creates dates that look wildly wrong.',
      },
      {
        heading: 'UTC first, local display later',
        body:
          'Most systems store timestamps in UTC. Convert to local time only for display, reports, customer support, or human scheduling.',
      },
      {
        heading: 'Debugging logs',
        body:
          'When comparing logs across servers, convert every timestamp from UTC into the same target zone before comparing event order.',
      },
    ],
    faq: [
      { q: 'What is Unix time?', a: 'Unix time is the number of seconds since 1970-01-01 00:00:00 UTC, not counting leap seconds in most systems.' },
      { q: 'How do I know if a timestamp is seconds or milliseconds?', a: '10 digits usually means seconds. 13 digits usually means milliseconds.' },
      { q: 'Should timestamps be stored in local time?', a: 'Usually no. Store in UTC and convert for display.' },
    ],
    related: [
      { href: '/utc-to-ist', label: 'UTC to IST' },
      { href: '/utc-vs-gmt', label: 'UTC vs GMT' },
      { href: '/time-in-new-york', label: 'Time in New York' },
    ],
  },
];

export const seoPages: SeoPage[] = [...converterPages, ...guidePages];

export const seoPageBySlug = new Map(seoPages.map((page) => [page.slug, page]));

export const homepageConverterLinks = converterPages.map(({ slug, navLabel, description }) => ({
  href: `/${slug}`,
  label: navLabel,
  description,
}));

export const homepageGuideLinks = guidePages.map(({ slug, navLabel, description }) => ({
  href: `/${slug}`,
  label: navLabel,
  description,
}));

export const footerConverterLinks = converterPages.map(({ slug, navLabel }) => ({
  href: `/${slug}`,
  label: navLabel,
}));

export const footerGuideLinks = guidePages.map(({ slug, navLabel }) => ({
  href: `/${slug}`,
  label: navLabel,
}));

export const coreConverterLinks = coreRelated;
