import Link from 'next/link';
import type { Content } from '@/lib/content';

export function SiteHeader({ current, showElection = true, showSponsors = false, showLogo = false, showBikePark = false, ctaLabel = 'Support LCMBA' }: { current?: 'home' | 'bike-park' | 'support'; showElection?: boolean; showSponsors?: boolean; showLogo?: boolean; showBikePark?: boolean; ctaLabel?: string }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="hdr">
        <Link href="/" className="logo">
          {showLogo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/logo-light.png" alt="" className="logo-img" width={540} height={224} />
          )}
          <span className="logo-top">
            Larkspur Corte Madera<span className="logo-sub">Bicycle Alliance</span>
          </span>
        </Link>
        <nav aria-label="Main" className="links">
          <Link href="/#what-we-do">What We Do</Link>
          {showBikePark && <Link href="/bike-park" aria-current={current === 'bike-park' ? 'page' : undefined}>Bike Park</Link>}
          {showElection && <Link href="/#endorsements">Endorsements</Link>}
          <Link href="/#about">About</Link>
          {showSponsors && <Link href="/#sponsors">Sponsors</Link>}
        </nav>
        <Link href="/support" className="cta" aria-current={current === 'support' ? 'page' : undefined}>{ctaLabel}</Link>
        </div>
      </header>
    </>
  );
}

export function SiteFooter({ site }: { site: Content }) {
  const contact = site.contact_url ? (
    <a href={site.contact_url} target="_blank" rel="noopener">Contact us</a>
  ) : site.contact_email ? (
    <a href={`mailto:${site.contact_email}`}>{site.contact_email}</a>
  ) : null;

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div>
          <strong>Larkspur Corte Madera Bicycle Alliance</strong>
          {site.footer_line ? ` · ${site.footer_line}` : ''}
        </div>
        <div>
          {contact}
          {contact && site.footer_place ? ' · ' : ''}
          {site.footer_place}
        </div>
      </div>
    </footer>
  );
}

// Shows a saved photo, or nothing when the field is empty.
export function Photo({ src, alt, className, lazy = true }: { src: string; alt: string; className?: string; lazy?: boolean }) {
  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} loading={lazy ? 'lazy' : undefined} />;
}
