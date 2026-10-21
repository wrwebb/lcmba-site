import type { Content, Sponsor } from '@/lib/content';
import { publicAsset } from '@/lib/public-asset';

function Logo({ s, className }: { s: Sponsor; className: string }) {
  return (
    <span className={`${className} ${s.logoBg === 'dark' ? 'is-dark' : ''}`}>
      {s.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={publicAsset(s.logo)} alt={s.logoAlt} loading="lazy" />
      ) : (
        <span className="sp-logo-name">{s.name}</span>
      )}
    </span>
  );
}

export function SponsorsSection({ c, sponsors, contactEmail, contactUrl }: { c: Content; sponsors: Sponsor[]; contactEmail: string; contactUrl: string }) {
  const featured = sponsors.filter((s) => s.level === 'featured');
  const supporting = sponsors.filter((s) => s.level !== 'featured');
  const ctaHref = contactUrl || (contactEmail ? `mailto:${contactEmail}?subject=Sponsoring%20the%20Bicycle%20Alliance` : '#join');
  const opensNewTab = /^https?:\/\//.test(ctaHref);
  return (
    <section id="sponsors" className="section white">
      <div className="wrap">
        <div className="eyebrow">{c.sponsors_eyebrow}</div>
        <h2>{c.sponsors_title}</h2>
        {c.sponsors_intro && <p className="lead sp-intro">{c.sponsors_intro}</p>}

        {featured.length > 0 && (
          <div className="sp-featured">
            {featured.map((s) => (
              <div className="sp-card" key={s.n}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener" className="sp-card-logo-link" aria-label={`${s.name} website`}>
                    <Logo s={s} className="sp-card-logo" />
                  </a>
                ) : (
                  <Logo s={s} className="sp-card-logo" />
                )}
                <div className="sp-card-body">
                  {s.badge && <span className="sp-badge">{s.badge}</span>}
                  <h3>{s.name}</h3>
                  {s.blurb && <p className="text">{s.blurb}</p>}
                  {s.url && (
                    <a href={s.url} target="_blank" rel="noopener" className="btn btn-primary sp-btn">Visit {s.name}</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {supporting.length > 0 && (
          <>
            {c.sponsors_supporting_label && <div className="sp-sublabel">{c.sponsors_supporting_label}</div>}
            <ul className="sp-grid">
              {supporting.map((s) => (
                <li key={s.n}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener" title={s.name}>
                      <Logo s={s} className="sp-tile" />
                    </a>
                  ) : (
                    <Logo s={s} className="sp-tile" />
                  )}
                </li>
              ))}
            </ul>
          </>
        )}

        {(c.sponsors_cta || c.sponsors_cta_link) && (
          <p className="sp-cta">
            {c.sponsors_cta}{' '}
            {c.sponsors_cta_link && (
              <a href={ctaHref} target={opensNewTab ? '_blank' : undefined} rel={opensNewTab ? 'noopener' : undefined}>
                {c.sponsors_cta_link}
              </a>
            )}
          </p>
        )}
      </div>
    </section>
  );
}
