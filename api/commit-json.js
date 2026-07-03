// Vercel Serverless Function: /api/commit-json
// Expects POST JSON: { path: 'public/data/cms_leadership.json', content: '<raw json string>', message? }
// Commits the file to the GitHub repo using the Contents API.
//
// Required env vars (Vercel → Project → Settings → Environment Variables):
//   GITHUB_TOKEN   fine-grained token with contents:write on the repo
//   GITHUB_REPO    e.g. marksemakula/kadcos2025
//   GITHUB_BRANCH  optional, defaults to 'main'
//   DEPLOY_HOOK    optional. NOT needed when the Vercel project is connected to
//                  the GitHub repo — the commit itself triggers a redeploy.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { path, content, message } = req.body || {};
  if (!path || typeof content !== 'string') {
    return res.status(400).send('Missing path or content');
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO = process.env.GITHUB_REPO; // format owner/repo
  const BRANCH = process.env.GITHUB_BRANCH || 'main';

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return res.status(500).send('GITHUB_TOKEN and GITHUB_REPO environment variables are required');
  }

  const [owner, repo] = GITHUB_REPO.split('/');
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;

  try {
    // Check if file exists to obtain sha
    let sha = null;
    const getRes = await fetch(apiBase, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'User-Agent': 'kadcos-cms'
      }
    });
    if (getRes.status === 200) {
      const getJson = await getRes.json();
      sha = getJson.sha;
    }

    const encoded = Buffer.from(content).toString('base64');
    const commitBody = {
      message: message || (sha ? `Update ${path}` : `Add ${path}`),
      content: encoded,
      branch: BRANCH,
      committer: {
        name: 'KADCOS CMS Bot',
        email: 'noreply@kadcos.example'
      }
    };
    if (sha) commitBody.sha = sha;

    const putRes = await fetch(apiBase, {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'User-Agent': 'kadcos-cms',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commitBody)
    });

    if (!putRes.ok) {
      const errText = await putRes.text();
      console.error('GitHub commit-json failed', putRes.status, errText);
      return res.status(500).send('Failed to commit JSON to GitHub');
    }

    // Optional deploy hook (not needed on Git-connected Vercel projects)
    const DEPLOY_HOOK = process.env.DEPLOY_HOOK || process.env.NETLIFY_BUILD_HOOK;
    if (DEPLOY_HOOK) {
      fetch(DEPLOY_HOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path })
      }).catch((err) => console.warn('Deploy hook failed', err));
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('commit-json error', error);
    return res.status(500).send('Internal Server Error');
  }
}
