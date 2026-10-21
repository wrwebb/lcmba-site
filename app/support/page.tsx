import type { Metadata } from 'next';
import { loadContent } from '@/lib/static-content';
import { SiteFooter, SiteHeader, Photo } from '@/components/SiteChrome';
import { candidatesFrom, sponsorsFrom } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact LCMBA · Larkspur Corte Madera Bicycle Alliance',
  description: 'Support LCMBA, become a founding member, or send us a message.',
  alternates: { canonical: '/support' },
  openGraph: { url: '/support' },
};

export default async function SupportPage() {
  const { support: c, site, sponsors: sp, endorsements: en } = await loadContent(['support', 'site', 'sponsors', 'endorsements']);
  const moreParas = (c.support_more_text || '').split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean);

  return (
    <>
      <SiteHeader
        current="support"
        showElection={en.endorse_show !== 'no' && candidatesFrom(en).length > 0}
        showSponsors={sp.sponsors_show !== 'no' && sponsorsFrom(sp).length > 0}
        showLogo={site.show_logo === 'yes'}
        showBikePark={site.bikepark_show === 'yes'}
        ctaLabel={c.support_button}
      />

      <main id="main-content" tabIndex={-1}>
      <section className="section support-top">
        <div className="wrap support-grid">
          <div className="support-copy">
            <div className="eyebrow">{c.support_eyebrow}</div>
            <h1 className="support-h1">{c.support_title}</h1>
            {c.support_intro && <p className="lead">{c.support_intro}</p>}
            {c.support_image && <Photo src={c.support_image} alt={c.support_image_alt} className="photo support-photo" />}
          </div>
          <div className="sf-card">
            <h2 className="sf-thanks">{c.form_link_title}</h2>
            {c.form_link_text && <p className="text">{c.form_link_text}</p>}
            {c.form_url ? (
              <a href={c.form_url} target="_blank" rel="noopener" className="btn btn-primary btn-block sf-btn">
                {c.form_button}
              </a>
            ) : (
              <span className="btn btn-primary btn-block sf-btn" aria-disabled="true">
                {c.form_button}
              </span>
            )}
            {c.form_url ? (
              <p className="sf-privacy">Opens a Google Form in a new tab. {c.form_privacy}</p>
            ) : (
              <p className="sf-privacy" role="status">The signup form is being connected. Please check back soon.</p>
            )}
          </div>
        </div>
      </section>

      {(c.support_more_title || moreParas.length > 0) && (
        <section className="section white">
          <div className="wrap support-more">
            {c.support_more_title && <h2>{c.support_more_title}</h2>}
            {moreParas.map((t, i) => (
              <p key={i} className="lead" style={{ fontSize: 18 }}>{t}</p>
            ))}
          </div>
        </section>
      )}
      </main>

      <SiteFooter site={site} />
    </>
  );
}
