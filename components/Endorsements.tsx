import type { Candidate, Content } from '@/lib/content';
import { publicAsset } from '@/lib/public-asset';

function ResponseText({ text }: { text: string }) {
  const blocks = text.trim().split(/\n\s*\n/).filter(Boolean);

  return blocks.map((block, blockIndex) => {
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
    if (lines.every((line) => line.startsWith('- '))) {
      return (
        <ul key={blockIndex}>
          {lines.map((line) => <li key={line}>{line.slice(2)}</li>)}
        </ul>
      );
    }
    return <p key={blockIndex}>{lines.join(' ')}</p>;
  });
}

export function EndorsementsSection({ c, candidates }: { c: Content; candidates: Candidate[] }) {
  return (
    <section id="endorsements" className="section white">
      <div className="wrap">
        {c.endorse_banner && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={publicAsset(c.endorse_banner)} alt={c.endorse_banner_alt} className="photo banner" style={{ marginBottom: 36 }} loading="lazy" />
        )}
        <div className="eyebrow">{c.endorse_eyebrow}</div>
        <h2>{c.endorse_title}</h2>
        {c.endorse_intro && <p className="lead en-intro">{c.endorse_intro}</p>}
        {c.endorse_vote && <p className="en-vote">{c.endorse_vote}</p>}
        <ul className={`en-grid count-${Math.min(candidates.length, 3)}`}>
          {candidates.map((k) => (
            <li className="en-card" key={k.n}>
              <div className="en-body">
                <div className="en-photo-frame">
                  {k.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={publicAsset(k.photo)} alt={k.photoAlt} className={`en-photo en-photo-cand-${k.n}`} loading="lazy" />
                  ) : (
                    <div className="en-photo en-photo-empty" aria-hidden="true">{k.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</div>
                  )}
                </div>
                {k.photoCredit && <p className="en-photo-credit">{k.photoCredit}</p>}
                <h3>{k.name}</h3>
                {k.office && <div className="en-office">{k.office}</div>}
                {k.blurb && <p className="text">{k.blurb}</p>}
                {k.response1 && k.response2 && (
                  <details className="en-responses">
                    <summary>
                      <span className="en-read">Read {k.name}’s full responses</span>
                      <span className="en-hide">Hide {k.name}’s full responses</span>
                    </summary>
                    <div className="en-response-body">
                      <section aria-labelledby={`candidate-${k.n}-question-1`}>
                        <h4 id={`candidate-${k.n}-question-1`}>{c.endorse_question1}</h4>
                        <ResponseText text={k.response1} />
                      </section>
                      <section aria-labelledby={`candidate-${k.n}-question-2`}>
                        <h4 id={`candidate-${k.n}-question-2`}>{c.endorse_question2}</h4>
                        <ResponseText text={k.response2} />
                      </section>
                    </div>
                  </details>
                )}
                {k.url && (
                  <a href={k.url} target="_blank" rel="noopener" className="btn btn-primary en-btn">{k.button}</a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
