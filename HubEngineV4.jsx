import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard, Wrench, Tv, DollarSign, Users,
  LogOut, Lock, Copy, RefreshCw, Zap, ExternalLink,
  Star, TrendingUp, Play, CheckCircle, ChevronRight,
  Video, Mail, Hash, FileText, Mic, Globe, Target,
  Sparkles, Camera, Radio, Award, BarChart3, Rocket,
  Shield, Eye, EyeOff, ArrowRight, Flame, Crown
} from "lucide-react";

// ─── CONSTANTS ────────────────────────────────────────────────
const PASSWORD = "HubV4";

const TOOLS = [
  { id:"script",      emoji:"🎬", name:"Video Script Writer",     cat:"Video",     color:"#f0a500", desc:"Full video scripts with Hook → Body → CTA",         sys:"You are an expert short-form video script writer for AI content channels. Write a complete, engaging video script with clearly labeled sections: 🎣 HOOK (0-3s), 📦 BODY (3-50s), 🚀 CTA (50-60s). Use punchy language, active voice, and keep it under 60 seconds total. Format cleanly." },
  { id:"titles",      emoji:"🔥", name:"Viral Title Generator",    cat:"Video",     color:"#ef4444", desc:"5 click-worthy titles per video",                    sys:"You are a viral content strategist. Generate exactly 5 numbered YouTube/social titles using different psychological hooks: 1) Curiosity gap, 2) Urgency/FOMO, 3) Value promise, 4) Controversy/Bold claim, 5) Social proof. Make each irresistibly clickable." },
  { id:"description", emoji:"📝", name:"SEO Description Writer",   cat:"Video",     color:"#8b5cf6", desc:"Keyword-rich video descriptions that rank",          sys:"You are an SEO specialist for video content. Write a compelling video description with: opening hook paragraph, key points (bullet list), 3 timestamp suggestions, 15 relevant hashtags, and a clear CTA with [AFFILIATE LINK] placeholder. Optimize for search." },
  { id:"adcopy",      emoji:"💰", name:"Affiliate Ad Copy",        cat:"Marketing", color:"#10b981", desc:"High-converting copy for affiliate products",         sys:"You are a direct response copywriter specializing in affiliate marketing. Create 3 ad copy variations: SHORT (under 20 words), MEDIUM (50 words), LONG (150 words). Focus on benefits, use power words, and end each with a compelling CTA. Label each variation clearly." },
  { id:"email",       emoji:"📧", name:"Email Campaign Writer",    cat:"Marketing", color:"#06b6d4", desc:"Full 3-email sequences that convert",                 sys:"You are an email marketing expert. Write a complete 3-email drip campaign: Email 1 (Problem awareness + curiosity), Email 2 (Solution reveal + value), Email 3 (Urgency + CTA). Include Subject Line and Preview Text for each. Conversion-focused throughout." },
  { id:"cta",         emoji:"🎯", name:"CTA Generator",           cat:"Marketing", color:"#f59e0b", desc:"Calls-to-action that actually get clicked",            sys:"You are a conversion rate optimization expert. Generate 10 high-converting calls-to-action for the given product/goal. Vary the style: buttons, inline text, video overlays, email sign-offs. Rate each out of 10 for expected conversion and explain why." },
  { id:"headlines",   emoji:"📰", name:"News Headline Generator", cat:"News",      color:"#e879f9", desc:"Breaking news style headlines for AI shows",           sys:"You are a seasoned TV news editor. Generate 5 compelling news headlines in different styles: BREAKING NEWS banner, Feature Story headline, Analysis/Opinion headline, Social Media clip title, and Teaser/Promo line. Make each authoritative and newsworthy." },
  { id:"anchor",      emoji:"🎙️", name:"Anchor Intro Script",    cat:"News",      color:"#fb7185", desc:"On-camera anchor scripts for Lisa, Alisha, Susan, Paul", sys:"You are a professional TV news writer. Write a polished on-camera anchor introduction script: 10-second cold open hook, 20-second story setup, 5-second transition to package. Total ~35 seconds / 85 words. Authoritative tone with personality. Label each section." },
  { id:"captions",    emoji:"📱", name:"Social Caption Pack",     cat:"Social",    color:"#34d399", desc:"Captions optimized for every platform",                sys:"You are a social media growth strategist. Write platform-optimized captions for: 📸 INSTAGRAM (emotional, 150 chars + 5 emojis), 🎵 TIKTOK (trendy, casual, 100 chars), 🐦 TWITTER/X (punchy, under 240 chars), 💼 LINKEDIN (professional, 300 chars), 👥 FACEBOOK (conversational, 200 chars). Label each clearly." },
  { id:"hashtags",    emoji:"#️⃣", name:"Hashtag Strategy Pro",  cat:"Social",    color:"#60a5fa", desc:"3-tier hashtag sets for maximum discovery",              sys:"You are a social media algorithm expert. Create a 3-tier hashtag strategy: 🔵 BROAD (10 tags, 1M+ posts each), 🟡 NICHE (10 tags, 100K–1M posts), 🟢 MICRO (10 tags, under 100K posts). Explain the optimal mix ratio and when to use each tier." },
  { id:"prompt",      emoji:"⚡", name:"Prompt Engineer Pro",     cat:"AI Tools",  color:"#a78bfa", desc:"Transform rough ideas into elite AI prompts",           sys:"You are a world-class prompt engineer. Analyze the given rough prompt and rewrite it using: clear role assignment, specific output format, constraints, 2 few-shot examples, chain-of-thought trigger, and quality criteria. Show: ORIGINAL → ANALYSIS → OPTIMIZED → WHY IT WORKS." },
  { id:"funnel",      emoji:"🚀", name:"Sales Funnel Builder",    cat:"Marketing", color:"#ff6b35", desc:"Complete funnel copy from awareness to sale",           sys:"You are a sales funnel strategist. Create a complete funnel map with copy for: 🎯 AWARENESS (ad hook), 🔍 INTEREST (landing page headline + subhead), 💡 DESIRE (3 bullet benefits), ✅ ACTION (CTA + guarantee). Include a one-line value proposition at the top." },
];

