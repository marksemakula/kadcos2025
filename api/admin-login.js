// Vercel Serverless Function: /api/admin-login
// Expects POST JSON: { email, password }
// Checks credentials against server-side env vars so they never ship in the client bundle.
//
// Required env vars (Vercel → Project → Settings → Environment Variables):
//   ADMIN_EMAIL
//   ADMIN_PASSWORD

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: { message: 'Email and password are required' } });
  }

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    return res.status(500).json({ error: { message: 'Admin credentials are not configured' } });
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: { message: 'Invalid email or password' } });
  }

  return res.status(200).json({
    user: { id: 1, email, name: 'KADCOS Admin', role: 'admin' }
  });
}
