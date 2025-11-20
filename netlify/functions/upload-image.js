const fetch = require('node-fetch');

// Netlify Function: upload-image
// Expects POST JSON: { filename: 'name.ext', content: '<base64 string>' }
// Commits the file to the repository under `public/images/<filename>` using GitHub Contents API.

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

  const { filename, content } = body;
  if (!filename || !content) {
    return { statusCode: 400, body: 'Missing filename or content' };
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO = process.env.GITHUB_REPO; // format owner/repo
  const BRANCH = process.env.GITHUB_BRANCH || 'main';

  if (!GITHUB_TOKEN || !GITHUB_REPO) {
    return { statusCode: 500, body: 'GITHUB_TOKEN and GITHUB_REPO environment variables are required' };
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
        'User-Agent': 'netlify-function'
      }
    });
    if (getRes.status === 200) {
      const getJson = await getRes.json();
      sha = getJson.sha;
    }

    const commitBody = {
      message: sha ? `Update image ${filename}` : `Add image ${filename}`,
      content: content,
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
      console.error('GitHub commit failed', putRes.status, errText);
      return { statusCode: 500, body: 'Failed to commit file to GitHub' };
    }

    // Build raw.githubusercontent URL so the frontend can use the file immediately
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${BRANCH}/public/images/${encodeURIComponent(filename)}`;

    // Optionally trigger a Netlify build hook so the deployed site picks up the new file
    const NETLIFY_BUILD_HOOK = process.env.NETLIFY_BUILD_HOOK;
    if (NETLIFY_BUILD_HOOK) {
      try {
        // Fire-and-forget: trigger build hook but don't fail the upload if it errors
        fetch(NETLIFY_BUILD_HOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename, path: `/images/${filename}`, rawUrl }) })
          .then(res => console.log('Triggered Netlify build hook', res.status))
          .catch(err => console.warn('Netlify build hook failed', err));
      } catch (e) {
        console.warn('Error triggering Netlify build hook', e);
      }
    }

    // Return both the local path and the raw URL
    return {
      statusCode: 200,
      body: JSON.stringify({ path: `/images/${filename}`, rawUrl })
    };
  } catch (error) {
    console.error('upload-image error', error);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};
