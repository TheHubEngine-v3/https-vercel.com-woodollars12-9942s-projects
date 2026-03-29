/**
 * HUB ENGINE VIDEO FACTORY
 * 3 Agent System — Laptop Version
 * 
 * Run: node video-factory.js
 * 
 * Agent 1: Script Writer
 * Agent 2: Scene Builder + Remotion Video Creator  
 * Agent 3: Voice Artist
 */

require('dotenv').config();
const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const GROQ_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Actor descriptions for consistent visuals
const ACTORS = {
  'Lisa':   'Confident 38-year-old alluring Asian female presenter, long straight black hair, red silk button-up shirt, hand on hip, self-assured expression, futuristic studio background, cinematic lighting, photorealistic 4K — same woman, same red shirt, same hair in EVERY scene',
  'Alisha': 'Confident 38-year-old Mexican female news presenter, long dark brown hair, round glasses, sleeveless blue top, warm bright smile, wooden desk with coffee mug, warm studio lighting, photorealistic 4K — same woman, same glasses, same blue top in EVERY scene',
  'Susan':  'Professional blonde female news anchor in her 50s, short bob haircut, light blue button-up shirt, silver necklace, modern glass news desk with microphone, bright studio lighting, photorealistic 4K — same woman, same blue shirt, same news desk in EVERY scene',
  'Paul':   'Older white male in his 60s with full thick grey beard and glasses, blue t-shirt under denim overalls, podcast desk with coffee mug, ON AIR sign glowing red, professional podcast microphone, photorealistic 4K — same man, same beard, same overalls in EVERY scene'
};

// Call Groq API
async function callGroq(prompt, maxTokens = 1000) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: maxTokens,
      temperature: 0.8
    });

    const options = {
      hostname: 'api.groq.com',
      path: '/openai/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + GROQ_KEY,
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if(parsed.error) reject(new Error(parsed.error.message));
          else resolve(parsed.choices[0].message.content.trim());
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// Ask user a question
function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, answer => { rl.close(); resolve(answer); }));
}

// Build Remotion TSX component
function buildRemotionComponent(script, scenes, actorName, videoType, lengthSec) {
  const fps = 30;
  const durationFrames = lengthSec * fps;
  const sceneFrames = Math.floor(durationFrames / scenes.length);

  const sceneComponents = scenes.map((scene, i) => {
    const from = i * sceneFrames;
    return `
  {/* Scene ${i+1} */}
  <Sequence from={${from}} durationInFrames={${sceneFrames}}>
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #07070f 0%, #0e0e1a 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px'
    }}>
      {/* Scene number indicator */}
      <div style={{
        position: 'absolute', top: '20px', left: '20px',
        background: 'rgba(245,197,24,0.15)',
        border: '1px solid rgba(245,197,24,0.4)',
        borderRadius: '8px', padding: '6px 14px',
        color: '#f5c518', fontSize: '14px', fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif', letterSpacing: '2px'
      }}>
        SCENE ${i+1}/${scenes.length}
      </div>

      {/* Scene prompt display */}
      <div style={{
        color: 'rgba(238,238,245,0.7)',
        fontSize: '13px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        lineHeight: 1.6,
        maxWidth: '80%',
        opacity: interpolate(frame - ${from}, [0, 20], [0, 1]),
        transform: \`translateY(\${interpolate(frame - ${from}, [0, 20], [20, 0])}px)\`
      }}>
        ${scene.replace(/'/g, "\\'").substring(0, 120)}...
      </div>

      {/* Copy prompt instruction */}
      <div style={{
        position: 'absolute', bottom: '30px',
        color: '#f5c518', fontSize: '16px', fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif', letterSpacing: '1px',
        opacity: interpolate(frame - ${from}, [0, 15], [0, 1])
      }}>
        📋 Paste Scene ${i+1} prompt into Grok →
      </div>
    </AbsoluteFill>
  </Sequence>`;
  }).join('');

  return `import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

/**
 * HUB ENGINE VIDEO FACTORY
 * Generated by 3 Agent System
 * 
 * Actor: ${actorName}
 * Type: ${videoType}
 * Length: ${lengthSec} seconds
 * Scenes: ${scenes.length}
 * 
 * This composition shows each scene prompt for you to:
 * 1. Copy the prompt
 * 2. Paste into Grok to generate 6-sec clip
 * 3. Download all clips
 * 4. Join in Vmake
 */

export const VideoFactory = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: '#07070f', fontFamily: 'Arial, sans-serif' }}>
      
      {/* TITLE CARD */}
      <Sequence from={0} durationInFrames={60}>
        <AbsoluteFill style={{
          background: 'linear-gradient(135deg, #07070f, #0e0e1a)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            color: '#f5c518',
            fontSize: '36px', fontWeight: 'bold',
            letterSpacing: '4px', textAlign: 'center',
            opacity: interpolate(frame, [0, 20], [0, 1]),
            transform: \`scale(\${interpolate(frame, [0, 20], [0.8, 1])})\`
          }}>
            🏭 HUB ENGINE
          </div>
          <div style={{
            color: 'rgba(238,238,245,0.7)',
            fontSize: '16px', marginTop: '12px',
            letterSpacing: '2px',
            opacity: interpolate(frame, [15, 35], [0, 1])
          }}>
            VIDEO FACTORY — ${videoType.toUpperCase()}
          </div>
          <div style={{
            color: '#f5c518', fontSize: '14px',
            marginTop: '8px', opacity: interpolate(frame, [25, 45], [0, 1])
          }}>
            Actor: ${actorName} | ${lengthSec} seconds | ${scenes.length} scenes
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* SCENE PROMPTS */}
      ${sceneComponents}

      {/* FINAL CARD */}
      <Sequence from={${durationFrames - 90}} durationInFrames={90}>
        <AbsoluteFill style={{
          background: 'linear-gradient(135deg, #0a0a1a, #07070f)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: '40px'
        }}>
          <div style={{ color: '#10b981', fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '16px' }}>
            ✅ All ${scenes.length} Scene Prompts Ready!
          </div>
          <div style={{ color: 'rgba(238,238,245,0.7)', fontSize: '14px', textAlign: 'center', lineHeight: 2 }}>
            1. Copy each scene prompt<br/>
            2. Paste into Grok → Generate 6-sec clip<br/>
            3. Join all clips in Vmake<br/>
            4. Add voiceover → Review → Post! 💰
          </div>
        </AbsoluteFill>
      </Sequence>

    </AbsoluteFill>
  );
};
`;
}

