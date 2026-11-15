'use strict';
const $=s=>document.querySelector(s),st=$('#stage'),wait=ms=>new Promise(r=>setTimeout(r,ms));
const click=s=>new Promise(r=>$(s).addEventListener('click',r,{once:true}));
const S={ch:0,stars:0,music:false,hint:'',started:false,mc:0};
const NAMES=['The First Meeting','The Forest of Lost Stars','The Bridge of Memories','The Secret Letters','The Castle of the Moon','The Last Journey','The Final Surprise'];
/* ---------- original characters (inline SVG) ---------- */
const AV={
guide:`<svg viewBox="0 0 100 100"><path d="M6 100Q10 72 50 68Q90 72 94 100Z" fill="#1a2a6c" stroke="#cfd6f0" stroke-width="1.5"/><path d="M34 70L50 86L66 70L62 62H38Z" fill="#0f1a4f" stroke="#cfd6f0" stroke-width="1"/><rect x="43" y="56" width="14" height="12" fill="#e0b08c"/><path d="M52 80A6 6 0 1 0 52 92A5 5 0 1 1 52 80Z" fill="#fff"><animate attributeName="opacity" values=".6;1;.6" dur="3s" repeatCount="indefinite"/></path><ellipse cx="50" cy="40" rx="21" ry="25" fill="#eec3a0"/><path d="M28 38C24 8 76 6 72 38C69 24 60 19 49 20C40 21 32 28 28 38ZM28 34Q25 48 30 52L31 38Z" fill="#14102e"/><path d="M30 28Q50 12 70 28" stroke="#dfe5ff" stroke-width="1.6" fill="none"/><circle cx="50" cy="19" r="2.4" fill="#bfe3ff"><animate attributeName="r" values="2;3.4;2" dur="2.5s" repeatCount="indefinite"/></circle><ellipse cx="41" cy="43" rx="3.2" ry="4.2" fill="#1a1048"><animate attributeName="ry" values="4.2;4.2;.5;4.2" keyTimes="0;.9;.95;1" dur="5s" repeatCount="indefinite"/></ellipse><ellipse cx="59" cy="43" rx="3.2" ry="4.2" fill="#1a1048"><animate attributeName="ry" values="4.2;4.2;.5;4.2" keyTimes="0;.9;.95;1" dur="5s" repeatCount="indefinite"/></ellipse><circle cx="42" cy="41" r="1.1" fill="#fff"/><circle cx="60" cy="41" r="1.1" fill="#fff"/><path d="M42 54Q50 61 58 54" stroke="#a8554f" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`,
guardian:`<svg viewBox="0 0 100 150"><path d="M50 8C28 8 22 34 22 52L8 142H92L78 52C78 34 72 8 50 8Z" fill="#26175e" stroke="#d8dcf0" stroke-width="1.5"/><path d="M50 22C38 22 34 38 36 52C40 62 60 62 64 52C66 38 62 22 50 22Z" fill="#0b0626"/><circle cx="43" cy="46" r="3" fill="#fff"><animate attributeName="opacity" values="1;.3;1" dur="4s" repeatCount="indefinite"/></circle><circle cx="57" cy="46" r="3" fill="#fff"/><path d="M62 4A16 16 0 1 1 62 36A12 12 0 1 0 62 4Z" fill="#f4eeff"/><path d="M30 90Q50 104 70 90" stroke="#b9a7ff" stroke-width="2" fill="none"/><circle cx="50" cy="112" r="6" fill="#ffb8d6"/></svg>`,
spirit:`<svg viewBox="0 0 100 100"><path d="M50 4L61 36L96 38L68 58L78 92L50 72L22 92L32 58L4 38L39 36Z" fill="#fff0a8" stroke="#ffd36b" stroke-width="3"/><circle cx="42" cy="50" r="3.5" fill="#3a2a60"/><circle cx="58" cy="50" r="3.5" fill="#3a2a60"/><path d="M44 60Q50 66 56 60" stroke="#3a2a60" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`,
khadija:`<svg viewBox="0 0 70 100"><path d="M35 8C16 8 12 30 14 52C16 70 10 76 8 90H62C60 76 54 70 56 52C58 30 54 8 35 8Z" fill="#1b0f3a"/><circle cx="35" cy="26" r="13" fill="#f0c9a8"/><path d="M22 24C24 12 46 12 48 24C42 18 28 18 22 24Z" fill="#1b0f3a"/><path d="M20 44H50L60 96H10Z" fill="#9d86f0"/><path d="M20 44H50L46 54H24Z" fill="#ffb8d6"/><circle cx="30" cy="27" r="1.8" fill="#2a1a50"/><circle cx="40" cy="27" r="1.8" fill="#2a1a50"/><path d="M31 33Q35 36 39 33" stroke="#b5655f" stroke-width="1.6" fill="none"/></svg>`};
const FIG=`<svg viewBox="0 0 70 120"><path d="M18 48L6 110H64L52 48Z" fill="#0a1033"/><rect x="26" y="86" width="7" height="24" fill="#101a45"/><rect x="37" y="86" width="7" height="24" fill="#101a45"/><rect x="25" y="108" width="9" height="5" rx="2" fill="#cfd6f0"/><rect x="36" y="108" width="9" height="5" rx="2" fill="#cfd6f0"/><path d="M20 46Q35 40 50 46L54 92H16Z" fill="#1a2a6c" stroke="#cfd6f0" stroke-width=".8"/><path d="M35 46V92" stroke="#cfd6f0" stroke-width=".8"/><path d="M20 48L11 80L16 83L24 58ZM50 48L59 80L54 83L46 58Z" fill="#16235a" stroke="#cfd6f0" stroke-width=".6"/><circle cx="13" cy="82" r="3" fill="#eec3a0"/><circle cx="57" cy="82" r="3" fill="#eec3a0"/><rect x="17" y="76" width="36" height="3" fill="#cfd6f0"/><path d="M24 44L35 54L46 44L42 39H28Z" fill="#0f1a4f" stroke="#cfd6f0" stroke-width=".6"/><rect x="31" y="36" width="8" height="6" fill="#e0b08c"/><circle cx="35" cy="60" r="5" fill="#bfe3ff" opacity=".35"><animate attributeName="opacity" values=".15;.5;.15" dur="3s" repeatCount="indefinite"/></circle><path d="M37 55A5 5 0 1 0 37 65A4 4 0 1 1 37 55Z" fill="#fff"/><ellipse cx="35" cy="26" rx="11" ry="13" fill="#eec3a0"/><path d="M23 25C21 7 48 5 47 25C45 17 39 14 33 15C28 16 25 19 23 25ZM23 22Q21 31 24 34L25 25Z" fill="#14102e"/><path d="M24 20Q35 11 46 20" stroke="#dfe5ff" stroke-width=".9" fill="none"/><circle cx="35" cy="14.6" r="1.4" fill="#bfe3ff"><animate attributeName="r" values="1;2;1" dur="2.5s" repeatCount="indefinite"/></circle><ellipse cx="30" cy="27" rx="1.8" ry="2.4" fill="#1a1048"><animate attributeName="ry" values="2.4;2.4;.3;2.4" keyTimes="0;.9;.95;1" dur="5s" repeatCount="indefinite"/></ellipse><ellipse cx="40" cy="27" rx="1.8" ry="2.4" fill="#1a1048"><animate attributeName="ry" values="2.4;2.4;.3;2.4" keyTimes="0;.9;.95;1" dur="5s" repeatCount="indefinite"/></ellipse><circle cx="30.6" cy="26" r=".6" fill="#fff"/><circle cx="40.6" cy="26" r=".6" fill="#fff"/><path d="M31 33Q35 36 39 33" stroke="#a8554f" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>`;
const ch=(k,c)=>`<div class="char ${c}">${k==='guide'?FIG:AV[k]}</div>`;
/* ---------- helpers ---------- */
function hud(){$('#hud').hidden=!S.started;$('#prog').innerHTML=NAMES.map((n,i)=>`<i class="${i<S.ch?'d':i==S.ch?'a':''}" title="${n}"></i>`).join('');$('#n').textContent=S.stars}
function scene(h,c){st.innerHTML=h;S.ch=c;document.body.dataset.ch=c;$('#dlg').hidden=true;hud()}
function toast(t,ms=3800){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),ms)}
function burst(x,y,n=14){for(let i=0;i<n;i++){const e=document.createElement('i');e.className='sp';e.style.left=x+'px';e.style.top=y+'px';e.style.setProperty('--dx',(Math.random()-.5)*160+'px');e.style.setProperty('--dy',(Math.random()-.5)*160+'px');document.body.append(e);setTimeout(()=>e.remove(),900)}}
function addStar(e){S.stars++;hud();if(e)burst(e.clientX,e.clientY)}
async function say(lines,who='guide'){const d=$('#dlg'),t=$('#tx'),nx=$('#nx');d.hidden=false;nx.hidden=false;$('#opts').innerHTML='';$('#av').innerHTML=AV[who];
 for(const l of [].concat(lines)){t.textContent='';await new Promise(res=>{let i=0;const iv=setInterval(()=>{t.textContent=l.slice(0,++i);if(i>=l.length)clearInterval(iv)},22);nx.onclick=()=>{if(i<l.length){i=l.length-1}else{clearInterval(iv);res()}}})}
 d.hidden=true}
