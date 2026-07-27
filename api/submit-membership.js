// Vercel Serverless Function: /api/submit-membership
// Proxies membership application submissions to the Google Apps Script web apps
// server-side. Browsers often fail to POST to script.google.com directly
// (CORS / redirect handling), which caused "Failed to submit" errors on the site.
//
// Expects POST JSON: { formType: 'individual' | 'joint' | 'group', ...fields }
// Data still lands in the same Google Sheets as before.

// These deployment URLs were regenerated on 2026-07-27: the previous deployments'
// OAuth authorization had lapsed (Google was returning a bare 403 "Access denied"
// before the script even ran — 0 executions logged). Re-authorizing requires a
// human clicking through Google's consent screen, so if this ever breaks again,
// the fix is: open the Apps Script project -> Deploy -> New deployment -> Web app
// (Execute as: Me, Who has access: Anyone) -> Authorize access, then update the
// URL below.
const FORM_URLS = {
  individual: 'https://script.google.com/macros/s/AKfycbyyzbG_K560_Y1FS9m2FKpV7bQOjfSWPdWrc1IzDTcT9y5H2isFvBZ1d1IPU3GpxhuUmw/exec',
  joint: 'https://script.google.com/macros/s/AKfycbw4xjVgh6mrsbyJGel46XYBKeQkkpqKGPgk8IJO6_Bb9r2icuD3VSsgYMhFUBI8XjsGbg/exec',
  group: 'https://script.google.com/macros/s/AKfycbzPo2IBMaGk88y9QbW1fh9lXfo4mjnTOo2n0DpcGQOZT8UX3h0KDTjDKB71ErDr-gOG8Q/exec'
};

// The three Apps Script projects were written independently and don't parse the
// request body the same way: "individual" unconditionally JSON.parse()s
// e.postData.contents, while "joint" and "group" read e.parameter (i.e. they
// expect application/x-www-form-urlencoded). Sending the wrong format to either
// causes it to fail silently or throw inside the script.
const JSON_BODY_FORM_TYPES = new Set(['individual']);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const payload = req.body || {};
  const formUrl = FORM_URLS[payload.formType];
  if (!formUrl) {
    return res.status(400).json({ success: false, error: 'Unknown or missing formType' });
  }

  try {
    const useJsonBody = JSON_BODY_FORM_TYPES.has(payload.formType);

    let body;
    let contentType;
    if (useJsonBody) {
      body = JSON.stringify(payload);
      contentType = 'application/json';
    } else {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(payload)) {
        params.append(key, value == null ? '' : String(value));
      }
      body = params.toString();
      contentType = 'application/x-www-form-urlencoded';
    }

    const upstream = await fetch(formUrl, {
      method: 'POST',
      headers: { 'Content-Type': contentType },
      body,
      redirect: 'follow' // Apps Script redirects to script.googleusercontent.com
    });

    const text = await upstream.text();

    // Apps Script may return JSON or an HTML page; try JSON first.
    let result = null;
    try {
      result = JSON.parse(text);
    } catch (e) {
      // Non-JSON response: treat HTTP success as submission success.
      result = { success: upstream.ok, raw: text.substring(0, 300) };
    }

    if (upstream.ok && result.success !== false) {
      return res.status(200).json({ success: true });
    }

    console.error('Apps Script submission failed', upstream.status, text.substring(0, 500));
    return res.status(502).json({ success: false, error: result.error || `Upstream returned ${upstream.status}` });
  } catch (error) {
    console.error('submit-membership error', error);
    return res.status(500).json({ success: false, error: 'Internal error submitting application' });
  }
}
