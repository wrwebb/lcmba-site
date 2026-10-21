import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { loadContent } from '@/lib/static-content';
import { candidatesFrom, sponsorsFrom } from '@/lib/content';
import { SiteFooter, SiteHeader, Photo } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'Bike Park Project · Larkspur Corte Madera Bicycle Alliance',
  description: 'Our project to build a public pump track and progressive jump lines at Piper Park in Larkspur, CA.',
};

export default async function BikeParkPage() {
  const { 'bike-park': c, site, sponsors: sp, endorsements: en, support: su } = await loadContent(['bike-park', 'site', 'sponsors', 'endorsements', 'support']);
  if (site.bikepark_show !== 'yes') notFound();
  const facts = [1, 2, 3, 4].map((n) => ({ num: c[`fact${n}_num`], label: c[`fact${n}_label`], text: c[`fact${n}_text`] }));
  const cards = [1, 2, 3, 4].map((n) => ({ n, title: c[`need${n}_title`], text: c[`need${n}_text`] }));
  const steps = [1, 2, 3, 4, 5, 6, 7]
    .map((n) => ({ name: c[`step${n}_name`], tag: c[`step${n}_tag`], state: c[`step${n}_state`] || 'future' }))
    .filter((s) => s.name);
  const faqs = [1, 2, 3, 4, 5, 6].map((n) => ({ q: c[`faq${n}_q`], a: c[`faq${n}_a`] })).filter((f) => f.q);
  const sign = c.support_url;

  return (
    <>
      <SiteHeader current="bike-park" showElection={en.endorse_show !== 'no' && candidatesFrom(en).length > 0} showSponsors={sp.sponsors_show !== 'no' && sponsorsFrom(sp).length > 0} showLogo={site.show_logo === 'yes'} showBikePark ctaLabel={su.support_button} />

      <main id="main-content" tabIndex={-1}>
      <section id="top" className="hero">
        <div className="wrap row">
          <div className="col wide">
            <div className="eyebrow">{c.hero_eyebrow}</div>
            <h1>
              {c.hero_h1a}
              <span className="accent">{c.hero_h1b}</span>
            </h1>
            <p className="hero-intro">{c.hero_intro}</p>
            <div className="btns">
              {sign && <a href={sign} target="_blank" rel="noopener" className="btn btn-primary">Sign to support</a>}
              <a href="#need" className="btn btn-outline">Learn more</a>
            </div>
          </div>
          {c.hero_image && (
            <div className="col">
              <Photo src={c.hero_image} alt={c.hero_image_alt} className="photo" lazy={false} />
            </div>
          )}
        </div>
      </section>

      <section aria-label="Key facts" className="facts-wrap">
        <div className="facts">
          {facts.map((f, i) => (
            <div className="fact" key={i}>
              <div className="fact-num">{f.num}</div>
              <div className="fact-label">{f.label}</div>
              <div className="fact-sub">{f.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="need" className="section" style={{ paddingTop: 96 }}>
        <div className="wrap stack">
          <div className="row">
            <div className="col">
              <div className="eyebrow">{c.need_eyebrow}</div>
              <h2>{c.need_title}</h2>
              <p className="lead">{c.need_intro}</p>
            </div>
            {c.need_image && (
              <div className="col side">
                <Photo src={c.need_image} alt={c.need_image_alt} className="photo tall" />
              </div>
            )}
          </div>
          <div className="cards">
            {cards.map((card) => (
              <div className="card" key={card.n}>
                <div className="card-num">0{card.n}</div>
                <h3>{card.title}</h3>
                <p className="text">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plan" className="section white">
        <div className="wrap row top">
          <div className="col" style={{ gap: 20 }}>
            <div className="eyebrow">{c.plan_eyebrow}</div>
            <h2>{c.plan_title}</h2>
            <p className="lead" style={{ fontSize: 18 }}>{c.plan_intro}</p>
            {[
              ['A', c.planA_title, c.planA_text],
              ['B', c.planB_title, c.planB_text],
            ].map(([badge, title, text]) =>
              title ? (
                <div className="feature" key={badge}>
                  <div className="feature-badge">{badge}</div>
                  <div>
                    <div className="feature-title">{title}</div>
                    <p className="text">{text}</p>
                  </div>
                </div>
              ) : null,
            )}
            {c.plan_cost && <div className="small-muted">{c.plan_cost}</div>}
          </div>
          <div className="col wide">
            {c.plan_image ? (
              <Photo src={c.plan_image} alt={c.plan_image_alt} className="photo banner" />
            ) : (
              <div className="placeholder">{c.plan_placeholder}</div>
            )}
          </div>
        </div>
      </section>

      <section id="progress" className="section">
        <div className="wrap stack">
          <div className="col" style={{ maxWidth: 720, gap: 12 }}>
            <div className="eyebrow">{c.progress_eyebrow}</div>
            <h2>{c.progress_title}</h2>
            <p className="lead" style={{ fontSize: 18 }}>{c.progress_intro}</p>
          </div>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={i} className={`step ${s.state}`}>
                <div className="step-tag">{s.tag}</div>
                <div className="step-name">{s.name}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {faqs.length > 0 && (
        <section id="faq" className="section white">
          <div className="wrap narrow stack" style={{ gap: 28 }}>
            <div className="col" style={{ gap: 12 }}>
              <div className="eyebrow">{c.faq_eyebrow}</div>
              <h2>{c.faq_title}</h2>
            </div>
            <div className="faq">
              {faqs.map((f, i) => (
                <div className="faq-item" key={i}>
                  <h3>{f.q}</h3>
                  <p className="text">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="join" className="section dark">
        <div className="wrap row top">
          <div className="col">
            <div className="eyebrow">{c.join_eyebrow}</div>
            <h2>
              {c.join_title1}
              <span className="accent" style={{ color: 'var(--orange)' }}>{c.join_title2}</span>
            </h2>
            <p className="lead" style={{ fontSize: 18 }}>{c.join_intro}</p>
            <Photo src={c.join_image} alt={c.join_image_alt} className="photo" />
          </div>
          <div className="col support-card">
            <div className="eyebrow">Community support</div>
            <div className="support-num">{c.support_count}</div>
            <div className="support-line">{c.support_line}</div>
            <p className="text">{c.support_text}</p>
            {sign && (
              <>
                <a href={sign} target="_blank" rel="noopener" className="btn btn-primary btn-block" style={{ fontSize: 18 }}>Sign to support</a>
                <div className="small-muted" style={{ textAlign: 'center', fontSize: 14 }}>Opens a Google Form in a new tab</div>
              </>
            )}
          </div>
        </div>
      </section>
      </main>

      <SiteFooter site={site} />
    </>
  );
}