async function ask(line,opts,who='guide'){const d=$('#dlg'),t=$('#tx'),nx=$('#nx'),o=$('#opts');d.hidden=false;nx.hidden=true;o.innerHTML='';$('#av').innerHTML=AV[who];t.textContent='';
 await new Promise(r=>{let i=0;const iv=setInterval(()=>{t.textContent=line.slice(0,++i);if(i>=line.length){clearInterval(iv);r()}},22)});
 return new Promise(res=>{opts.forEach((x,k)=>{const b=document.createElement('button');b.className='opt';b.textContent=x;b.onclick=()=>{o.innerHTML='';nx.hidden=false;d.hidden=true;toast('Khadija: '+x,2400);res(k)};o.append(b)})})}
function hidden(){const b=document.createElement('button');b.className='bf';b.textContent='🦋';b.setAttribute('aria-label','Something shimmering');b.style.left=8+Math.random()*80+'%';b.style.top=18+Math.random()*40+'%';b.onclick=e=>{b.remove();addStar(e);toast('A hidden butterfly! +1 ✦')};st.append(b)}
const trees=()=>{let p='';for(let i=0;i<14;i++){const x=i*8-4,h=60+(i*37%35);p+=`<polygon points="${x},100 ${x+5},${100-h} ${x+10},100" fill="${i%2?'#120a36':'#0b0626'}"/><polygon points="${x+1},${100-h*.5} ${x+5},${100-h-8} ${x+9},${100-h*.5}" fill="#1a1050"/>`}return `<svg viewBox="0 0 100 100" preserveAspectRatio="none">${p}<rect y="94" width="100" height="6" fill="#06031a"/></svg>`};
const castle=()=>`<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax slice"><g fill="#0d0830" stroke="#8d7be0" stroke-width=".3"><rect x="30" y="50" width="40" height="50"/><rect x="22" y="36" width="10" height="64"/><rect x="68" y="36" width="10" height="64"/><polygon points="22,36 27,22 32,36"/><polygon points="68,36 73,22 78,36"/><rect x="44" y="30" width="12" height="30"/><polygon points="44,30 50,14 56,30"/><path d="M44 100V82A6 6 0 0 1 56 82V100Z" fill="#ffe9a8"/></g><g fill="#ffe9a8"><rect x="26" y="50" width="2" height="4"/><rect x="72" y="50" width="2" height="4"/><rect x="48" y="40" width="4" height="6"/></g></svg>`;
/* ---------- sound (generated, no files) ---------- */
let AC,mg;
function startMusic(){if(AC)return;try{AC=new(window.AudioContext||window.webkitAudioContext)();mg=AC.createGain();mg.gain.value=0;mg.connect(AC.destination);
 [220,277.18,329.63,440].forEach((f,i)=>{const o=AC.createOscillator(),g=AC.createGain(),l=AC.createOscillator(),lg=AC.createGain();o.frequency.value=f;g.gain.value=.05;l.frequency.value=.07+i*.03;lg.gain.value=.03;l.connect(lg);lg.connect(g.gain);o.connect(g);g.connect(mg);o.start();l.start()});
 const P=[523.25,587.33,659.25,783.99,880];setInterval(()=>{if(!S.music)return;const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;o.frequency.value=P[Math.random()*5|0];g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.07,t+.05);g.gain.exponentialRampToValueAtTime(.0001,t+2.5);o.connect(g);g.connect(mg);o.start();o.stop(t+2.6)},2600);setMusic(true)}catch(e){}}
