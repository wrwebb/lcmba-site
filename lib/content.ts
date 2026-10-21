// Every editable piece of text and every photo on the site is defined here.
// Public pages use these defaults when a value is missing from the static
// content file.

export type FieldType = 'text' | 'textarea' | 'image' | 'url' | 'select' | 'toggle';

export type Field = {
  key: string;
  label: string;
  type: FieldType;
  default: string;
  help?: string;
  options?: { value: string; label: string }[];
};

export type Section = { id: string; title: string; note?: string; fields: Field[] };
export type PageId = 'site' | 'home' | 'bike-park' | 'sponsors' | 'endorsements' | 'members' | 'support';
export type PageSchema = { id: PageId; title: string; path: string; sections: Section[] };
export type Content = Record<string, string>;

const t = (key: string, label: string, def: string, help?: string): Field => ({ key, label, type: 'text', default: def, help });
const p = (key: string, label: string, def: string, help?: string): Field => ({ key, label, type: 'textarea', default: def, help });
const img = (key: string, label: string, def: string, alt: string): Field[] => [
  { key, label, type: 'image', default: def },
  { key: `${key}_alt`, label: `${label}: description for screen readers`, type: 'text', default: alt },
];
const url = (key: string, label: string, def: string, help?: string): Field => ({ key, label, type: 'url', default: def, help });

const SUPPORT_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSfOT3ZikIBIVNIT65gcSPp3URKZB0kfHrh6aHMfxk_wxNbFhA/viewform';

const STEP_STATES = [
  { value: 'done', label: 'Done (dark green)' },
  { value: 'current', label: 'You are here (orange)' },
  { value: 'future', label: 'Upcoming (outlined)' },
];

const SPONSOR_LEVELS = [
  { value: 'featured', label: 'Featured (big card with logo, blurb and button)' },
  { value: 'supporting', label: 'Supporting (logo in the grid)' },
];
const LOGO_BACKGROUNDS = [
  { value: 'light', label: 'White (for dark logos)' },
  { value: 'dark', label: 'Charcoal (for white logos)' },
];
const SPONSOR_COUNT = 12;
function sponsorSlot(n: number, d: { name?: string; level?: string; badge?: string; logo?: string; bg?: string; url?: string; blurb?: string } = {}): Section {
  const k = `sponsor${n}`;
  return {
    id: k,
    title: `Sponsor ${n}`,
    note: n === 1 ? undefined : 'Leave the name blank to keep this slot hidden.',
    fields: [
      t(`${k}_name`, 'Business name', d.name ?? '', 'Blank = not shown on the site.'),
      { key: `${k}_level`, label: 'Level', type: 'select', default: d.level ?? 'supporting', options: SPONSOR_LEVELS },
      t(`${k}_badge`, 'Badge on the card (featured only)', d.badge ?? '', 'For example "Founding sponsor". Leave blank for no badge.'),
      ...img(`${k}_logo`, 'Logo', d.logo ?? '', d.name ? `${d.name} logo` : 'Sponsor logo'),
      { key: `${k}_logo_bg`, label: 'Logo background', type: 'select', default: d.bg ?? 'light', options: LOGO_BACKGROUNDS },
      url(`${k}_url`, 'Website link', d.url ?? ''),
      p(`${k}_blurb`, 'Short description (featured only)', d.blurb ?? ''),
    ],
  };
}
const SPONSOR_SLOTS: Section[] = Array.from({ length: SPONSOR_COUNT }, (_, i) =>
  i === 0
    ? sponsorSlot(1, {
        name: 'Local Neon',
        level: 'featured',
        badge: 'Founding sponsor',
        logo: '/sponsor-local-neon.png',
        bg: 'dark',
        url: 'https://thelocalneon.com/',
        blurb: "Downtown Larkspur's shop for artist-designed gear inspired by mountain towns, plus cold drinks, snacks and bike essentials. Local Neon is owned by our founder, Rob Webb, and is a big supporter of youth riding in our towns.",
      })
    : sponsorSlot(i + 1),
);

