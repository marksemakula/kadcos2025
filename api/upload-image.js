// Vercel Serverless Function: /api/upload-image
// Expects POST JSON: { filename: 'name.ext', content: '<base64 string>' }
// Commits the file to the repo under public/images/<filename> via GitHub Contents API.
// Same env vars as /api/commit-json. Max request body on Vercel: 4.5MB.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { filename, content } = req.body || {};
  if (!filename || !content) {
    return res.status(400).send('Missing filename or content');
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO = process.env.GITHUB_REPO; // format owner/repo
  const BRANCH = process.env.GITHUB_BRANCH || 'main';

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return res.status(500).send('GITHUB_TOKEN and GITHUB_REPO environment variables are required');
  }

  const [owner, repo] = GITHUB_REPO.split('/');
  const path = `public/images/${filename}`;
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;

  try {
    // Check if file already exists to get sha
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

    const commitBody = {
      message: sha ? `Update image ${filename}` : `Add image ${filename}`,
      content,
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
      console.error('GitHub commit failed', putRes.status, errText);
      return res.status(500).send('Failed to commit file to GitHub');
    }

    // Raw URL so the frontend can use the file immediately (before redeploy finishes)
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${BRANCH}/public/images/${encodeURIComponent(filename)}`;

    // Optional deploy hook (not needed on Git-connected Vercel projects)
    const DEPLOY_HOOK = process.env.DEPLOY_HOOK || process.env.NETLIFY_BUILD_HOOK;
    if (DEPLOY_HOOK) {
      fetch(DEPLOY_HOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, path: `/images/${filename}`, rawUrl })
      }).catch((err) => console.warn('Deploy hook failed', err));
    }

    return res.status(200).json({ path: `/images/${filename}`, rawUrl });
  } catch (error) {
    console.error('upload-image error', error);
    return res.status(500).send('Internal Server Error');
  }
}