function setMusic(v){S.music=v;if(AC){AC.resume();mg.gain.linearRampToValueAtTime(v?.5:0,AC.currentTime+.8)}$('#snd').textContent=v?'🔊':'🔇'}
$('#snd').onclick=()=>AC?setMusic(!S.music):startMusic();
/* ---------- ambient canvas, cursor magic, moon secrets, map, hint ---------- */
const cv=$('#fx'),cx=cv.getContext('2d');let W,H,ST=[];
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;ST=Array.from({length:Math.min(160,W*H/9000|0)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.5+.3,p:Math.random()*6,v:Math.random()*.15+.03}))}
addEventListener('resize',rs);rs();
(function loop(t){cx.clearRect(0,0,W,H);for(const s of ST){s.y-=s.v;if(s.y<0)s.y=H;cx.globalAlpha=.4+.6*Math.abs(Math.sin(t/900+s.p));cx.fillStyle='#fff';cx.beginPath();cx.arc(s.x,s.y,s.r,0,7);cx.fill()}requestAnimationFrame(loop)})(0);
let lt=0;addEventListener('pointermove',e=>{if(e.pointerType==='touch'||e.timeStamp-lt<45)return;lt=e.timeStamp;const i=document.createElement('i');i.className='sp';i.style.left=e.clientX+'px';i.style.top=e.clientY+'px';document.body.append(i);setTimeout(()=>i.remove(),800)});
const MM=['The moon hums softly. 🌙','The moon winks at you.','Psst… the moon knows a secret about this place.','The moon says: you’re doing great, Khadija.','Ayoub told the moon to keep watching over you. ✨'];
$('#moon').onclick=e=>{burst(e.clientX,e.clientY,26);const m=$('#moon');m.classList.remove('wink');void m.offsetWidth;m.classList.add('wink');toast(MM[S.mc++%MM.length])};
$('#moon').onkeydown=e=>{if(e.key==='Enter')$('#moon').click()};
$('#hintb').onclick=()=>toast('💡 Ayoub: '+(S.hint||'Follow the glowing light!'),5200);
$('#mapb').onclick=()=>{const m=$('#modal');m.hidden=false;m.innerHTML=`<div class="paper" style="text-align:left"><h3>Map of the dream</h3><br>${NAMES.map((n,i)=>`<p>${i<=S.ch?(i<S.ch?'✦':'☾'):'🔒'} ${i<=S.ch?n:'Undiscovered'}</p>`).join('')}<br><button class="btn now" id="mc">Close</button></div>`;$('#mc').onclick=()=>m.hidden=true};
/* ---------- CHAPTER 1 ---------- */
async function c1(){
 scene(`<div class="center"><p class="intro">Somewhere between dreams and reality, a little adventure was waiting…</p><h1 class="wel">Welcome, Khadija.</h1><button class="btn" id="go">START THE JOURNEY</button></div>`,0);
 await click('#go');S.started=true;startMusic();
 scene(`${ch('guide','guide big')}<button class="stone" id="stone" hidden aria-label="Glowing stone"></button>`,0);
 await say(['Hey Khadija! Finally, you’re here. I’ve been waiting for you.','I’m Ayoub. Don’t worry — I’m the friendly kind of mysterious.']);
 const a=await ask('Ready to discover something special?',['Of course!','Where are you taking me?','I don’t trust you 😂']);
 await say([['That’s the spirit. I knew you were the brave one.','Somewhere made of moonlight. I can’t say more — the moon is a terrible gossip.','Ha! Fair. Trust is earned, so I’ll earn it one step at a time.'][a],'There’s something I want to show you. But first, you have to follow the light.']);
 $('#stone').hidden=false;S.hint='Click the glowing stone!';toast('Ayoub points at a glowing stone…');hidden();
 const s=await click('#stone');await say('That stone knows the way. Stay close, Khadija — and watch your step.')}