export type Sponsor = { n: number; name: string; level: string; badge: string; logo: string; logoAlt: string; logoBg: string; url: string; blurb: string };
export function sponsorsFrom(c: Content): Sponsor[] {
  const out: Sponsor[] = [];
  for (let n = 1; n <= SPONSOR_COUNT; n++) {
    const k = `sponsor${n}`;
    const name = (c[`${k}_name`] || '').trim();
    if (!name) continue;
    out.push({ n, name, level: c[`${k}_level`] || 'supporting', badge: c[`${k}_badge`] || '', logo: c[`${k}_logo`] || '', logoAlt: c[`${k}_logo_alt`] || `${name} logo`, logoBg: c[`${k}_logo_bg`] || 'light', url: c[`${k}_url`] || '', blurb: c[`${k}_blurb`] || '' });
  }
  return out;
}

const CANDIDATE_COUNT = 8;
function candidateSlot(n: number, d: { name?: string; office?: string; photo?: string; photoCredit?: string; blurb?: string; response1?: string; response2?: string; url?: string; button?: string } = {}): Section {
  const k = `cand${n}`;
  return {
    id: k,
    title: `Candidate ${n}`,
    note: n === 1 ? undefined : 'Leave the name blank to keep this slot hidden.',
    fields: [
      t(`${k}_name`, 'Name', d.name ?? '', 'Blank = not shown on the site.'),
      t(`${k}_office`, 'Running for', d.office ?? 'Larkspur City Council'),
      ...img(`${k}_photo`, 'Photo', d.photo ?? '', d.name ?? 'Candidate photo'),
      t(`${k}_photo_credit`, 'Photo credit (optional)', d.photoCredit ?? ''),
      p(`${k}_blurb`, 'Response summary', d.blurb ?? ''),
      p(`${k}_response1`, 'Question 1 response', d.response1 ?? ''),
      p(`${k}_response2`, 'Question 2 response', d.response2 ?? ''),
      url(`${k}_url`, 'Campaign website', d.url ?? ''),
      t(`${k}_button`, 'Button label', d.button ?? 'Campaign website'),
    ],
  };
}
const CANDIDATE_SLOTS: Section[] = Array.from({ length: CANDIDATE_COUNT }, (_, i) =>
  i === 0
    ? candidateSlot(1, {
        name: 'Gareth Walter',
        photo: '/gareth-walter.jpg',
        blurb: "Gareth is a Larkspur parent raising three kids in our local schools, and you'll often find him out on Mt. Tam. He believes children thrive in nature and has said he'll support initiatives that get kids outdoors.",
        url: 'http://electgareth.com/',
        button: 'Visit ElectGareth.com',
      })
    : candidateSlot(i + 1),
);

export type Candidate = { n: number; name: string; office: string; photo: string; photoAlt: string; photoCredit: string; blurb: string; response1: string; response2: string; url: string; button: string };
export function candidatesFrom(c: Content): Candidate[] {
  const out: Candidate[] = [];
  for (let n = 1; n <= CANDIDATE_COUNT; n++) {
    const k = `cand${n}`;
    const name = (c[`${k}_name`] || '').trim();
    if (!name) continue;
    out.push({ n, name, office: c[`${k}_office`] || '', photo: c[`${k}_photo`] || '', photoAlt: c[`${k}_photo_alt`] || name, photoCredit: c[`${k}_photo_credit`] || '', blurb: c[`${k}_blurb`] || '', response1: c[`${k}_response1`] || '', response2: c[`${k}_response2`] || '', url: c[`${k}_url`] || '', button: c[`${k}_button`] || 'Campaign website' });
  }
  return out;
}

