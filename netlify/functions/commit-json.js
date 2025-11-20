const fetch = require('node-fetch');

// Netlify Function: commit-json
// Expects POST JSON: { path: 'public/data/cms_leadership.json', content: '<raw json string>' }
// Commits the file to the repository under the given path using GitHub Contents API.

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { path, content, message } = body;
  if (!path || typeof content !== 'string') {
    return { statusCode: 400, body: 'Missing path or content' };
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO = process.env.GITHUB_REPO; // format owner/repo
  const BRANCH = process.env.GITHUB_BRANCH || 'main';

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return { statusCode: 500, body: 'GITHUB_TOKEN and GITHUB_REPO environment variables are required' };
  }

  const [owner, repo] = GITHUB_REPO.split('/');
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;

  try {
    // Check if file exists to obtain sha
    let sha = null;
    const getRes = await fetch(apiBase, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'User-Agent': 'netlify-function'
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
        'User-Agent': 'netlify-function',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commitBody)
    });

    if (!putRes.ok) {
      const errText = await putRes.text();
      console.error('GitHub commit-json failed', putRes.status, errText);
      return { statusCode: 500, body: 'Failed to commit JSON to GitHub' };
    }

    // Optionally trigger Netlify build hook
    const NETLIFY_BUILD_HOOK = process.env.NETLIFY_BUILD_HOOK;
    if (NETLIFY_BUILD_HOOK) {
      try {
        fetch(NETLIFY_BUILD_HOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ path }) })
          .then(res => console.log('Triggered Netlify build hook', res.status))
          .catch(err => console.warn('Netlify build hook failed', err));
      } catch (e) {
        console.warn('Error triggering Netlify build hook', e);
      }
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (error) {
    console.error('commit-json error', error);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};