const AFFILIATES = [
  { name:"Vidnoz",     commission:"50%",      cat:"AI Video Creation",   color:"#ff6b35", url:"https://www.vidnoz.com",     desc:"AI-powered video generation & avatars",     badge:"TOP EARNER",   badge2:"🏆" },
  { name:"InVideo",    commission:"30%",      cat:"AI Video Editor",     color:"#7c3aed", url:"https://invideo.io",          desc:"Templates + AI editing for short-form video", badge:"POPULAR",      badge2:"⭐" },
  { name:"MailerLite", commission:"$140/ref", cat:"Email Marketing",     color:"#059669", url:"https://www.mailerlite.com", desc:"Email campaigns, automation & landing pages", badge:"HIGH VALUE",   badge2:"💎" },
  { name:"CapCut",     commission:"Varies",   cat:"Video Editing",       color:"#0ea5e9", url:"https://www.capcut.com",     desc:"Pro-grade video editing for creators",        badge:"CREATOR PICK", badge2:"🎬" },
  { name:"Udemy",      commission:"15%/course",cat:"Online Education",   color:"#a855f7", url:"https://www.udemy.com",      desc:"Massive course library for every skill",      badge:"EVERGREEN",    badge2:"📚" },
];

const HOSTS = [
  { name:"Lisa",           role:"Lead Anchor",          specialty:"Tech & AI News",        style:"Professional · Authoritative · Cutting-Edge", color:"#e879f9", emoji:"👩‍💼", shows:["AI Weekly Roundup","Tech Headlines Daily"],          episodes:47 },
  { name:"Alisha",         role:"Business Reporter",    specialty:"Marketing & Business",   style:"Dynamic · Insightful · Trend-Forward",         color:"#fb923c", emoji:"👩‍💻", shows:["Business Insider AI","Marketing Minute"],            episodes:38 },
  { name:"Susan",          role:"Feature Correspondent",specialty:"Lifestyle & Human Interest",style:"Warm · Engaging · Relatable",               color:"#34d399", emoji:"👩‍🎤", shows:["AI & You","The Human Side of Tech"],                episodes:29 },
  { name:"Paul Baby Boss", role:"Breaking News Anchor", specialty:"Viral & Breaking Stories",style:"Bold · No-Nonsense · High-Energy",             color:"#60a5fa", emoji:"👨‍💼", shows:["Breaking: AI Now","The Daily Brief"],                episodes:52 },
];

