# 🏭 HUB ENGINE VIDEO FACTORY
# Laptop Setup Guide — 3 Agent System + Remotion

## WHAT THIS DOES
You type ONE prompt → 3 AI agents work together → Finished MP4 video on your laptop

- 🤖 Agent 1 — Script Writer (writes your script)
- 🎬 Agent 2 — Scene Builder (builds Remotion video)
- 🎙️ Agent 3 — Voice Artist (adds voiceover audio)

---

## STEP 1 — OPEN COMMAND PROMPT
Press Windows key + R → type cmd → Enter

---

## STEP 2 — GO TO YOUR PROJECT
cd C:\Users\John Lanter\hub-engine-videos

---

## STEP 3 — INSTALL THE 3 AGENT SYSTEM
Copy and paste this EXACTLY:

npm install axios dotenv

---

## STEP 4 — ADD YOUR API KEY
Create a file called .env in your hub-engine-videos folder
Add this line (replace with your real Groq key):

GROQ_API_KEY=gsk_your_key_here

---

## STEP 5 — COPY THE AGENT FILES
Copy these files into your hub-engine-videos folder:
- video-factory.js  (the 3 agent system)
- BusinessPromo.tsx (business video template)
- AffiliatePromo.tsx (affiliate video template)
- NewsShow.tsx (AI news show template)

---

## STEP 6 — RUN YOUR FIRST VIDEO
In Command Prompt, type:

node video-factory.js

It will ask you what video you want to make.
Type your prompt and press Enter.
The 3 agents go to work automatically!

---

## EXAMPLE PROMPTS TO TRY:
"Make a 60-second Vidnoz affiliate promo with Lisa"
"Make a 45-second business promo for Joe's Pizza Beaumont TX with Susan"
"Make a 2-minute AI news show with Alisha covering latest AI news"
"Make a Paul podcast episode about AI tools for beginners"

---

## WHAT HAPPENS AUTOMATICALLY:
1. Agent 1 writes the complete script
2. Agent 2 builds the Remotion video composition
3. Agent 3 generates the voiceover
4. Remotion renders everything into an MP4
5. Video saves to: hub-engine-videos/out/

---

## YOUR VIDEO IS READY!
Find your MP4 in: C:\Users\John Lanter\hub-engine-videos\out\
Send to your phone → post to TikTok, YouTube, Instagram!