/* ---------- CHAPTER 2 ---------- */
async function c2(){
 const I=[{x:14,y:68,e:'🌷',s:'Somewhere, someone smiled while planning this.'},{x:48,y:80,e:'🍄',q:'That’s just a mushroom. It says hi, though.'},{x:74,y:50,e:'🏮',s:'Not everything beautiful needs to be loud.'},{x:34,y:42,e:'✨',q:'Fireflies! Pretty, but no star here.'},{x:88,y:74,e:'🕯️',s:'You were thought of — more than once.'},{x:60,y:64,e:'🌸',q:'Smells lovely. Still not a star.'}];
 scene(`<div class="forest">${trees()}</div>${ch('guide','guide')}${ch('khadija','kh')}`+I.map((o,i)=>`<button class="item" data-i="${i}" style="left:${o.x}%;top:${o.y}%" aria-label="Glowing object">${o.e}</button>`).join(''),1);hidden();
 S.hint='Look for glowing things near the trees. Three of them hide a star!';let n=0;
 await say(['Welcome to the Forest of Lost Stars.','Three stars fell here and got lost. Help me find them — click the glowing things.']);
 const f=await ask('Fair warning: some glowing things are just mushrooms. Can you tell the difference?',['Easily.','Not really…']);
 await say(f?'No worries, I’ll cheer you on. Loudly. Possibly off-key.':'Confident. I like it. Let’s see.');
 await new Promise(res=>{st.querySelectorAll('.item').forEach(b=>b.onclick=e=>{const o=I[b.dataset.i];b.classList.add('off');if(o.s){n++;addStar(e);toast(`★ ${n}/3 — “${o.s}”  ·  Ayoub: ${['Found one!','Look at you go!','Of course you did.'][n-1]}`,5200);if(n===3)setTimeout(res,2200)}else toast(o.q)})});
 await say(['Three stars! You found them faster than I would have.','Okay, fine, I wasn’t really looking. I just wanted to watch you do it.'])}
