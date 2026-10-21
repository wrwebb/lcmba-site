import Link from 'next/link';
import { loadContent } from '@/lib/static-content';
import { SiteFooter, SiteHeader, Photo } from '@/components/SiteChrome';
import { SponsorsSection } from '@/components/Sponsors';
import { EndorsementsSection } from '@/components/Endorsements';
import { candidatesFrom, membersFrom, sponsorsFrom } from '@/lib/content';

export default async function HomePage() {
  const { home: c, site, sponsors: sp, endorsements: en, members: mb, support: su } = await loadContent(['home', 'site', 'sponsors', 'endorsements', 'members', 'support']);
  const candidates = candidatesFrom(en);
  const showEndorse = en.endorse_show !== 'no' && candidates.length > 0;
  const sponsorList = sponsorsFrom(sp);
  const showSponsors = sp.sponsors_show !== 'no' && sponsorList.length > 0;
  const showFacts = c.facts_show === 'yes';
  const showBikePark = site.bikepark_show === 'yes';
  const facts = [1, 2, 3].map((n) => ({ num: c[`fact${n}_num`], label: c[`fact${n}_label`], text: c[`fact${n}_text`] }));
  const cards = [1, 2, 3, 4].map((n) => ({ n, title: c[`what${n}_title`], text: c[`what${n}_text`], icon: c[`what${n}_icon`] }));
  const members = membersFrom(mb);
  const helpLines = c.join_list.split('\n').map((l) => l.trim()).filter(Boolean).filter((l) => showBikePark || !/bike park/i.test(l));

  return (
    <>
      <SiteHeader current="home" showElection={showEndorse} showSponsors={showSponsors} showLogo={site.show_logo === 'yes'} showBikePark={showBikePark} ctaLabel={su.support_button} />

      <main id="main-content" tabIndex={-1}>
      <section
        id="top"
        className="hero-photo"
        style={c.hero_photo ? { backgroundImage: `url(${c.hero_photo})` } : undefined}
      >
        <div className="wrap hero-photo-inner">
          {c.hero_eyebrow && <div className="eyebrow">{c.hero_eyebrow}</div>}
          <h1 className="hero-name">{c.hero_title}</h1>
        </div>
        {c.hero_photo_credit && (
          <div className="hero-credit">
            Photo:{' '}
            {c.hero_photo_source_url ? (
              <a href={c.hero_photo_source_url} target="_blank" rel="noopener noreferrer">
                {c.hero_photo_credit}
              </a>
            ) : c.hero_photo_credit}
            {c.hero_photo_license && (
              <>
                {', '}
                {c.hero_photo_license_url ? (
                  <a href={c.hero_photo_license_url} target="_blank" rel="noopener noreferrer">
                    {c.hero_photo_license}
                  </a>
                ) : c.hero_photo_license}
              </>
            )}
            {c.hero_photo_credit_note ? ` (${c.hero_photo_credit_note})` : ''}
          </div>
        )}
      </section>

      <section id="intro" className="section intro">
        <div className="wrap intro-wrap">
          <p className="intro-lead">{c.hero_intro}</p>
          <div className="btns">
            <Link href="/support" className="btn btn-primary">{su.support_button}</Link>
            <a href="#what-we-do" className="btn btn-ghost">What we do</a>
          </div>
        </div>
      </section>

      {showFacts && (
        <section aria-label="Key facts" className="facts-wrap facts-plain">
          <div className="facts three">
            {facts.map((f, i) => (
              <div className="fact" key={i}>
                <div className="fact-num">{f.num}</div>
                <div className="fact-label">{f.label}</div>
                <div className="fact-sub">{f.text}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section id="what-we-do" className="section">
        <div className="wrap stack">
          <div className="row">
            <div className="col">
              <div className="eyebrow">{c.what_eyebrow}</div>
              <h2>{c.what_title}</h2>
              <p className="lead">{c.what_intro}</p>
            </div>
            {c.what_image && (
              <div className="col side">
                <Photo src={c.what_image} alt={c.what_image_alt} className="photo tall" />
              </div>
            )}
          </div>
          <div className="cards">
            {cards.map((card) => (
              <div className="card" key={card.n}>
                {card.icon ? <Photo src={card.icon} alt="" className="card-icon" /> : <div className="card-num">0{card.n}</div>}
                <h3>{card.title}</h3>
                <p className="text">{card.text}</p>
                {card.n === 1 && c.what1_link && showBikePark ? (
                  <Link href="/bike-park" className="card-link">{c.what1_link}</Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {showEndorse && <EndorsementsSection c={en} candidates={candidates} />}

      <section id="about" className="section">
        <div className="wrap stack">
          <div className="row">
            <div className="col">
              <div className="eyebrow">{c.about_eyebrow}</div>
              <h2>{c.about_title}</h2>
              <p className="lead" style={{ fontSize: 18 }}>{c.about_intro}</p>
            </div>
            {c.about_image && (
              <div className="col">
                <Photo src={c.about_image} alt={c.about_image_alt} className="photo" />
              </div>
            )}
          </div>
          {mb.founding_title && (
            <div className="founders-head">
              <h3 className="founders-title">{mb.founding_title}</h3>
              {mb.founding_intro && <p className="text">{mb.founding_intro}</p>}
            </div>
          )}
          {members.length > 0 && (
            <div className="founders">
              <ul className="founders-list">
                {members.map((member) => (
                  <li key={member.name}>
                    <span className="founder-name">{member.name}</span>
                    {member.local && <span className="founder-town">{member.local}</span>}
                  </li>
                ))}
              </ul>
              {mb.founding_cta && site.contact_url && (
                <a href={site.contact_url} target="_blank" rel="noopener" className="btn btn-primary founders-cta">
                  {mb.founding_cta}
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {showSponsors && <SponsorsSection c={sp} sponsors={sponsorList} contactEmail={site.contact_email} contactUrl={site.contact_url} />}

      <section id="join" className="section dark">
        <div className="wrap row">
          <div className="col">
            <div className="eyebrow">{c.join_eyebrow}</div>
            <h2>
              {c.join_title1}
              <span className="accent">{c.join_title2}</span>
            </h2>
            <p className="lead" style={{ fontSize: 18 }}>{c.join_intro}</p>
            {helpLines.length > 0 && (
              <ul className="join-list">
                {helpLines.map((line, i) => (
                  <li key={i}>{/bike park/i.test(line) ? <Link href="/bike-park">{line}</Link> : line}</li>
                ))}
              </ul>
            )}
            <Link href="/support" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 6 }}>{su.support_button}</Link>
          </div>
          {c.join_image && (
            <div className="col">
              <Photo src={c.join_image} alt={c.join_image_alt} className="photo" />
            </div>
          )}
        </div>
      </section>
      </main>

      <SiteFooter site={site} />
    </>
  );
}
