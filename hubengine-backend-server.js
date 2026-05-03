// ═══════════════════════════════════════════════════════════════════════════
// HubEngine Backend — YouTube OAuth + Upload Server
// Hosted on Render (free tier) — handles what browsers can't
// ═══════════════════════════════════════════════════════════════════════════

const express  = require('express');
const cors     = require('cors');
const fetch    = require('node-fetch');
const FormData = require('form-data');
const app      = express();

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '500mb' }));

const PORT         = process.env.PORT || 3000;
const REDIRECT_URI = process.env.REDIRECT_URI || 'https://hubengine-backend.onrender.com/youtube/callback';

// ── Direct redirect to Google OAuth (browser opens this) ─────────────────
app.get('/youtube/auth-url-redirect', (req, res) => {
  const { client_id } = req.query;
  if (!client_id) return res.status(400).send('client_id required');
  const scope   = 'https://www.googleapis.com/auth/youtube.upload';
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${encodeURIComponent(client_id)}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent(scope)}` +
    `&access_type=offline` +
    `&prompt=consent`;
  res.redirect(authUrl);
});

// ── Health check ──────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'HubEngine Backend Running',
    version: '1.0.0',
    endpoints: ['/youtube/auth-url', '/youtube/callback', '/youtube/token', '/youtube/refresh', '/youtube/upload']
  });
});

// ── Step 1: Generate Google OAuth URL ────────────────────────────────────
// Hub Engine calls this to get the URL to send user to Google
app.post('/youtube/auth-url', (req, res) => {
  const { client_id } = req.body;
  if (!client_id) return res.status(400).json({ error: 'client_id required' });

  const scope    = 'https://www.googleapis.com/auth/youtube.upload';
  const authUrl  = `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${encodeURIComponent(client_id)}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent(scope)}` +
    `&access_type=offline` +
    `&prompt=consent`;

  res.json({ auth_url: authUrl });
});

// ── Step 2: OAuth callback — Google redirects here with code ─────────────
// After user approves, Google redirects to this URL with ?code=XXX
app.get('/youtube/callback', async (req, res) => {
  const { code, error } = req.query;

  if (error) {
    return res.send(`
      <html><body style="font-family:sans-serif;background:#0c0f1a;color:#fff;padding:40px;text-align:center">
        <h2 style="color:#ff4d6d">❌ Authorization Failed</h2>
        <p>Error: ${error}</p>
        <p>Close this tab and try again in Hub Engine Settings.</p>
      </body></html>
    `);
  }

  if (!code) {
    return res.send(`
      <html><body style="font-family:sans-serif;background:#0c0f1a;color:#fff;padding:40px;text-align:center">
        <h2 style="color:#ff4d6d">❌ No Code Received</h2>
        <p>Close this tab and try again.</p>
      </body></html>
    `);
  }

  // Show the code to the user — Hub Engine will pick it up
  res.send(`
    <html>
    <head><title>HubEngine — YouTube Connected</title></head>
    <body style="font-family:Georgia,serif;background:#0c0f1a;color:#fff;padding:40px;text-align:center;max-width:600px;margin:0 auto">
      <div style="background:rgba(0,212,170,.1);border:2px solid #00d4aa;border-radius:16px;padding:30px;margin-top:40px">
        <div style="font-size:48px;margin-bottom:16px">✅</div>
        <h2 style="color:#00d4aa;margin-bottom:8px">YouTube Authorized!</h2>
        <p style="color:rgba(255,255,255,.7);margin-bottom:24px">Copy the code below and paste it into Hub Engine Settings → YouTube section</p>
        <div style="background:#1a1a2e;border:1px solid #00d4aa;border-radius:8px;padding:16px;margin-bottom:16px">
          <div style="font-size:11px;color:#00d4aa;font-weight:700;margin-bottom:8px;letter-spacing:.1em">YOUR AUTHORIZATION CODE</div>
          <div id="code" style="font-family:monospace;font-size:13px;word-break:break-all;color:#f5c518">${code}</div>
        </div>
        <button onclick="navigator.clipboard.writeText('${code}').then(()=>{this.textContent='✅ Copied!';this.style.background='#00d4aa'})"
          style="background:#ff4d6d;color:#fff;border:none;border-radius:8px;padding:14px 28px;font-size:16px;font-weight:700;cursor:pointer;width:100%">
          📋 Copy Code
        </button>
        <p style="color:rgba(255,255,255,.4);font-size:12px;margin-top:16px">After copying, go back to Hub Engine and paste this code to complete the connection.</p>
      </div>
    </body>
    </html>
  `);
});

// ── Step 3: Exchange code for tokens ─────────────────────────────────────
app.post('/youtube/token', async (req, res) => {
  const { code, client_id, client_secret } = req.body;
  if (!code || !client_id || !client_secret) {
    return res.status(400).json({ error: 'code, client_id and client_secret required' });
  }

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `code=${encodeURIComponent(code)}&client_id=${encodeURIComponent(client_id)}&client_secret=${encodeURIComponent(client_secret)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&grant_type=authorization_code`
    });

    const data = await response.json();
    if (data.error) return res.status(400).json({ error: data.error_description || data.error });

    // Get channel name
    const chRes  = await fetch('https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true', {
      headers: { Authorization: `Bearer ${data.access_token}` }
    });
    const chData = await chRes.json();
    const channelName = chData.items?.[0]?.snippet?.title || 'Your Channel';

    res.json({
      access_token:  data.access_token,
      refresh_token: data.refresh_token,
      expires_in:    data.expires_in,
      channel_name:  channelName
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Step 4: Refresh access token ─────────────────────────────────────────
app.post('/youtube/refresh', async (req, res) => {
  const { refresh_token, client_id, client_secret } = req.body;
  if (!refresh_token || !client_id || !client_secret) {
    return res.status(400).json({ error: 'refresh_token, client_id and client_secret required' });
  }

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `refresh_token=${encodeURIComponent(refresh_token)}&client_id=${encodeURIComponent(client_id)}&client_secret=${encodeURIComponent(client_secret)}&grant_type=refresh_token`
    });

    const data = await response.json();
    if (data.error) return res.status(400).json({ error: data.error_description || data.error });

    res.json({
      access_token: data.access_token,
      expires_in:   data.expires_in
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Step 5: Upload video to YouTube ──────────────────────────────────────
// Receives the Shotstack video URL + metadata, uploads to YouTube
app.post('/youtube/upload', async (req, res) => {
  const { video_url, title, description, tags, access_token } = req.body;
  if (!video_url || !title || !access_token) {
    return res.status(400).json({ error: 'video_url, title and access_token required' });
  }

  try {
    // Download video from Shotstack
    const videoRes  = await fetch(video_url);
    const videoBlob = await videoRes.buffer();

    const meta = {
      snippet: {
        title:       title.substring(0, 100),
        description: description || '',
        tags:        (tags || '').split(',').map(t => t.trim()).filter(Boolean).slice(0, 15),
        categoryId:  '22' // People & Blogs
      },
      status: {
        privacyStatus:            'public',
        selfDeclaredMadeForKids:  false
      }
    };

    // Initiate resumable upload
    const initRes = await fetch(
      'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
      {
        method:  'POST',
        headers: {
          'Authorization':           `Bearer ${access_token}`,
          'Content-Type':            'application/json',
          'X-Upload-Content-Type':   'video/mp4',
          'X-Upload-Content-Length': String(videoBlob.length)
        },
        body: JSON.stringify(meta)
      }
    );

    if (!initRes.ok) {
      const e = await initRes.text();
      return res.status(initRes.status).json({ error: `YouTube init failed: ${e.substring(0, 200)}` });
    }

    const uploadUrl = initRes.headers.get('location');
    if (!uploadUrl) return res.status(500).json({ error: 'YouTube did not return upload URL' });

    // Upload video bytes
    const uploadRes = await fetch(uploadUrl, {
      method:  'PUT',
      headers: { 'Content-Type': 'video/mp4' },
      body:    videoBlob
    });

    if (!uploadRes.ok) {
      const e = await uploadRes.text();
      return res.status(uploadRes.status).json({ error: `YouTube upload failed: ${e.substring(0, 200)}` });
    }

    const uploadData = await uploadRes.json();
    const videoId    = uploadData.id;

    res.json({
      success:     true,
      video_id:    videoId,
      youtube_url: videoId ? `https://youtube.com/watch?v=${videoId}` : null
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`HubEngine Backend running on port ${PORT}`);
});