const MEMBER_COUNT = 20;
const MEMBER_SLOTS: Section[] = Array.from({ length: MEMBER_COUNT }, (_, i) => {
  const k = `member${i + 1}`;
  return {
    id: k,
    title: `Founding member ${i + 1}`,
    note: 'Leave the name blank to keep this slot hidden.',
    fields: [
      t(`${k}_name`, 'Name', '', 'Blank = not shown on the site.'),
      t(`${k}_local`, 'Residency line', '', 'Shown directly below the name, e.g. "15-year Larkspur resident".'),
    ],
  };
});
export type Member = { name: string; local: string };
export function membersFrom(c: Content): Member[] {
  const out: Member[] = [];
  for (let n = 1; n <= MEMBER_COUNT; n++) {
    const k = `member${n}`;
    const name = (c[`${k}_name`] || '').trim();
    if (!name) continue;
    out.push({ name, local: c[`${k}_local`] || '' });
  }
  return out;
}

export const PAGES: PageSchema[] = [
  {
    id: 'home',
    title: 'Home page',
    path: '/',
    sections: [
      {
        id: 'hero',
        title: 'Top of the page',
        fields: [
          ...img('hero_photo', 'Top photo (full width)', '/hero-larkspur-path.jpg', 'The paved Larkspur bike path leading toward Mt. Tamalpais on a clear day'),
          t('hero_photo_credit', 'Photographer credit (small text on the photo)', '', 'Required for some free photos. Leave blank if the photo needs no credit.'),
          url('hero_photo_source_url', 'Original photo link', ''),
          t('hero_photo_license', 'Photo license', ''),
          url('hero_photo_license_url', 'Photo license link', ''),
          t('hero_photo_credit_note', 'Photo credit note', '', 'For example, "cropped".'),
          t('hero_eyebrow', 'Small label above the name', 'Larkspur & Corte Madera, California'),
          t('hero_title', 'Big name on the photo', 'Larkspur Corte Madera Bicycle Alliance'),
          p('hero_intro', 'Intro paragraph (just below the photo)', 'The Larkspur Corte Madera Bicycle Alliance is a volunteer group of parents, riders and neighbors. We speak up for kids who ride, safer streets, and the trails and open space that make this place special.'),
        ],
      },
      {
        id: 'hero_saved',
        title: 'Saved for later (not shown on the site right now)',
        note: 'The old headline and header illustration, kept here in case you want them back.',
        fields: [
          t('hero_h1a', 'Old headline, first line', 'Mountain biking was born here.'),
          t('hero_h1b', 'Old headline, second line', "Let's keep our towns great for riding."),
          ...img('hero_bg', 'Old header illustration', '/header-marin.jpg', 'Illustration of young mountain bikers on a ridge trail above Southern Marin at sunset, looking out over Richardson Bay and San Francisco'),
        ],
      },
      {
        id: 'facts',
        title: 'Key facts strip',
        fields: [
          { key: 'facts_show', label: 'Show the key facts strip', type: 'toggle', default: 'no', help: 'Hidden for launch. Turn on to bring it back under the intro.' },
          t('fact1_num', 'Fact 1: big number', '1968'),
          t('fact1_label', 'Fact 1: label', 'Where it started'),
          p('fact1_text', 'Fact 1: details', 'Larkspur kids — the Larkspur Canyon Gang — helped invent mountain biking on Mt. Tam. [SOURCE TO ADD]'),
          t('fact2_num', 'Fact 2: big number', '2'),
          t('fact2_label', 'Fact 2: label', 'Towns, one community'),
          p('fact2_text', 'Fact 2: details', 'Our kids share schools, streets and trails across Larkspur and Corte Madera.'),
          t('fact3_num', 'Fact 3: big number', '100%'),
          t('fact3_label', 'Fact 3: label', 'Volunteer'),
          p('fact3_text', 'Fact 3: details', "No one is paid. We're neighbors doing this for the kids in our towns."),
        ],
      },
      {
        id: 'what',
        title: 'What we do',
        fields: [
          t('what_eyebrow', 'Small label', 'What we do'),
          t('what_title', 'Heading', 'A voice for everyone on two wheels'),
          p('what_intro', 'Intro paragraph', 'We live at the foot of one of the most famous riding landscapes in the world. We want every kid and family in Larkspur and Corte Madera to be able to enjoy it safely, close to home.'),
          ...img('what_image', 'Photo (optional)', '', 'Young riders standing in a line on a ridge trail with Mt. Tamalpais behind them'),
          ...img('what1_icon', 'Card 1: icon', '/icon-youth.png', 'Youth riding icon: a kid riding a pump track roller'),
          t('what1_title', 'Card 1: title', 'Youth riding'),
          p('what1_text', 'Card 1: text', 'More kids want to ride than our towns have room for. A local middle school team had to turn riders away last year. We support more places and programs for young riders to learn and build skills.'),
          t('what1_link', 'Card 1: link to the Bike Park page (leave blank to hide)', 'Our bike park project →'),
          ...img('what2_icon', 'Card 2: icon', '/icon-streets.png', 'Safe streets icon: a bicycle in a bike lane by a crosswalk'),
          t('what2_title', 'Card 2: title', 'Safe streets'),
          p('what2_text', 'Card 2: text', "Kids should be able to bike to school, practice and friends' houses safely. We back safe routes to school, better bike lanes and safer crossings."),
          ...img('what3_icon', 'Card 3: icon', '/icon-trails.png', 'Trails icon: a trail winding toward Mt. Tamalpais'),
          t('what3_title', 'Card 3: title', 'Trails & open space'),
          p('what3_text', 'Card 3: text', 'Mt. Tam and our local open space are part of who we are. We support trail access and teach young riders to respect and care for the land they ride on.'),
          ...img('what4_icon', 'Card 4: icon', '/icon-advocacy.png', 'Advocacy icon: a ballot going into a ballot box'),
          t('what4_title', 'Card 4: title', 'Elections & advocacy'),
          p('what4_text', 'Card 4: text', 'Decisions about where our kids ride are made at City Hall. We show up at council and commission meetings, and we endorse candidates who share our priorities.'),
        ],
      },
      {
        id: 'about',
        title: 'Who we are',
        fields: [
          t('about_eyebrow', 'Small label', 'Who we are'),
          t('about_title', 'Heading', 'Neighbors, parents, riders'),
          p('about_intro', 'Intro paragraph', 'The Larkspur Corte Madera Bicycle Alliance is a volunteer community effort.'),
          ...img('about_image', 'Photo (optional)', '', 'A group of young mountain bikers on a dirt trail, cheering with their arms raised'),
        ],
      },
      {
        id: 'join',
        title: 'Get involved (bottom of the page)',
        fields: [
          t('join_eyebrow', 'Small label', 'Get involved'),
          t('join_title1', 'Heading, first line (white)', 'Ride with us.'),
          t('join_title2', 'Heading, second line (orange)', 'Speak up with us.'),
          p('join_intro', 'Intro sentence', "The more neighbors who show up, the more our towns listen. Here's how to help:"),
          p('join_list', 'Ways to help (one per line)', 'Vote for our endorsed candidates on November 3\nSign to support our bike park project\nCome to City Council and commission meetings when riding is on the agenda\nTell your neighbors about the Alliance', 'Each line becomes a bullet. A line that mentions "bike park" links to the Bike Park page.'),
          ...img('join_image', 'Photo (optional)', '', 'Kids riding bikes in Larkspur'),
        ],
      },
    ],
  },
  {
    id: 'bike-park',
    title: 'Bike Park page',
    path: '/bike-park',
    sections: [
      {
        id: 'hero',
        title: 'Top of the page',
        fields: [
          t('hero_eyebrow', 'Small label above the headline', 'Our project · Piper Park, Larkspur'),
          t('hero_h1a', 'Headline, first line (white)', 'Mountain biking was born here.'),
          t('hero_h1b', 'Headline, second line (orange)', 'Our kids still have nowhere to learn.'),
          p('hero_intro', 'Intro paragraph', "We're working with the City of Larkspur to build a public pump track and progressive jump lines on the old dog park behind Hall Middle School — a safe, free place for local kids and families to build skills close to home."),
          ...img('hero_image', 'Main photo (optional)', '', 'Young mountain bikers cheering with their arms raised on a trail, with Mt. Tamalpais rising behind them'),
        ],
      },
      {
        id: 'facts',
        title: 'Key facts (white strip under the photo)',
        fields: [
          t('fact1_num', 'Fact 1: big number', '1968'),
          t('fact1_label', 'Fact 1: label', 'Where it started'),
          p('fact1_text', 'Fact 1: details', 'Larkspur kids — the Larkspur Canyon Gang — helped invent mountain biking on Mt. Tam. [SOURCE TO ADD]'),
          t('fact2_num', 'Fact 2: big number', '15 → 30'),
          t('fact2_label', 'Fact 2: label', 'Riders on one local team'),
          p('fact2_text', 'Fact 2: details', 'A local middle school team had to turn kids away last year and expects to double this season.'),
          t('fact3_num', 'Fact 3: big number', '2'),
          t('fact3_label', 'Fact 3: label', 'Commissions in support'),
          p('fact3_text', 'Fact 3: details', 'Larkspur and Corte Madera Parks & Recreation Commissions, July 2026.'),
          t('fact4_num', 'Fact 4: big number', '[XX] mi'),
          t('fact4_label', 'Fact 4: label', 'To the nearest pump track'),
          p('fact4_text', 'Fact 4: details', 'Families drive out of town just to practice the basics. [DISTANCE TO CONFIRM]'),
        ],
      },
      {
        id: 'need',
        title: 'The need',
        fields: [
          t('need_eyebrow', 'Small label', 'The need'),
          t('need_title', 'Heading', 'From zero to Mt. Tam, with nothing in between'),
          p('need_intro', 'Intro paragraph', 'Larkspur sits at the foot of one of the most famous mountain biking landscapes in the world. But new riders have no safe, local place to learn balance, cornering and jumping before they face steep, technical mountain trails.'),
          ...img('need_image', 'Photo (optional)', '', 'Young riders standing in a line on a ridge trail with Mt. Tamalpais behind them'),
          t('need1_title', 'Card 1: title', 'A safe first step'),
          p('need1_text', 'Card 1: text', 'Beginners currently learn on Mt. Tam itself. A pump track and progressive jump lines let kids build skills in a controlled space first.'),
          t('need2_title', 'Card 2: title', 'Demand is outgrowing space'),
          p('need2_text', 'Card 2: text', "Youth riding in Larkspur is growing fast. Teams are turning kids away, and there's no local facility to absorb them."),
          t('need3_title', 'Card 3: title', 'A pipeline to great programs'),
          p('need3_text', 'Card 3: text', 'Larkspur riders go on to the Redwood and Archie Williams high school mountain bike teams. [RANKINGS + SOURCE TO ADD]'),
          t('need4_title', 'Card 4: title', 'Free, for everyone'),
          p('need4_text', 'Card 4: text', 'A public facility for all ages and abilities — no club fees, no lift tickets, just a bike and a helmet.'),
        ],
      },
      {
        id: 'plan',
        title: 'The plan',
        fields: [
          t('plan_eyebrow', 'Small label', 'The plan'),
          t('plan_title', 'Heading', 'A pump track and jump lines at Piper Park'),
          p('plan_intro', 'Intro paragraph', 'The proposed site is the old dog park behind Hall Middle School — reachable by bike for hundreds of local kids, and a chance to turn a former dump site into a community asset.'),
          t('planA_title', 'Feature A: title', 'Pump track'),
          p('planA_text', 'Feature A: text', 'A loop of rollers and banked turns for all ages — bikes, scooters, skateboards. [SIZE TO ADD]'),
          t('planB_title', 'Feature B: title', 'Progressive jump lines'),
          p('planB_text', 'Feature B: text', 'Beginner to advanced lines so riders can progress safely, one step at a time. [SIZE TO ADD]'),
          t('plan_cost', 'Cost and funding line', 'Estimated cost: [COST TO ADD] · Funding: [GRANTS / DONORS TO ADD]'),
          ...img('plan_image', 'Site plan image', '', 'Concept site plan for the bike park at Piper Park'),
          t('plan_placeholder', 'Text shown when there is no site plan image', '[CONCEPT SITE PLAN — from the bike park contractor, coming soon]'),
        ],
      },
      {
        id: 'progress',
        title: 'Progress tracker',
        note: 'Set each step to Done, You are here, or Upcoming. The small label above each step is set separately (e.g. "Done · July 2026").',
        fields: [
          t('progress_eyebrow', 'Small label', 'Progress'),
          t('progress_title', 'Heading', 'Where we are'),
          p('progress_intro', 'Intro paragraph', "Building a public park is a step-by-step public process. Your voice matters most at the City Council stage — that's next."),
          ...([
            ['Community support', 'Ongoing', 'done'],
            ['Parks & Rec Commission support', 'Done · July 2026', 'done'],
            ['Concept plan', 'You are here', 'current'],
            ['City Council approval', 'Next', 'future'],
            ['Design, review & fundraising', 'Future', 'future'],
            ['Construction', 'Future', 'future'],
            ['Opening day', 'Future', 'future'],
          ] as const).flatMap(([name, tag, state], i) => [
            t(`step${i + 1}_name`, `Step ${i + 1}: name`, name),
            t(`step${i + 1}_tag`, `Step ${i + 1}: small label`, tag),
            { key: `step${i + 1}_state`, label: `Step ${i + 1}: status`, type: 'select' as const, default: state, options: STEP_STATES },
          ]),
        ],
      },
      {
        id: 'faq',
        title: 'FAQ',
        note: 'Leave a question blank to hide it.',
        fields: [
          t('faq_eyebrow', 'Small label', 'FAQ'),
          t('faq_title', 'Heading', 'Good questions, straight answers'),
          ...([
            ['Will it be noisy?', 'Pump tracks are quiet — riders move by pumping their bodies, not motors. No lighting is planned, so use ends at dusk. [CONFIRM WITH PLAN]'],
            ["Isn't the site a former dump?", '[ANSWER TO ADD — soil, capping and environmental review, once the plan is in]'],
            ['Who is liable if someone gets hurt?', "California law (Government Code § 831.7) generally protects cities from liability at public skate parks and pump tracks. Final details would be reviewed in the City's approval process."],
            ['Who pays for it?', '[ANSWER TO ADD — cost estimate and funding plan]'],
            ['', ''],
            ['', ''],
          ] as const).flatMap(([q, a], i) => [t(`faq${i + 1}_q`, `Question ${i + 1}`, q), p(`faq${i + 1}_a`, `Answer ${i + 1}`, a)]),
        ],
      },
      {
        id: 'join',
        title: 'Sign to support (bottom of the page)',
        fields: [
          t('join_eyebrow', 'Small label', 'Get involved'),
          t('join_title1', 'Heading, first line (white)', 'Add your name.'),
          t('join_title2', 'Heading, second line (orange)', 'Help us get to yes.'),
          p('join_intro', 'Intro paragraph', "Every name shows the City Council how many Larkspur and Corte Madera families want this. When the Council meeting is scheduled, we'll need you there to show up and speak."),
          ...img('join_image', 'Photo (optional)', '', 'Kids riding bikes in Larkspur'),
          t('support_count', 'Number of supporters (big number)', '700+'),
          p('support_line', 'Line under the number', 'neighbors have already signed on in support of a community bike park for Larkspur and Corte Madera.'),
          p('support_text', 'Card text', 'Add your name to show the City Council how much our community wants this, and check "receive updates" to hear when the Council meeting is scheduled. It takes about a minute.'),
          url('support_url', 'Sign to support form link', SUPPORT_FORM),
        ],
      },
    ],
  },
  {
    id: 'endorsements',
    title: 'Endorsements',
    path: '/#endorsements',
    sections: [
      {
        id: 'endorse_intro',
        title: 'Endorsements section (home page)',
        fields: [
          { key: 'endorse_show', label: 'Show the endorsements section on the site', type: 'toggle', default: 'yes', help: 'Turn off after the election to hide the section and its menu link.' },
          t('endorse_eyebrow', 'Small label', 'Larkspur City Council · November 3, 2026'),
          t('endorse_title', 'Heading', 'Our endorsements'),
          p('endorse_intro', 'Intro paragraph', 'The City Council shapes where our kids can ride, how safe our streets are, and how we care for our open space. These candidates understand why that matters to Larkspur families.'),
          t('endorse_vote', 'Vote reminder (orange line)', 'Vote Tuesday, November 3'),
          p('endorse_question1', 'Question 1', 'What are your thoughts on establishing one or more bike parks in Larkspur? What benefits or concerns do you see for our community?'),
          p('endorse_question2', 'Question 2', 'If elected, what specific actions would you be willing to take to help make a bike park a reality? For example, how would you approach identifying suitable locations, working with the community, and securing funding?'),
          ...img('endorse_banner', 'Banner (optional)', '', 'Candidates endorsed by the Larkspur Corte Madera Bicycle Alliance'),
        ],
      },
      ...CANDIDATE_SLOTS,
    ],
  },
  {
    id: 'members',
    title: 'Founding members',
    path: '/#about',
    sections: [
      {
        id: 'members_settings',
        title: 'Founding members (Who we are section)',
        note: 'Every founding member is edited here, in the order they appear on the site. To add a person, fill in the next empty slot.',
        fields: [
          t('founding_title', 'Heading above the list', 'Founding members'),
          p('founding_intro', 'Line under the heading', 'Thank you to the neighbors who helped start the Alliance.'),
          t('founding_cta', 'Button below the list', 'Become a Founding Member'),
        ],
      },
      ...MEMBER_SLOTS,
    ],
  },
  {
    id: 'support',
    title: 'Support page',
    path: '/support',
    sections: [
      {
        id: 'support_top',
        title: 'Top of the Support page',
        fields: [
          t('support_button', 'Button label (header and home page)', 'Contact Us'),
          t('support_eyebrow', 'Small label', 'Contact LCMBA'),
          t('support_title', 'Heading', 'Support LCMBA, Become a Founding Member, or Send Us a Message'),
          p('support_intro', 'Intro paragraph', 'Use our contact form to join the email list, become a founding member, or send us a note about biking in Larkspur and Corte Madera.'),
        ],
      },
      {
        id: 'support_form',
        title: 'The form',
        fields: [
          url('form_url', 'Contact Google Form link', '', 'Leave blank until the owner-controlled form is ready.'),
          t('form_link_title', 'Form card heading', 'Contact LCMBA'),
          p('form_link_text', 'Form card text', 'Tell us how you would like to get involved or what you would like to share.'),
          t('form_name_label', 'Name box label', 'Your name'),
          t('form_email_label', 'Email box label', 'Email'),
          t('form_news_label', 'Newsletter checkbox', 'Send me occasional news from LCMBA (a few emails a year, unsubscribe anytime)'),
          t('form_button', 'Button', 'Open Contact Form'),
          p('form_privacy', 'Small print under the button', 'You can choose whether to receive LCMBA updates.'),
          t('thanks_title', 'Thank-you heading', 'Thank you!'),
          p('thanks_text', 'Thank-you message', "You're on the list. Tell a neighbor: the more names we have, the more our towns listen."),
        ],
      },
      {
        id: 'support_more',
        title: 'What supporting us means (below the form)',
        note: 'Optional. Leave the heading and text blank to hide this part. Put a blank line between paragraphs.',
        fields: [
          t('support_more_title', 'Heading', ''),
          p('support_more_text', 'Text', ''),
          ...img('support_image', 'Photo (optional, beside the form)', '', 'Kids riding bikes in Larkspur'),
        ],
      },
    ],
  },
  {
    id: 'sponsors',
    title: 'Sponsors',
    path: '/#sponsors',
    sections: [
      {
        id: 'sponsors_intro',
        title: 'Sponsors section (home page, between About and Get Involved)',
        fields: [
          { key: 'sponsors_show', label: 'Show the sponsors section on the site', type: 'toggle', default: 'no', help: 'Also shows or hides the "Sponsors" menu link.' },
          t('sponsors_eyebrow', 'Small label', 'Our sponsors'),
          t('sponsors_title', 'Heading', 'Local businesses keeping kids riding'),
          p('sponsors_intro', 'Intro paragraph', 'These businesses help us put kids on bikes in Larkspur and Corte Madera. Please support them.'),
          t('sponsors_supporting_label', 'Label above the logo grid', 'Supporting sponsors', 'The grid only appears when at least one sponsor is set to "Supporting".'),
          t('sponsors_cta', 'Line at the bottom', 'Want to sponsor?'),
          t('sponsors_cta_link', 'Link text at the bottom', 'Get in touch', 'Opens an email to the contact email (Whole site tab). Without one, it jumps to Get Involved.'),
        ],
      },
      ...SPONSOR_SLOTS,
    ],
  },
  {
    id: 'site',
    title: 'Whole site',
    path: '/',
    sections: [
      {
        id: 'visibility',
        title: 'Hidden pages and sections',
        note: 'Turn these on to show parts of the site that are hidden for launch. Other switches live on their own tabs: Endorsements, Sponsors, and the Key facts strip on the Home page.',
        fields: [
          { key: 'bikepark_show', label: 'Show the Bike Park page', type: 'toggle', default: 'no', help: 'Off: the Bike Park page, its menu link, and the bike park links on the home page are hidden. Its content is kept on the Bike Park tab.' },
        ],
      },
      {
        id: 'contact',
        title: 'Contact and footer',
        fields: [
          { key: 'show_logo', label: 'Show the logo in the header', type: 'toggle', default: 'no', help: 'Off for launch. The logo files are kept on the site.' },
          url('contact_url', 'Contact Google Form link', '', 'Used for the public Contact us link. Leave blank to hide it.'),
          t('contact_email', 'Contact email', '', 'Shown in the footer and on the "Email us" button. Leave blank to hide them.'),
          t('footer_line', 'Footer text after the name', ''),
          t('footer_place', 'Footer location', 'Larkspur & Corte Madera, California'),
        ],
      },
    ],
  },
];

export function getSchema(id: PageId): PageSchema {
  const s = PAGES.find((pg) => pg.id === id);
  if (!s) throw new Error(`Unknown page ${id}`);
  return s;
}

export function defaultsFor(id: PageId): Content {
  const out: Content = {};
  for (const sec of getSchema(id).sections) for (const f of sec.fields) out[f.key] = f.default;
  return out;
}

export function mergeContent(id: PageId, saved: unknown): Content {
  const merged = defaultsFor(id);
  if (saved && typeof saved === 'object') {
    for (const [k, v] of Object.entries(saved as Record<string, unknown>)) {
      if (k in merged && typeof v === 'string') merged[k] = v;
    }
  }
  return merged;
}
