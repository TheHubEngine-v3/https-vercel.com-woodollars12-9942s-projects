#!/usr/bin/env python3
"""
Hub Engine V3 Voice Fix Patcher
Run this script in the same folder as your index.html
It will automatically fix the voice priority
"""
import sys, os, shutil

filename = 'index.html'
if not os.path.exists(filename):
    print(f"ERROR: {filename} not found in current folder")
    print("Make sure this script is in the same folder as index.html")
    input("Press Enter to exit...")
    sys.exit(1)

# Back up the original
shutil.copy(filename, filename + '.backup')
print(f"Backup saved as {filename}.backup")

with open(filename, 'r', encoding='utf-8') as f:
    content = f.read()

old = """function doSpeak(clean, who){
  if(!speaking || !clean) return;
  // ALWAYS try Web Speech API first — it is built into Chrome
  if(window.speechSynthesis){
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(clean);
    utt.volume = 1.0;
    // Pick voice based on who is speaking
    if(who === 'claude'){
      // Claude = deep masculine voice
      utt.rate = 0.82;   // slower = more authoritative
      utt.pitch = 0.55;  // very low pitch = deep masculine
      // Try to find a male voice — Australian preferred
      let v = allVoices.find(v=>/australian/i.test(v.name) && !/female/i.test(v.name))
           || allVoices.find(v=>v.lang==='en-AU' && !/female/i.test(v.name))
           || allVoices.find(v=>v.lang==='en-AU')
           || allVoices.find(v=>/male/i.test(v.name) && v.lang.startsWith('en'))
           || allVoices.find(v=>/david|james|mark|daniel|alex/i.test(v.name))
           || allVoices.find(v=>v.lang.startsWith('en') && !/female|zira|cortana/i.test(v.name))
           || allVoices.find(v=>v.lang.startsWith('en'));
      if(v) utt.voice = v;
    } else {
      // Becky = warm natural British female
      utt.rate = 0.9;
      utt.pitch = 1.15;
      let v = allVoices.find(v=>v.lang==='en-GB' && /female/i.test(v.name))
           || allVoices.find(v=>v.lang==='en-GB')
           || allVoices.find(v=>/female|zira|cortana|samantha|karen/i.test(v.name) && v.lang.startsWith('en'))
           || allVoices.find(v=>v.lang.startsWith('en'));
      if(v) utt.voice = v;
    }
    window.speechSynthesis.speak(utt);
    return;
  }
  // Fallback to ResponsiveVoice
  if(typeof responsiveVoice !== 'undefined'){
    try{
      responsiveVoice.cancel();
      const rv = who==='claude' ? 'Australian Male' : 'UK English Female';
      responsiveVoice.speak(clean, rv, {rate:0.9, pitch:who==='claude'?0.8:1.1, volume:1});
    }catch(e){}
  }
}"""

new = """function doSpeak(clean, who){
  if(!speaking || !clean) return;
  // PRIORITY 1: ResponsiveVoice — real British Female + Australian Male accents
  if(rvReady && typeof responsiveVoice !== 'undefined'){
    try{
      responsiveVoice.cancel();
      if(who === 'claude'){
        responsiveVoice.speak(clean, 'Australian Male', {rate:0.82, pitch:0.75, volume:1.0});
      } else {
        responsiveVoice.speak(clean, 'UK English Female', {rate:0.88, pitch:1.08, volume:1.0});
      }
      return;
    }catch(e){}
  }
  // PRIORITY 2: Web Speech API — fallback only
  if(window.speechSynthesis){
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(clean);
    utt.volume = 1.0;
    if(who === 'claude'){
      utt.rate = 0.82; utt.pitch = 0.55;
      let v = allVoices.find(v=>/australian/i.test(v.name) && !/female/i.test(v.name))
           || allVoices.find(v=>v.lang==='en-AU' && !/female/i.test(v.name))
           || allVoices.find(v=>v.lang==='en-AU')
           || allVoices.find(v=>/male/i.test(v.name) && v.lang.startsWith('en'))
           || allVoices.find(v=>/david|james|mark|daniel|alex/i.test(v.name))
           || allVoices.find(v=>v.lang.startsWith('en') && !/female|zira|cortana/i.test(v.name))
           || allVoices.find(v=>v.lang.startsWith('en'));
      if(v) utt.voice = v;
    } else {
      utt.rate = 0.9; utt.pitch = 1.15;
      let v = allVoices.find(v=>v.lang==='en-GB' && /female/i.test(v.name))
           || allVoices.find(v=>v.lang==='en-GB')
           || allVoices.find(v=>/female|zira|cortana|samantha|karen/i.test(v.name) && v.lang.startsWith('en'))
           || allVoices.find(v=>v.lang.startsWith('en'));
      if(v) utt.voice = v;
    }
    window.speechSynthesis.speak(utt);
  }
}"""

if old in content:
    content = content.replace(old, new)
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print("SUCCESS! Voice fix applied.")
    print("Becky now uses: UK English Female (ResponsiveVoice)")
    print("Claude now uses: Australian Male (ResponsiveVoice)")
    print("\nUpload the updated index.html to GitHub and you are done!")
else:
    print("ERROR: Could not find the exact text to replace.")
    print("The file may have already been patched, or the text is different.")
    print("Use the VOICE_FIX_INSTRUCTIONS.txt file to do it manually in Notepad.")

input("\nPress Enter to exit...")