// Save scenes to a text file for easy reference
function saveScenesToFile(scenes, script, voiceover, actorName, videoType) {
  const timestamp = new Date().toISOString().replace(/[:.]/g,'-').substring(0,19);
  const filename = `out/video-factory-${timestamp}.txt`;

  if(!fs.existsSync('out')) fs.mkdirSync('out');

  const content = `HUB ENGINE VIDEO FACTORY OUTPUT
Generated: ${new Date().toLocaleString()}
Actor: ${actorName} | Type: ${videoType}
${'='.repeat(60)}

SCRIPT (Agent 1):
${'-'.repeat(40)}
${script}

${'='.repeat(60)}
VOICEOVER (Agent 3):
${'-'.repeat(40)}
${voiceover}

${'='.repeat(60)}
SCENE PROMPTS FOR GROK (Agent 2) — ${scenes.length} scenes:
${'-'.repeat(40)}
${scenes.map((s,i) => `\nSCENE ${i+1}:\n${s}`).join('\n\n')}
`;

  fs.writeFileSync(filename, content);
  return filename;
}

// MAIN FUNCTION
async function main() {
  console.log('\n🏭 HUB ENGINE VIDEO FACTORY — 3 AGENT SYSTEM');
  console.log('='.repeat(50));

  if(!GROQ_KEY || GROQ_KEY === 'gsk_your_key_here') {
    console.log('\n❌ ERROR: Add your Groq API key to the .env file!');
    console.log('Create a .env file and add: GROQ_API_KEY=gsk_your_key_here');
    process.exit(1);
  }

  // Get user input
  console.log('\n📝 What video do you want to make?');
  console.log('Examples:');
  console.log('  "60-second Vidnoz affiliate promo with Lisa"');
  console.log('  "45-second business promo for Joe\'s Pizza Beaumont TX with Susan"');
  console.log('  "2-minute AI news show with Alisha about latest AI tools"');
  console.log('  "Paul podcast about AI for beginners 5 minutes"');
  console.log('');

  const prompt = await ask('Your video prompt: ');
  if(!prompt.trim()) { console.log('No prompt entered. Exiting.'); process.exit(0); }

  // Pick actor
  console.log('\nPick your actor:');
  console.log('1. Lisa (Confident Asian presenter)');
  console.log('2. Alisha (Warm Mexican presenter)');
  console.log('3. Susan (Professional news anchor)');
  console.log('4. Paul (Grandpa podcast host)');
  const actorChoice = await ask('Actor number (1-4): ');
  const actorNames = ['Lisa','Alisha','Susan','Paul'];
  const actorName = actorNames[parseInt(actorChoice)-1] || 'Lisa';

  // Pick length
  const lengthStr = await ask('\nVideo length in seconds (30/60/120/300): ');
  const lengthSec = parseInt(lengthStr) || 60;
  const numScenes = Math.max(3, Math.round(lengthSec/6));

  console.log('\n' + '='.repeat(50));
  console.log('🚀 STARTING 3 AGENT SYSTEM...');
  console.log('='.repeat(50));

  // ── AGENT 1: SCRIPT WRITER ──
  console.log('\n🤖 AGENT 1 — SCRIPT WRITER');
  console.log('Writing your script...');

  const scriptPrompt = `Write a ${lengthSec}-second video script for ${actorName} based on this request:
"${prompt}"

Rules:
- Complete spoken script ONLY — what ${actorName} actually says
- SLOW, CLEAR, and ENGAGING speech
- Perfect pacing for exactly ${lengthSec} seconds
- If affiliate marketing: end with "link in bio"
- If news show: professional anchor style
- If business promo: warm and community-focused
- If podcast: conversational and entertaining

Return ONLY the script text. No stage directions. No labels. Just what ${actorName} says.`;

  const script = await callGroq(scriptPrompt, 800);
  console.log('✅ Script written! (' + script.split(' ').length + ' words)');
  console.log('\nPREVIEW:', script.substring(0, 100) + '...');

  // ── AGENT 2: SCENE BUILDER ──
  console.log('\n🎬 AGENT 2 — SCENE BUILDER');
  console.log('Building ' + numScenes + ' scene prompts for Grok...');

  const actorDesc = ACTORS[actorName];
  const scenesPrompt = `Create exactly ${numScenes} Grok video generation prompts for:

Actor: ${actorName}
Video request: "${prompt}"
Script excerpt: "${script.substring(0,150)}..."

Character description (use in EVERY scene exactly as written):
${actorDesc}

Rules:
- Each scene = one 6-second video clip in Grok
- SAME actor, SAME outfit, SAME location every scene
- Different pose/expression/gesture each scene
- Very detailed prompts so Grok generates realistic video

Format as numbered list (1. 2. 3. etc):
1. [complete prompt with character description + specific action]
2. [complete prompt with character description + specific action]
[continue for all ${numScenes} scenes]`;

  const scenesText = await callGroq(scenesPrompt, 2000);
  const scenes = [];
  scenesText.split('\n').forEach(line => {
    const m = line.match(/^\d+[\.\)]\s*(.*)/);
    if(m && m[1].trim().length > 20) scenes.push(m[1].trim());
  });
  if(scenes.length === 0) {
    scenesText.split('\n').filter(l => l.trim().length > 30).forEach(l => scenes.push(l.trim()));
  }
  console.log('✅ ' + scenes.length + ' scene prompts ready!');

  // ── AGENT 3: VOICE ARTIST ──
  console.log('\n🎙️ AGENT 3 — VOICE ARTIST');
  console.log('Preparing voiceover version...');

  const voicePrompt = `Rewrite this script optimized for text-to-speech voiceover:

"${script}"

Rules:
- Keep exact same content and message
- Add natural pauses with ... between sentences
- Remove any action notes or stage directions
- Make it sound natural when read aloud
- Keep same length and energy level

Return ONLY the optimized voiceover text.`;

  const voiceover = await callGroq(voicePrompt, 600);
  console.log('✅ Voiceover text ready!');

  // ── BUILD REMOTION COMPONENT ──
  console.log('\n🎬 Building Remotion video composition...');
  const videoType = prompt.includes('news') ? 'AI News Show' :
                    prompt.includes('affiliate') || prompt.includes('promo') ? 'Affiliate Promo' :
                    prompt.includes('business') || prompt.includes('pizza') || prompt.includes('salon') ? 'Business Promo' :
                    prompt.includes('podcast') || prompt.includes('paul') ? 'Podcast' : 'Video';

  const tsx = buildRemotionComponent(script, scenes, actorName, videoType, lengthSec);

  // Save component
  if(!fs.existsSync('src/VideoFactory')) fs.mkdirSync('src/VideoFactory', {recursive:true});
  fs.writeFileSync('src/VideoFactory/VideoFactory.tsx', tsx);
  console.log('✅ Remotion component saved!');

  // Save all output to text file
  const outputFile = saveScenesToFile(scenes, script, voiceover, actorName, videoType);
  console.log('✅ All output saved to: ' + outputFile);

  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('🎉 ALL 3 AGENTS COMPLETE!');
  console.log('='.repeat(50));
  console.log('\n📋 YOUR SCENE PROMPTS FOR GROK:');
  console.log('-'.repeat(40));
  scenes.forEach((s,i) => {
    console.log('\nSCENE ' + (i+1) + ':');
    console.log(s.substring(0,120) + '...');
  });

  console.log('\n' + '='.repeat(50));
  console.log('📋 NEXT STEPS:');
  console.log('='.repeat(50));
  console.log('1. Open: ' + outputFile);
  console.log('2. Copy Scene 1 prompt → Paste into grok.com → Download clip');
  console.log('3. Repeat for all ' + scenes.length + ' scenes');
  console.log('4. Upload all clips to app.vmake.ai');
  console.log('5. Join clips into one video in Vmake');
  console.log('6. Add voiceover from the output file');
  console.log('7. Review → Download → Post to TikTok/YouTube! 💰');
  console.log('\n🏭 Hub Engine Video Factory — Three Minds. One Mission. Zero Cost.');
}

main().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
