// UI strings for the EN / हिं toggle. Body copy inside sections stays in English
// in this concept; navigation, hero, CTAs and section headings switch language.

export const strings = {
  en: {
    'nav.features': 'Features',
    'nav.syllabus': 'Syllabus Map',
    'nav.how': 'How it works',
    'nav.stories': 'Stories',
    'nav.faq': 'FAQ',
    'nav.login': 'Log in',
    'nav.start': 'Start free',
    'nav.menu': 'Open menu',
    'nav.close': 'Close menu',
    'nav.language': 'Language',

    'hero.edition': "Today's Edition",
    'hero.titleBefore': 'Every headline, mapped to ',
    'hero.titleMark': 'your syllabus',
    'hero.titleAfter': '.',
    'hero.sub': 'Current affairs, PYQs, smart notes and AI mock tests in one daily routine for UPSC CSE.',
    'hero.cta': "Start today's edition, free",
    'hero.try': 'Try a 3-question sample',
    'hero.frontPage': 'On the front page',
    'hero.caption': 'Sample content for design preview',

    'quiz.kicker': 'The Daily Three',
    'quiz.title': 'Three questions before your chai goes cold',
    'quiz.cta': 'Get a full AI mock test',

    'features.kicker': 'Inside every edition',
    'features.title': 'Four sections. One preparation habit.',
    'features.more': 'Also in the edition',

    'syllabus.kicker': 'Signature feature',
    'syllabus.title': 'The Syllabus Map',
    'syllabus.sub': 'Pick a paper, pick a topic, and see how one idea travels from the news to your notes, to past questions, to practice.',

    'journey.kicker': 'How it works',
    'journey.title': 'One companion for the whole journey',

    'stories.kicker': 'Stories',
    'stories.title': 'Letters from aspirants',

    'faq.kicker': 'FAQ',
    'faq.title': 'Questions readers ask',

    'cta.title': "Tomorrow's edition is waiting.",
    'cta.sub': 'Ten focused minutes a day. Build the habit before the syllabus builds up.',
    'cta.button': "Start today's edition, free",
  },
  hi: {
    'nav.features': 'विशेषताएँ',
    'nav.syllabus': 'सिलेबस मैप',
    'nav.how': 'कैसे काम करता है',
    'nav.stories': 'अनुभव',
    'nav.faq': 'सवाल-जवाब',
    'nav.login': 'लॉग इन',
    'nav.start': 'मुफ़्त शुरू करें',
    'nav.menu': 'मेन्यू खोलें',
    'nav.close': 'मेन्यू बंद करें',
    'nav.language': 'भाषा',

    'hero.edition': 'आज का संस्करण',
    'hero.titleBefore': 'हर ख़बर, ',
    'hero.titleMark': 'आपके सिलेबस',
    'hero.titleAfter': ' से जुड़ी।',
    'hero.sub': 'UPSC CSE के लिए करंट अफ़ेयर्स, पिछले वर्षों के प्रश्न, स्मार्ट नोट्स और AI मॉक टेस्ट, एक ही दैनिक दिनचर्या में।',
    'hero.cta': 'आज का संस्करण मुफ़्त शुरू करें',
    'hero.try': '3 सवालों का नमूना आज़माएँ',
    'hero.frontPage': 'मुखपृष्ठ पर',
    'hero.caption': 'डिज़ाइन प्रीव्यू के लिए नमूना सामग्री',

    'quiz.kicker': 'आज के तीन सवाल',
    'quiz.title': 'चाय ठंडी होने से पहले तीन सवाल',
    'quiz.cta': 'पूरा AI मॉक टेस्ट दें',

    'features.kicker': 'हर संस्करण में',
    'features.title': 'चार खंड, तैयारी की एक आदत।',
    'features.more': 'संस्करण में और भी',

    'syllabus.kicker': 'ख़ास फ़ीचर',
    'syllabus.title': 'सिलेबस मैप',
    'syllabus.sub': 'एक पेपर और एक विषय चुनें, और देखें कि एक विचार ख़बर से नोट्स, पुराने प्रश्नों और अभ्यास तक कैसे पहुँचता है।',

    'journey.kicker': 'कैसे काम करता है',
    'journey.title': 'पूरी यात्रा के लिए एक साथी',

    'stories.kicker': 'अनुभव',
    'stories.title': 'अभ्यर्थियों के पत्र',

    'faq.kicker': 'सवाल-जवाब',
    'faq.title': 'पाठकों के सवाल',

    'cta.title': 'कल का संस्करण आपका इंतज़ार कर रहा है।',
    'cta.sub': 'रोज़ दस मिनट का ध्यान। सिलेबस बढ़ने से पहले आदत बनाइए।',
    'cta.button': 'आज का संस्करण मुफ़्त शुरू करें',
  },
};

export function translate(lang, key) {
  return strings[lang]?.[key] ?? strings.en[key] ?? key;
}