// ─── STYLES ───────────────────────────────────────────────────
const S = {
  app:     { minHeight:"100vh", background:"#06070d", color:"#e8eaf0", fontFamily:"'DM Sans', 'Segoe UI', sans-serif", display:"flex" },
  sidebar: { width:220, background:"#0b0d14", borderRight:"1px solid #1a1f2e", display:"flex", flexDirection:"column", position:"fixed", top:0, left:0, height:"100vh", zIndex:100 },
  main:    { marginLeft:220, flex:1, minHeight:"100vh", padding:"32px 36px" },
  card:    { background:"rgba(255,255,255,0.035)", border:"1px solid #1e2433", borderRadius:16, padding:24 },
  goldBtn: { background:"linear-gradient(135deg,#f0a500,#e07000)", color:"#000", fontWeight:700, border:"none", borderRadius:10, padding:"10px 20px", cursor:"pointer", fontSize:14 },
  ghostBtn:{ background:"transparent", border:"1px solid #2a3040", color:"#8891a8", borderRadius:10, padding:"10px 20px", cursor:"pointer", fontSize:14 },
  input:   { width:"100%", background:"#0d1017", border:"1px solid #1e2433", borderRadius:10, padding:"12px 16px", color:"#e8eaf0", fontSize:14, outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box" },
  badge:   { fontSize:11, fontWeight:700, letterSpacing:1, padding:"3px 8px", borderRadius:6 },
};

// ─── UTILS ────────────────────────────────────────────────────
function copy(text, setCopied) {
  navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(()=>setCopied(false), 2000); });
}