/* ---------- CHAPTER 3 ---------- */
async function c3(){
 const Y=['☾','✦','❀','♡'],D=[...Y,...Y].sort(()=>Math.random()-.5);
 scene(`<div class="panel"><div class="bridge locked" id="br"></div><h3>Match the magical symbols to unlock the bridge</h3><div class="grid">${D.map((y,i)=>`<button class="tile" data-y="${y}" aria-label="Hidden symbol">${y}</button>`).join('')}</div></div>${ch('guide','guide')}${ch('spirit','spirit a')}`,2);hidden();
 S.hint='Flip two tiles. If they match, they stay lit. Take your time!';
 await say(['The Bridge of Memories. It’s locked, of course.','Match the symbols to open it. I’ll stand here and pretend not to peek.']);
 await new Promise(res=>{let a=null,lock=false,m=0;st.querySelectorAll('.tile').forEach(b=>b.onclick=async()=>{if(lock||b.classList.contains('up')||b.classList.contains('ok'))return;b.classList.add('up');if(!a){a=b;return}
  if(a.dataset.y===b.dataset.y){a.className=b.className='tile ok';a=null;if(++m===4)res()}else{lock=true;await wait(800);a.classList.remove('up');b.classList.remove('up');a=null;lock=false}})});
 $('#br').classList.remove('locked');const b=await ask('Well done! I knew you would make it this far. Honestly, was there ever any doubt?',['None at all.','A little 😅','You’re just lucky']);
 await say([['Confidence. I like it.','Don’t worry — even I doubted the bridge a little.','Lucky? Rude. Come on, cross with me anyway.'][b],'Next, something a bit more personal.']);}
/* ---------- CHAPTER 4 ---------- */
const LET=['Not every beautiful thing needs a reason to exist.','Some people bring a little extra light into ordinary days.','Someone somewhere decided to make this little world just for you.'];
async function c4(){
 scene(`<div class="center"><h3>Three letters float in the air</h3><div class="row">${LET.map((l,i)=>`<button class="env" data-i="${i}" aria-label="Open letter ${i+1}">💌</button>`).join('')}</div></div>${ch('guide','guide')}`,3);hidden();
 S.hint='Open all three envelopes.';let n=0;
 await say(['Three secret letters, floating just for you.','I wrote them. Be gentle — I’m a better adventurer than a poet.']);
 await new Promise(res=>st.querySelectorAll('.env').forEach(b=>b.onclick=async e=>{const m=$('#modal');m.hidden=false;m.innerHTML=`<div class="paper"><p>${LET[b.dataset.i]}</p><button class="btn now" id="mc">Close</button></div>`;burst(e.clientX,e.clientY,22);
  if(!b.classList.contains('read')){b.classList.add('read');addStar();n++}$('#mc').onclick=()=>{m.hidden=true;if(n===3)setTimeout(res,300)}}));
 const l=await ask('Every one of those was true, you know. Which was your favorite?',['The first','The second','The third']);
 await say([['Simple, honest. Good taste.','That one’s my favorite too. Don’t tell the others.','Ah. That one is closest to the truth.'][l],'The castle is next. The Moon Guardian is waiting.']);}
