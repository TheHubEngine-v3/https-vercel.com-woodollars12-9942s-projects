/**
 * HUB ENGINE v3 — ElevenLabs Voice API
 * Vercel Serverless Function
 * File location in GitHub: api/voice.js
 *
 * This keeps your ElevenLabs API key secure on the server
 * Hub Engine calls this endpoint which then calls ElevenLabs
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, voice_id, model_id, voice_settings } = req.body;

  if (!text || !voice_id) {
    return res.status(400).json({ error: 'Missing text or voice_id' });
  }

  // API key stored securely in Vercel Environment Variables
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'ElevenLabs API key not configured' });
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text: text.substring(0, 500), // Safety limit
          model_id: model_id || 'eleven_turbo_v2',
          voice_settings: voice_settings || {
            stability: 0.70,
            similarity_boost: 0.82,
            style: 0.35,
            use_speaker_boost: true
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    // Stream audio back to Hub Engine
    const audioBuffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-cache');
    res.status(200).send(Buffer.from(audioBuffer));

  } catch (error) {
    console.error('ElevenLabs error:', error);
    res.status(500).json({ error: error.message });
  }
}