// ─── PASSWORD GATE ────────────────────────────────────────────
function PasswordGate({ onAuth }) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(false);

  function attempt() {
    if (pw === PASSWORD) { onAuth(); }
    else { setErr(true); setShake(true); setTimeout(()=>setShake(false),600); setTimeout(()=>setErr(false),2000); }
  }

  return (
    <div style={{ minHeight:"100vh", background:"#06070d", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@700;800&display=swap');
        @keyframes glow { 0%,100%{box-shadow:0 0 30px rgba(240,165,0,0.15)} 50%{box-shadow:0 0 60px rgba(240,165,0,0.35)} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>

      {/* Grid bg */}
      <div style={{ position:"fixed", inset:0, backgroundImage:"radial-gradient(circle at 50% 50%, rgba(240,165,0,0.06) 0%, transparent 60%), linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize:"100% 100%, 48px 48px, 48px 48px", pointerEvents:"none" }} />

      <div style={{ animation:"fadeUp 0.6s ease forwards", position:"relative", zIndex:1, width:400 }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ width:72, height:72, borderRadius:20, background:"linear-gradient(135deg,#f0a500,#e07000)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", animation:"glow 3s infinite", fontSize:28 }}>⚡</div>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:28, fontWeight:800, color:"#fff", letterSpacing:-1 }}>HUB ENGINE</div>
          <div style={{ fontSize:13, color:"#f0a500", fontWeight:700, letterSpacing:4, marginTop:4 }}>V 4 . 0</div>
        </div>

        {/* Login card */}
        <div style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${err?"#ef4444":"#1e2433"}`, borderRadius:20, padding:36, backdropFilter:"blur(20px)", animation: shake?"shake 0.4s ease":"none", transition:"border-color 0.3s" }}>
          <div style={{ fontSize:13, color:"#8891a8", marginBottom:6 }}>ACCESS CODE</div>
          <div style={{ position:"relative" }}>
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={e=>setPw(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&attempt()}
              placeholder="Enter your access code..."
              style={{ ...S.input, borderColor: err?"#ef4444":"#1e2433", fontSize:16, padding:"14px 48px 14px 16px", transition:"border-color 0.3s" }}
              autoFocus
            />
            <button onClick={()=>setShow(!show)} style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:"#8891a8", cursor:"pointer", display:"flex", alignItems:"center" }}>
              {show ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>
          </div>
          {err && <div style={{ color:"#ef4444", fontSize:13, marginTop:8 }}>❌ Invalid access code. Try again.</div>}
          <button onClick={attempt} style={{ ...S.goldBtn, width:"100%", marginTop:20, padding:"14px", fontSize:15, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <Lock size={16}/> ENTER HUB ENGINE
          </button>
          <div style={{ textAlign:"center", marginTop:16, fontSize:12, color:"#4a5166" }}>Three Minds. One Mission. Zero Cost.</div>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────
function Dashboard({ setTab }) {
  const stats = [
    { label:"AI Tools", value:12, icon:<Wrench size={20}/>, color:"#f0a500" },
    { label:"Affiliate Programs", value:5,  icon:<DollarSign size={20}/>, color:"#10b981" },
    { label:"News Hosts", value:4,  icon:<Tv size={20}/>, color:"#e879f9" },
    { label:"Total Episodes", value:166, icon:<Video size={20}/>, color:"#60a5fa" },
  ];
  const quickTools = TOOLS.slice(0,4);

  return (
    <div>
      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg,rgba(240,165,0,0.12),rgba(0,201,255,0.08))", border:"1px solid rgba(240,165,0,0.2)", borderRadius:20, padding:"32px 36px", marginBottom:28, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:30, top:"50%", transform:"translateY(-50%)", fontSize:80, opacity:0.06 }}>⚡</div>
        <div style={{ fontSize:13, color:"#f0a500", fontWeight:700, letterSpacing:4, marginBottom:8 }}>WELCOME BACK, JOHN</div>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:32, fontWeight:800, color:"#fff", letterSpacing:-1, lineHeight:1.2 }}>Hub Engine V4<br/><span style={{ color:"#f0a500" }}>Command Center</span></div>
        <div style={{ marginTop:12, color:"#8891a8", fontSize:14 }}>Three Minds. One Mission. Zero Cost.</div>
        <div style={{ display:"flex", gap:12, marginTop:20, flexWrap:"wrap" }}>
          <button onClick={()=>setTab("tools")} style={{ ...S.goldBtn, display:"flex", alignItems:"center", gap:6 }}><Zap size={15}/> Launch AI Tools</button>
          <button onClick={()=>setTab("affiliates")} style={{ ...S.ghostBtn, display:"flex", alignItems:"center", gap:6, color:"#e8eaf0" }}><TrendingUp size={15}/> Affiliate Hub</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:28 }}>
        {stats.map(s=>(
          <div key={s.label} style={{ ...S.card, display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:44, height:44, borderRadius:12, background:`${s.color}22`, display:"flex", alignItems:"center", justifyContent:"center", color:s.color, flexShrink:0 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize:26, fontWeight:800, color:"#fff", lineHeight:1 }}>{s.value}</div>
              <div style={{ fontSize:12, color:"#8891a8", marginTop:2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <div>
          <div style={{ fontSize:12, color:"#8891a8", fontWeight:700, letterSpacing:2, marginBottom:14 }}>QUICK LAUNCH TOOLS</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {quickTools.map(t=>(
              <button key={t.id} onClick={()=>setTab("tools")} style={{ ...S.card, display:"flex", alignItems:"center", gap:14, cursor:"pointer", border:"1px solid #1e2433", textAlign:"left", transition:"border-color 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=t.color}
                onMouseLeave={e=>e.currentTarget.style.borderColor="#1e2433"}
              >
                <div style={{ fontSize:22 }}>{t.emoji}</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:600, color:"#e8eaf0" }}>{t.name}</div>
                  <div style={{ fontSize:12, color:"#8891a8" }}>{t.desc}</div>
                </div>
                <ChevronRight size={16} style={{ marginLeft:"auto", color:"#4a5166" }}/>
              </button>
            ))}
          </div>
        </div>

        {/* Top Affiliates */}
        <div>
          <div style={{ fontSize:12, color:"#8891a8", fontWeight:700, letterSpacing:2, marginBottom:14 }}>TOP AFFILIATES</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {AFFILIATES.slice(0,4).map(a=>(
              <div key={a.name} style={{ ...S.card, display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:a.color, flexShrink:0 }}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:"#e8eaf0" }}>{a.name}</div>
                  <div style={{ fontSize:12, color:"#8891a8" }}>{a.cat}</div>
                </div>
                <div style={{ fontSize:14, fontWeight:700, color:a.color }}>{a.commission}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AI TOOLS ─────────────────────────────────────────────────
function AITools() {
  const [selected, setSelected] = useState(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cat, setCat] = useState("All");

  const cats = ["All", ...Array.from(new Set(TOOLS.map(t=>t.cat)))];
  const filtered = cat === "All" ? TOOLS : TOOLS.filter(t=>t.cat===cat);

  async function run() {
    if (!input.trim() || !selected) return;
    setLoading(true); setOutput("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system: selected.sys,
          messages:[{ role:"user", content:input }]
        })
      });
      const data = await res.json();
      setOutput(data.content?.map(b=>b.text||"").join("") || "No response received.");
    } catch(e) { setOutput("⚠️ Connection error. Please try again."); }
    setLoading(false);
  }

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
        <div>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:24, fontWeight:800, color:"#fff" }}>AI Tools Hub</div>
          <div style={{ fontSize:13, color:"#8891a8", marginTop:2 }}>12 Claude-powered tools. Pick one. Make magic.</div>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"flex-end" }}>
          {cats.map(c=>(
            <button key={c} onClick={()=>setCat(c)} style={{ fontSize:12, fontWeight:600, padding:"6px 14px", borderRadius:8, border:`1px solid ${cat===c?"#f0a500":"#1e2433"}`, background: cat===c?"rgba(240,165,0,0.12)":"transparent", color: cat===c?"#f0a500":"#8891a8", cursor:"pointer" }}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>
        {filtered.map(t=>(
          <button key={t.id} onClick={()=>{ setSelected(t); setInput(""); setOutput(""); }}
            style={{ background: selected?.id===t.id ? `${t.color}15` : "rgba(255,255,255,0.03)", border:`1px solid ${selected?.id===t.id ? t.color : "#1e2433"}`, borderRadius:14, padding:18, textAlign:"left", cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e=>{ if(selected?.id!==t.id){ e.currentTarget.style.borderColor=`${t.color}66`; e.currentTarget.style.background="rgba(255,255,255,0.05)"; }}}
            onMouseLeave={e=>{ if(selected?.id!==t.id){ e.currentTarget.style.borderColor="#1e2433"; e.currentTarget.style.background="rgba(255,255,255,0.03)"; }}}
          >
            <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
              <div style={{ fontSize:22 }}>{t.emoji}</div>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:"#e8eaf0", lineHeight:1.3 }}>{t.name}</div>
                <div style={{ fontSize:11, color:"#6b7485", marginTop:3 }}>{t.desc}</div>
              </div>
            </div>
            <div style={{ marginTop:10, fontSize:10, fontWeight:700, letterSpacing:1, color:t.color, background:`${t.color}18`, display:"inline-block", padding:"2px 8px", borderRadius:5 }}>{t.cat}</div>
          </button>
        ))}
      </div>

      {selected && (
        <div style={{ ...S.card, border:`1px solid ${selected.color}44` }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
            <div style={{ width:42, height:42, borderRadius:12, background:`${selected.color}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{selected.emoji}</div>
            <div>
              <div style={{ fontSize:16, fontWeight:700, color:"#fff" }}>{selected.name}</div>
              <div style={{ fontSize:12, color:"#8891a8" }}>{selected.desc}</div>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <div>
              <div style={{ fontSize:12, color:"#8891a8", fontWeight:600, marginBottom:8 }}>YOUR INPUT</div>
              <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder={`Describe what you need for ${selected.name.toLowerCase()}...`}
                style={{ ...S.input, height:160 }} />
              <button onClick={run} disabled={loading||!input.trim()}
                style={{ ...S.goldBtn, marginTop:10, width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8, opacity: loading||!input.trim()?0.6:1 }}>
                {loading ? <><RefreshCw size={15} style={{ animation:"spin 1s linear infinite" }}/> Generating...</> : <><Zap size={15}/> Generate with AI</>}
              </button>
            </div>
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <div style={{ fontSize:12, color:"#8891a8", fontWeight:600 }}>AI OUTPUT</div>
                {output && <button onClick={()=>copy(output,setCopied)} style={{ background:"none", border:"1px solid #1e2433", borderRadius:7, padding:"4px 10px", color:"#8891a8", cursor:"pointer", fontSize:12, display:"flex", alignItems:"center", gap:5 }}>
                  {copied?<><CheckCircle size={12} style={{color:"#10b981"}}/> Copied!</>:<><Copy size={12}/> Copy</>}
                </button>}
              </div>
              <div style={{ background:"#060810", border:"1px solid #1a1f2e", borderRadius:10, padding:14, minHeight:160, maxHeight:280, overflowY:"auto" }}>
                {loading ? (
                  <div style={{ display:"flex", alignItems:"center", gap:10, color:"#8891a8", fontSize:13, padding:8 }}>
                    <RefreshCw size={16} style={{ animation:"spin 1s linear infinite", color:selected.color }}/> AI is generating your content...
                  </div>
                ) : output ? (
                  <div style={{ fontSize:13, color:"#d1d5e0", lineHeight:1.7, whiteSpace:"pre-wrap" }}>{output}</div>
                ) : (
                  <div style={{ fontSize:13, color:"#4a5166", fontStyle:"italic" }}>Your AI-generated output will appear here...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {!selected && (
        <div style={{ ...S.card, textAlign:"center", padding:40, border:"1px dashed #1e2433" }}>
          <div style={{ fontSize:36, marginBottom:12 }}>⚡</div>
          <div style={{ fontSize:16, fontWeight:600, color:"#8891a8" }}>Select a tool above to get started</div>
          <div style={{ fontSize:13, color:"#4a5166", marginTop:6 }}>12 Claude-powered tools at your command</div>
        </div>
      )}
    </div>
  );
}

// ─── NEWS STUDIO ──────────────────────────────────────────────
function NewsStudio() {
  const [active, setActive] = useState(null);
  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:24, fontWeight:800, color:"#fff" }}>News Studio</div>
        <div style={{ fontSize:13, color:"#8891a8", marginTop:2 }}>Your four AI news anchors — always on, always ready.</div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20, marginBottom:24 }}>
        {HOSTS.map(h=>(
          <div key={h.name} onClick={()=>setActive(active?.name===h.name?null:h)}
            style={{ ...S.card, border:`1px solid ${active?.name===h.name?h.color:"#1e2433"}`, cursor:"pointer", transition:"all 0.25s" }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=h.color}
            onMouseLeave={e=>{ if(active?.name!==h.name) e.currentTarget.style.borderColor="#1e2433"; }}
          >
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              <div style={{ width:60, height:60, borderRadius:16, background:`${h.color}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, border:`2px solid ${h.color}44` }}>{h.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:18, fontWeight:800, color:"#fff" }}>{h.name}</div>
                <div style={{ fontSize:12, color:h.color, fontWeight:600 }}>{h.role}</div>
                <div style={{ fontSize:12, color:"#8891a8", marginTop:2 }}>{h.specialty}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:22, fontWeight:800, color:h.color }}>{h.episodes}</div>
                <div style={{ fontSize:11, color:"#4a5166" }}>Episodes</div>
              </div>
            </div>

            <div style={{ marginTop:14, paddingTop:14, borderTop:"1px solid #1e2433" }}>
              <div style={{ fontSize:11, color:"#6b7485", marginBottom:8 }}>STYLE</div>
              <div style={{ fontSize:13, color:"#a8b0c0" }}>{h.style}</div>
            </div>

            <div style={{ marginTop:12 }}>
              <div style={{ fontSize:11, color:"#6b7485", marginBottom:8 }}>SHOWS</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {h.shows.map(s=>(
                  <span key={s} style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:6, background:`${h.color}18`, color:h.color, border:`1px solid ${h.color}33` }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show Schedule */}
      <div style={{ ...S.card }}>
        <div style={{ fontWeight:700, color:"#fff", fontSize:16, marginBottom:16 }}>📅 Weekly Broadcast Schedule</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10 }}>
          {["Mon","Tue","Wed","Thu","Fri"].map((day,di)=>(
            <div key={day} style={{ background:"#0d1017", borderRadius:10, padding:12 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#8891a8", letterSpacing:1, marginBottom:10 }}>{day.toUpperCase()}</div>
              {[HOSTS[di%4], HOSTS[(di+2)%4]].map(h=>(
                <div key={h.name} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, padding:"6px 8px", background:`${h.color}0f`, borderRadius:7, borderLeft:`3px solid ${h.color}` }}>
                  <span style={{ fontSize:14 }}>{h.emoji}</span>
                  <span style={{ fontSize:11, color:"#c8d0e0", fontWeight:500, lineHeight:1.2 }}>{h.name.split(" ")[0]}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── AFFILIATE HUB ────────────────────────────────────────────
function AffiliateHub() {
  const [calc, setCalc] = useState({ vidnoz:0, invideo:0, mailerlite:0 });
  const total = Math.round(calc.vidnoz*0.5 + calc.invideo*0.3 + calc.mailerlite*140);

  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:24, fontWeight:800, color:"#fff" }}>Affiliate Command</div>
        <div style={{ fontSize:13, color:"#8891a8", marginTop:2 }}>Your earning programs, all in one place.</div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(1,1fr)", gap:14, marginBottom:28 }}>
        {AFFILIATES.map(a=>(
          <div key={a.name} style={{ ...S.card, display:"flex", alignItems:"center", gap:20, borderLeft:`4px solid ${a.color}` }}>
            <div style={{ width:48, height:48, borderRadius:14, background:`${a.color}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{a.badge2}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:2 }}>
                <div style={{ fontSize:17, fontWeight:800, color:"#fff" }}>{a.name}</div>
                <span style={{ ...S.badge, background:`${a.color}22`, color:a.color }}>{a.badge}</span>
              </div>
              <div style={{ fontSize:12, color:"#8891a8" }}>{a.desc}</div>
              <div style={{ fontSize:11, color:"#4a5166", marginTop:2 }}>{a.cat}</div>
            </div>
            <div style={{ textAlign:"center", marginRight:8 }}>
              <div style={{ fontSize:18, fontWeight:800, color:a.color }}>{a.commission}</div>
              <div style={{ fontSize:11, color:"#4a5166" }}>commission</div>
            </div>
            <a href={a.url} target="_blank" rel="noopener noreferrer"
              style={{ background:`${a.color}22`, border:`1px solid ${a.color}55`, color:a.color, borderRadius:10, padding:"8px 16px", textDecoration:"none", fontSize:13, fontWeight:600, display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
              <ExternalLink size={14}/> Open
            </a>
          </div>
        ))}
      </div>

      {/* Commission Calculator */}
      <div style={{ ...S.card, border:"1px solid rgba(240,165,0,0.3)" }}>
        <div style={{ fontWeight:700, color:"#fff", fontSize:16, marginBottom:4, display:"flex", alignItems:"center", gap:8 }}><BarChart3 size={18} style={{ color:"#f0a500" }}/> Commission Calculator</div>
        <div style={{ fontSize:12, color:"#8891a8", marginBottom:18 }}>Estimate your monthly earnings</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:18 }}>
          {[
            { key:"vidnoz",     label:"Vidnoz Sales",       color:"#ff6b35", unit:"$/sale", rate:"50%" },
            { key:"invideo",    label:"InVideo Sales",       color:"#7c3aed", unit:"$/sale", rate:"30%" },
            { key:"mailerlite", label:"MailerLite Referrals",color:"#059669", unit:"referrals", rate:"$140" },
          ].map(f=>(
            <div key={f.key} style={{ background:"#0d1017", borderRadius:12, padding:14 }}>
              <div style={{ fontSize:12, color:f.color, fontWeight:700, marginBottom:8 }}>{f.label}</div>
              <input type="number" min="0" value={calc[f.key]||""} placeholder="0"
                onChange={e=>setCalc(p=>({...p,[f.key]:Number(e.target.value)||0}))}
                style={{ ...S.input, marginBottom:6 }}/>
              <div style={{ fontSize:11, color:"#4a5166" }}>Rate: {f.rate} per {f.unit}</div>
            </div>
          ))}
        </div>
        <div style={{ background:"linear-gradient(135deg,rgba(240,165,0,0.12),rgba(240,165,0,0.06))", border:"1px solid rgba(240,165,0,0.3)", borderRadius:12, padding:"18px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:13, color:"#8891a8" }}>Estimated Monthly Earnings</div>
            <div style={{ fontSize:11, color:"#4a5166", marginTop:2 }}>Based on your inputs above</div>
          </div>
          <div style={{ fontSize:36, fontWeight:800, color:"#f0a500" }}>${total.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

// ─── TEAM HQ ──────────────────────────────────────────────────
function TeamHQ() {
  const team = [
    { name:"John",  role:"CEO & Product Owner", emoji:"👔", color:"#f0a500", desc:"20+ years industrial ops. Sales veteran across 9 states. Visionary behind Hub Engine.", skills:["Strategy","Leadership","Affiliate Marketing","Prompt Engineering","Funnel Building"] },
    { name:"Becky", role:"Creative Director",    emoji:"🎨", color:"#e879f9", desc:"The creative force. Shapes the brand voice, visual identity, and content direction of every production.", skills:["Creative Direction","Brand Voice","Content Strategy","Visual Design","Storytelling"] },
    { name:"Claude",role:"AI Developer",          emoji:"⚡", color:"#60a5fa", desc:"The engine behind the engine. Builds tools, writes code, powers every AI workflow in the Hub.", skills:["Full-Stack Dev","AI Integration","Tool Building","Prompt Engineering","Automation"] },
  ];

  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:24, fontWeight:800, color:"#fff" }}>Team HQ</div>
        <div style={{ fontSize:13, color:"#8891a8", marginTop:2 }}>The three minds behind the mission.</div>
      </div>

      {/* Motto banner */}
      <div style={{ background:"linear-gradient(135deg,#0d1117,#0b0f1a)", border:"1px solid #1e2433", borderRadius:16, padding:24, marginBottom:24, textAlign:"center" }}>
        <div style={{ fontSize:10, color:"#f0a500", fontWeight:700, letterSpacing:5, marginBottom:8 }}>TEAM MOTTO</div>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:26, fontWeight:800, color:"#fff", letterSpacing:-0.5 }}>
          Three Minds. One Mission. Zero Cost.
        </div>
        <div style={{ marginTop:10, fontSize:13, color:"#4a5166" }}>An AI-native media team built from scratch — and built to win.</div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
        {team.map(m=>(
          <div key={m.name} style={{ ...S.card, border:`1px solid ${m.color}33`, textAlign:"center" }}>
            <div style={{ width:70, height:70, borderRadius:20, background:`${m.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, margin:"0 auto 16px", border:`2px solid ${m.color}44` }}>{m.emoji}</div>
            <div style={{ fontSize:20, fontWeight:800, color:"#fff" }}>{m.name}</div>
            <div style={{ fontSize:12, color:m.color, fontWeight:700, marginTop:4, letterSpacing:0.5 }}>{m.role}</div>
            <div style={{ fontSize:13, color:"#8891a8", lineHeight:1.6, margin:"14px 0" }}>{m.desc}</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, justifyContent:"center" }}>
              {m.skills.map(s=>(
                <span key={s} style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:6, background:`${m.color}14`, color:m.color, border:`1px solid ${m.color}2a` }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────
export default function HubEngineV4() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("dashboard");

  const nav = [
    { id:"dashboard",  label:"Dashboard",    icon:<LayoutDashboard size={18}/> },
    { id:"tools",      label:"AI Tools",     icon:<Wrench size={18}/> },
    { id:"studio",     label:"News Studio",  icon:<Tv size={18}/> },
    { id:"affiliates", label:"Affiliates",   icon:<DollarSign size={18}/> },
    { id:"team",       label:"Team HQ",      icon:<Users size={18}/> },
  ];

  if (!authed) return <PasswordGate onAuth={()=>setAuthed(true)} />;

  return (
    <div style={S.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@700;800&display=swap');
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(240,165,0,0.1)} 50%{box-shadow:0 0 40px rgba(240,165,0,0.25)} }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:6px; } ::-webkit-scrollbar-track { background:#0b0d14; } ::-webkit-scrollbar-thumb { background:#1e2433; border-radius:3px; }
        textarea:focus, input:focus { border-color:#f0a500 !important; box-shadow:0 0 0 3px rgba(240,165,0,0.1) !important; }
      `}</style>

      {/* Sidebar */}
      <aside style={S.sidebar}>
        {/* Logo */}
        <div style={{ padding:"24px 20px 20px", borderBottom:"1px solid #1a1f2e" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#f0a500,#e07000)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, animation:"glow 3s infinite" }}>⚡</div>
            <div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:15, fontWeight:800, color:"#fff", letterSpacing:-0.5 }}>HUB ENGINE</div>
              <div style={{ fontSize:10, color:"#f0a500", fontWeight:700, letterSpacing:3 }}>V 4 . 0</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"16px 12px" }}>
          {nav.map(n=>{
            const active = tab === n.id;
            return (
              <button key={n.id} onClick={()=>setTab(n.id)}
                style={{ display:"flex", alignItems:"center", gap:12, width:"100%", padding:"10px 12px", borderRadius:10, marginBottom:4, border:"none", background: active?"rgba(240,165,0,0.12)":"transparent", color: active?"#f0a500":"#8891a8", cursor:"pointer", fontSize:14, fontWeight: active?600:400, transition:"all 0.2s", textAlign:"left" }}
                onMouseEnter={e=>{ if(!active){ e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.color="#c8d0e0"; }}}
                onMouseLeave={e=>{ if(!active){ e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#8891a8"; }}}
              >
                {n.icon}{n.label}
                {active && <div style={{ marginLeft:"auto", width:6, height:6, borderRadius:"50%", background:"#f0a500" }}/>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding:"16px 12px", borderTop:"1px solid #1a1f2e" }}>
          <div style={{ fontSize:10, color:"#4a5166", textAlign:"center", lineHeight:1.5 }}>Three Minds.<br/>One Mission. Zero Cost.</div>
          <button onClick={()=>setAuthed(false)} style={{ ...S.ghostBtn, width:"100%", marginTop:10, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
            <LogOut size={14}/> Lock Hub
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={S.main}>
        <div style={{ maxWidth:1000 }}>
          {tab==="dashboard"  && <Dashboard setTab={setTab}/>}
          {tab==="tools"      && <AITools/>}
          {tab==="studio"     && <NewsStudio/>}
          {tab==="affiliates" && <AffiliateHub/>}
          {tab==="team"       && <TeamHQ/>}
        </div>
      </main>
    </div>
  );
}