/* ---------- CHAPTER 5 ---------- */
function g1(){return new Promise(res=>{let got=0;$('#game').innerHTML='<h3>Key I — Catch five falling stars</h3><p id="gp">0 / 5</p>';
 const sp=setInterval(()=>{const s=document.createElement('button');s.className='fall';s.textContent='✦';s.setAttribute('aria-label','Falling star');s.style.left=8+Math.random()*84+'%';s.style.animationDuration=4+Math.random()*2+'s';s.onclick=e=>{s.remove();burst(e.clientX,e.clientY);$('#gp').textContent=++got+' / 5';if(got>=5){clearInterval(sp);res()}};s.onanimationend=()=>s.remove();document.body.append(s)},900)})}
function g2(){return new Promise(res=>{const g=$('#game');g.innerHTML='<h3>Key II — Repeat the lantern lights</h3><p id="gp">Watch…</p><div class="lan">'+[0,1,2,3].map(i=>`<button class="ln l${i}" aria-label="Lantern ${i+1}">🏮</button>`).join('')+'</div>';
 const L=[...g.querySelectorAll('.ln')],q=[0,1,2].map(()=>Math.random()*4|0);let at=0,ok=false;
 const play=async()=>{ok=false;at=0;$('#gp').textContent='Watch…';await wait(600);for(const i of q){L[i].classList.add('on');await wait(550);L[i].classList.remove('on');await wait(250)}$('#gp').textContent='Your turn!';ok=true};
 L.forEach((b,i)=>b.onclick=()=>{if(!ok)return;b.classList.add('on');setTimeout(()=>b.classList.remove('on'),250);if(i===q[at]){if(++at===q.length){ok=false;res()}}else{toast('Not that one — watch again 💫');play()}});play()})}
function g3(){return new Promise(res=>{const t=30+Math.random()*40|0;$('#game').innerHTML='<h3>Key III — Tune the moonlight</h3><p id="gp">Slide until the orb shines brightest</p><div id="orb"></div><input type="range" min="0" max="100" value="5" id="sl" aria-label="Moonlight">';
 const o=$('#orb'),s=$('#sl');s.oninput=()=>{const d=Math.abs(s.value-t);o.style.opacity=Math.max(.15,1-d/40);o.style.transform=`scale(${1+(1-Math.min(d,40)/40)*.6})`;if(d<=4){s.disabled=true;res()}};s.oninput()})}
async function c5(){
 scene(`<div class="castle">${castle()}</div>${ch('guide','guide')}${ch('guardian','guardian')}<div id="keys">🗝 <b>0</b>/3</div><div class="panel" id="game"></div>`,4);hidden();
 await say(['Welcome, traveler of the moonlit path.','The final surprise sleeps inside this castle.','The door asks for three magical keys. Earn them, and it will open.'],'guardian');
 await say('Three keys. Don’t worry, I’ll be right here with hints if you need them. No judging.');
 let k=0;const ready=['Catch the falling stars — they won’t bite. Probably.','Watch the lanterns closely. Then copy them!','Almost there. Feel the moonlight!'];
 for(const g of [g1,g2,g3]){S.hint=ready[k];await g();document.querySelectorAll('.fall').forEach(x=>x.remove());k++;$('#keys b').textContent=k;addStar();toast(`🗝 Key ${k} of 3 collected!  ·  Ayoub: ${['Nice catch!','You’re far too good at this.','The castle is impressed. So am I.'][k-1]}`,4500);await wait(1200)}
 $('#game').innerHTML='<h3>The keys glow in unison…</h3><button class="btn now" id="dr">OPEN THE CASTLE DOOR</button>';await click('#dr');
 await say(['The door opens. The Moon Guardian bows to you.','Go on, Khadija. The last road is yours.'],'guardian');await say('Go ahead. I’ll walk with you.')}
/* ---------- CHAPTER 6 ---------- */
async function c6(){
 scene(`<div class="warp"></div>${ch('guide','guide walk')}${ch('khadija','kh walk')}<button class="door" id="door" hidden aria-label="Glowing door"></button>`,5);hidden();
 S.hint='Click the glowing door.';await wait(2500);
 await say(['We’re almost there, Khadija…','I wanted to make sure you enjoyed every step of this little adventure.']);
 const c=await ask('Can I tell you something? Walking this road with you made it better than I imagined.',['Aww… same 🥹','Stop, you’re making me blush','Okay, that was smooth 😂']);
 await say([['Then I’m glad it was you. Truly.','Good. That was the plan. (Was it? I forgot.)','I practiced that line for days. Worth it.'][c],'Come on. It’s time to show you what I prepared.']);
 $('#door').hidden=false;toast('A glowing door appears…');await click('#door')}
