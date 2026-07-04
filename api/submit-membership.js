// Vercel Serverless Function: /api/submit-membership
// Proxies membership application submissions to the Google Apps Script web apps
// server-side. Browsers often fail to POST to script.google.com directly
// (CORS / redirect handling), which caused "Failed to submit" errors on the site.
//
// Expects POST JSON: { formType: 'individual' | 'joint' | 'group', ...fields }
// Data still lands in the same Google Sheets as before.

const FORM_URLS = {
  individual: 'https://script.google.com/macros/s/AKfycbxkZiuIzfyDdKgyTUCX3kNffyANvRPJY7Za0q7YJKKJye-ISC6la20y_bCiFo30VfmV7A/exec',
  joint: 'https://script.google.com/macros/s/AKfycbyleByh_jNzu5y1f6bApnJb7238Rwe2YWtGdOtXZNhY8cyLW-br0tFp8ppOCWYjNwP3cA/exec',
  group: 'https://script.google.com/macros/s/AKfycbxjQdo4azDlnTw9NCQcJtCbPxpPYqETMGhJFzMqetThlXwurXmO1hIL4xIbxqlYenTGAQ/exec'
};

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
    // Forward as form-encoded data, exactly as the Apps Script expects.
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(payload)) {
      params.append(key, value == null ? '' : String(value));
    }

    const upstream = await fetch(formUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
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
