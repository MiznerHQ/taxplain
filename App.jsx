import React, { useState, useRef } from "react";

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #F5F3EF;
    --ink: #1A1A18;
    --muted: #7A7A72;
    --accent: #1B4B8A;
    --accent-light: #EAF0FA;
    --warn: #B85C2A;
    --warn-light: #FDF0E8;
    --border: #DDD9D0;
    --white: #FFFFFF;
  }

  body { background: var(--bg); color: var(--ink); font-family: 'DM Sans', sans-serif; min-height: 100vh; }

  .app { max-width: 720px; margin: 0 auto; padding: 48px 24px 80px; }

  .header { margin-bottom: 52px; }

  .logo { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; }

  .logo-mark {
    width: 36px; height: 36px; background: var(--accent);
    border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }

  .logo-mark svg { width: 20px; height: 20px; fill: white; }

  .logo-text { font-family: 'DM Mono', monospace; font-size: 18px; font-weight: 500; letter-spacing: -0.5px; color: var(--ink); }
  .logo-text span { color: var(--accent); }

  .headline { font-family: 'DM Serif Display', serif; font-size: clamp(32px, 6vw, 48px); line-height: 1.1; letter-spacing: -1px; color: var(--ink); margin-bottom: 14px; }
  .headline em { font-style: italic; color: var(--accent); }

  .subline { font-size: 16px; color: var(--muted); line-height: 1.6; font-weight: 300; max-width: 520px; }

  .disclaimer {
    background: var(--warn-light); border: 1px solid #E8C9B0; border-radius: 10px;
    padding: 14px 18px; margin-bottom: 36px; display: flex; gap: 12px; align-items: flex-start;
  }
  .disclaimer-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  .disclaimer p { font-size: 13px; color: var(--warn); line-height: 1.5; }

  .search-section { margin-bottom: 36px; }

  .search-label {
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500;
    letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; display: block;
  }

  .search-row { display: flex; gap: 10px; }

  .search-input {
    flex: 1; padding: 14px 18px; font-family: 'DM Sans', sans-serif; font-size: 16px;
    color: var(--ink); background: var(--white); border: 1.5px solid var(--border);
    border-radius: 10px; outline: none; transition: border-color 0.2s; -webkit-appearance: none;
  }
  .search-input:focus { border-color: var(--accent); }
  .search-input::placeholder { color: #B0ADA6; }

  .search-btn {
    padding: 14px 24px; background: var(--accent); color: white; border: none;
    border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
    cursor: pointer; transition: background 0.2s, transform 0.1s; white-space: nowrap; flex-shrink: 0;
  }
  .search-btn:hover { background: #163d73; }
  .search-btn:active { transform: scale(0.98); }
  .search-btn:disabled { background: var(--border); color: var(--muted); cursor: not-allowed; transform: none; }

  .quick-picks { margin-top: 14px; display: flex; flex-wrap: wrap; gap: 8px; }

  .quick-label { font-size: 12px; color: var(--muted); font-family: 'DM Mono', monospace; letter-spacing: 0.5px; display: flex; align-items: center; margin-right: 4px; }

  .quick-chip {
    padding: 6px 14px; background: var(--white); border: 1px solid var(--border);
    border-radius: 20px; font-size: 13px; color: var(--ink); cursor: pointer;
    font-family: 'DM Mono', monospace; transition: all 0.15s;
  }
  .quick-chip:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }

  .result-card { background: var(--white); border: 1.5px solid var(--border); border-radius: 14px; overflow: hidden; animation: slideUp 0.3s ease; }

  @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  .result-header { background: var(--accent-light); border-bottom: 1px solid #C5D5EA; padding: 20px 24px; display: flex; align-items: center; gap: 14px; }

  .result-icon { width: 40px; height: 40px; background: var(--accent); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 18px; }

  .result-name { font-family: 'DM Serif Display', serif; font-size: 22px; color: var(--ink); line-height: 1.2; }
  .result-category { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--accent); letter-spacing: 1px; text-transform: uppercase; margin-top: 2px; }

  .result-body { padding: 24px; }
  .result-section { margin-bottom: 24px; }
  .result-section:last-child { margin-bottom: 0; }

  .section-label { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 1.8px; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }

  .section-content { font-size: 15px; line-height: 1.7; color: var(--ink); }

  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 4px; }

  .info-box { padding: 12px 16px; border-radius: 8px; border: 1px solid var(--border); }
  .info-box.blue { background: var(--accent-light); border-color: #C5D5EA; }
  .info-box.orange { background: var(--warn-light); border-color: #E8C9B0; }

  .info-box-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px; color: var(--muted); }
  .info-box.blue .info-box-label { color: var(--accent); }
  .info-box.orange .info-box-label { color: var(--warn); }
  .info-box-value { font-size: 14px; font-weight: 500; color: var(--ink); line-height: 1.5; }

  .action-box { background: #F0F7FF; border: 1px solid #C5DAFA; border-radius: 10px; padding: 16px; font-size: 14px; line-height: 1.65; color: #2C4A6E; }

  .loading-card { background: var(--white); border: 1.5px solid var(--border); border-radius: 14px; padding: 40px 24px; text-align: center; }

  .loading-spinner { width: 36px; height: 36px; border: 3px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px; }

  @keyframes spin { to { transform: rotate(360deg); } }

  .loading-text { font-family: 'DM Mono', monospace; font-size: 13px; color: var(--muted); letter-spacing: 0.5px; }

  .error-card { background: var(--warn-light); border: 1.5px solid #E8C9B0; border-radius: 14px; padding: 24px; color: var(--warn); font-size: 14px; line-height: 1.6; }

  .footer { margin-top: 60px; padding-top: 24px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; gap: 12px; }
  .footer-brand { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--muted); }
  .footer-note { font-size: 12px; color: var(--muted); text-align: right; }
  .divider { height: 1px; background: var(--border); margin: 20px 0; }

  @media (max-width: 480px) {
    .two-col { grid-template-columns: 1fr; }
    .search-row { flex-direction: column; }
    .search-btn { width: 100%; }
  }
`;

const QUICK_ITEMS = ["CP2000", "W-2", "1099-NEC", "Schedule C", "CP503", "401k", "HSA", "AMT"];

const SYSTEM_PROMPT = `You are TaxPlain, a friendly IRS tax code and notice explainer. When given a tax code, IRS notice number, tax form, or tax term, respond ONLY with a valid JSON object (no markdown, no backticks, no preamble) in this exact shape:

{
  "name": "Full official name of the tax code/notice/form/term",
  "category": "e.g. IRS Notice / Tax Form / Deduction / Tax Term / Penalty",
  "emoji": "one relevant emoji",
  "whatItIs": "2-3 sentences in plain English explaining what this is and why the IRS uses it.",
  "whoItAffects": "1-2 sentences describing which taxpayers typically see this.",
  "whatItMeans": "2-3 sentences explaining what this means for the average person — what triggered it, what it involves.",
  "whatToDoNow": "2-3 sentences of calm, practical next steps. What action should the person take, what deadlines matter, who should they contact. Always end with: 'A tax professional can help you respond correctly and protect your rights.'",
  "commonMistake": "1-2 sentences on the most common mistake people make when dealing with this."
}

If the input is not a real tax code, IRS notice, tax form, or tax term, return: {"error": "not_a_tax_item"}
Keep language plain, calm, and reassuring. Never give specific legal or financial advice. Never diagnose a tax situation.`;

export default function TaxPlain() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const decode = async (item) => {
    if (!item.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: item.trim() }],
        }),
      });

      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      if (parsed.error === "not_a_tax_item") {
        setError(`"${item}" doesn't appear to be a recognized tax code or IRS notice. Try something like CP2000, W-2, or Schedule C.`);
      } else {
        setResult(parsed);
      }
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => decode(query);
  const handleQuick = (t) => { setQuery(t); decode(t); };
  const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <>
      <style>{STYLE}</style>
      <div className="app">
        <header className="header">
          <div className="logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 7V3.5L18.5 9H13zM9 13h6v1H9v-1zm0 3h6v1H9v-1zm0-6h2v1H9v-1z"/>
              </svg>
            </div>
            <span className="logo-text">tax<span>plain</span></span>
          </div>
          <h1 className="headline">IRS notices & tax codes,<br /><em>finally explained.</em></h1>
          <p className="subline">Type any IRS notice number, tax form, or tax term and get a plain-English breakdown — what it means, who it affects, and what to do next.</p>
        </header>

        <div className="disclaimer">
          <span className="disclaimer-icon">⚠️</span>
          <p>For educational purposes only. TaxPlain does not provide tax, legal, or financial advice. Always consult a qualified tax professional about your specific situation.</p>
        </div>

        <div className="search-section">
          <label className="search-label">Enter a tax code, notice, or term</label>
          <div className="search-row">
            <input
              ref={inputRef}
              className="search-input"
              type="text"
              placeholder="e.g. CP2000, W-2, Schedule C, AMT..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className="search-btn" onClick={handleSubmit} disabled={loading || !query.trim()}>
              Decode
            </button>
          </div>
          <div className="quick-picks">
            <span className="quick-label">Common:</span>
            {QUICK_ITEMS.map(t => (
              <button key={t} className="quick-chip" onClick={() => handleQuick(t)}>{t}</button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="loading-card">
            <div className="loading-spinner" />
            <p className="loading-text">Decoding your tax item...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error-card">
            <strong>Hmm, we hit a snag.</strong><br />{error}
          </div>
        )}

        {result && !loading && (
          <div className="result-card">
            <div className="result-header">
              <div className="result-icon">{result.emoji}</div>
              <div>
                <div className="result-name">{result.name}</div>
                <div className="result-category">{result.category}</div>
              </div>
            </div>
            <div className="result-body">
              <div className="result-section">
                <div className="section-label">What it is</div>
                <div className="section-content">{result.whatItIs}</div>
              </div>
              <div className="divider" />
              <div className="result-section">
                <div className="section-label">Who it affects</div>
                <div className="two-col">
                  <div className="info-box blue">
                    <div className="info-box-label">👤 Affects</div>
                    <div className="info-box-value">{result.whoItAffects}</div>
                  </div>
                  <div className="info-box orange">
                    <div className="info-box-label">⚠️ Common Mistake</div>
                    <div className="info-box-value">{result.commonMistake}</div>
                  </div>
                </div>
              </div>
              <div className="divider" />
              <div className="result-section">
                <div className="section-label">What it means for you</div>
                <div className="section-content">{result.whatItMeans}</div>
              </div>
              <div className="divider" />
              <div className="result-section">
                <div className="section-label">What to do right now</div>
                <div className="action-box">{result.whatToDoNow}</div>
              </div>
            </div>
          </div>
        )}

        <footer className="footer">
          <span className="footer-brand">taxplain.co</span>
          <span className="footer-note">Not a substitute for professional tax advice.</span>
        </footer>
      </div>
    </>
  );
}