/* ---------- CHAPTER 7 ---------- */
const P=[['إلى خديجة،','rtl'],['يمكن هاد العالم غير خيال، ولكن الوقت والمجهود اللي تحطّو فيه حقيقيين.','rtl'],['بغيت نصايب ليك حاجة مختلفة، ماشي غير رسالة عادية ولا تهنئة كتدوز بحال أي نهار.','rtl'],['بغيتك تعيشي مغامرة صغيرة، تكتاشفي فيها أماكن وشخصيات، وتلقاي مفاجآت مخبيّة فكل مرحلة، حتى توصلي لهنا.','rtl'],['ما عرفت واش هاد المغامرة غادي تكون أجمل هدية، ولكن عرفت أنني بغيت ندير ليك شي حاجة تبقى ذكرى زوينة.','rtl'],['نتمنى ليك عاماً جديداً مليئاً بالفرح، والنجاح، واللحظات اللي تستاهل تبقاي فاكرها.','rtl'],['وحتى إلا كان هاد العالم خيالي، فالأمنيات الزوينة اللي فيه كلها حقيقية.','rtl'],['Happy Birthday, Khadija! ❤️','ltr'],['— Ayoub','ltr']];
async function c7(){
 scene(`${ch('spirit','spirit a')}${ch('guide','guide')}<button class="gift" id="gift" aria-label="Open the gift"><div class="lid"></div><div class="box"></div></button>`,6);
 const pt=setInterval(()=>{const p=document.createElement('i');p.className='petal';p.textContent=['🌸','🌼','✨','🌷'][Math.random()*4|0];p.style.left=Math.random()*100+'%';p.style.fontSize=14+Math.random()*16+'px';p.style.animationDuration=8+Math.random()*6+'s';document.body.append(p);setTimeout(()=>p.remove(),14000)},500);
 const r=await ask('This is it, Khadija. Are you ready?',['Ready 🎁','I’m a bit nervous…']);
 await say([r?'That makes two of us. But I promise it’s a good one.':'Then let’s not make the moon wait.','Tap the gift!']);toast('Tap the gift box 🎁');
 const e=await click('#gift');$('#gift').classList.add('open');burst(e.clientX,e.clientY,60);await wait(1400);
 st.insertAdjacentHTML('beforeend','<div class="bday">HAPPY BIRTHDAY, KHADIJA! 🎂</div>');for(let i=0;i<4;i++){burst(innerWidth*(.2+i*.2),innerHeight*.3,30);await wait(500)}
 await wait(2000);await say(['Happy birthday, Khadija.','I made this whole little world for you. One last thing — a letter. Read it when you’re ready.']);st.insertAdjacentHTML('beforeend','<div class="fin"><button class="btn now" id="rd">READ AYOUB’S LETTER</button></div>');await click('#rd');
 const m=$('#modal');m.hidden=false;m.innerHTML='<div class="paper ar" id="pp"></div>';const pp=$('#pp');
 for(const [t,d] of P){const e=document.createElement('p');e.dir=d;if(d==='ltr')e.style.textAlign='left';pp.append(e);for(let i=1;i<=t.length;i++){e.textContent=t.slice(0,i);pp.scrollTop=1e6;await wait(26)}await wait(500)}
 pp.insertAdjacentHTML('beforeend','<p style="text-align:center"><button class="btn now" id="cl">CLOSE</button> <button class="btn now" id="rs">RESTART THE ADVENTURE</button></p>');pp.scrollTop=1e6;
 $('#cl').onclick=()=>m.hidden=true;$('#rs').onclick=()=>location.reload();
 st.querySelector('.fin').innerHTML='<button class="btn now" id="rd2">READ THE LETTER AGAIN</button><button class="btn now" id="rs2">RESTART THE ADVENTURE</button>';
 $('#rd2').onclick=()=>m.hidden=false;$('#rs2').onclick=()=>location.reload()}
(async()=>{hud();for(const c of [c1,c2,c3,c4,c5,c6,c7])await c()})();
