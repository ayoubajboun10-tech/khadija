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
 for(const l of [].concat(lines)){t.textContent='';$('#av').className=/😂|hhh/i.test(l)?'laugh':/🥹|😅|🙈/.test(l)?'shy':'';await new Promise(res=>{let i=0;const iv=setInterval(()=>{t.textContent=l.slice(0,++i);if(i>=l.length)clearInterval(iv)},22);nx.onclick=()=>{if(i<l.length){i=l.length-1}else{clearInterval(iv);res()}}})}
 d.hidden=true}
async function ask(line,opts,who='guide'){const d=$('#dlg'),t=$('#tx'),nx=$('#nx'),o=$('#opts');d.hidden=false;nx.hidden=true;o.innerHTML='';$('#av').innerHTML=AV[who];t.textContent='';$('#av').className=/😂|hhh/i.test(line)?'laugh':/🥹|😅|🙈/.test(line)?'shy':'';
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
const MM=['L9mar kayhdr m3ak bchwiya. 🌙','L9mar ghmz lik.','Pssst… l9mar kay3ref chi secret 3la had lblasa.','L9mar kaygolik: wakha nti kdiri mzyan, a Khadija.','Ayoub tlb mn l9mar ybqa kay7rsk. ✨'];
$('#moon').onclick=e=>{burst(e.clientX,e.clientY,26);const m=$('#moon');m.classList.remove('wink');void m.offsetWidth;m.classList.add('wink');toast(MM[S.mc++%MM.length])};
$('#moon').onkeydown=e=>{if(e.key==='Enter')$('#moon').click()};
$('#hintb').onclick=()=>toast('💡 Ayoub: '+(S.hint||'Follow the glowing light!'),5200);
$('#mapb').onclick=()=>{const m=$('#modal');m.hidden=false;m.innerHTML=`<div class="paper" style="text-align:left"><h3>Map of the dream</h3><br>${NAMES.map((n,i)=>`<p>${i<=S.ch?(i<S.ch?'✦':'☾'):'🔒'} ${i<=S.ch?n:'Undiscovered'}</p>`).join('')}<br><button class="btn now" id="mc">Close</button></div>`;$('#mc').onclick=()=>m.hidden=true};
/* ---------- CHAPTER 1 ---------- */
async function c1(){
 scene(`<div class="center"><p class="intro">Somewhere between dreams and reality, a little adventure was waiting…</p><h1 class="wel">Welcome, Khadija.</h1><button class="btn" id="go">START THE JOURNEY</button></div>`,0);
 await click('#go');S.started=true;startMusic();
 scene(`${ch('guide','guide big')}<button class="stone" id="stone" hidden aria-label="Glowing stone"></button>`,0);
 await say(['Slaaam Khadija! 😂 Finally l9itk! Wach wajda lchi aventure?','Rah kayn wa7d secret bghit nwrih lik, walakin khassek ttb3ini lwl.']);
 const a=await ask('Ana Ayoub, w ghadi nkoun lguide dyalk. Wach nti wajda?',['Hhhh fin ghadi tdiwni?','Chno had secret?','Wach nta katkhbi 3lia chi haja? 😂']);
 await say([['Hhh sber chwiya, ghadi tchofi b 3inik. L3alam zwin bzzaf.','Hadchi howa lmochkil: ila gultih lik, ma b9ach secret 😂','Hhhh ana? Kan3ref nkhbi, walakin had lmarra khbit lik chi haja zwina. Wallah.'][a],'Yallah, tb3i dak noor lli kayn hna. Hadak howa tri9na.']);
 $('#stone').hidden=false;S.hint='Clicki 3la l7jra lli kat3ayet!';toast('Ayoub points at a glowing stone…');hidden();
 const s=await click('#stone');await say(['Chofi dak noor tmak! Ban lia khasna nmchiw nchofou ach kayn.','Matkhafich, ana m3ak 7ta lnihaya.'])}
/* ---------- CHAPTER 2 ---------- */
async function c2(){
 const I=[{x:14,y:68,e:'🌷',s:'Chi wa7d kan kaybtssm w howa kaysawb had l3alam.'},{x:48,y:80,e:'🍄',q:'Hadi ghir fotra... walakin kat9olik salam 😂'},{x:74,y:50,e:'🏮',s:'Machi koulchi zwin khassou ykoun fih sawt 3ali.'},{x:34,y:42,e:'✨',q:'Dbab d dow! Zwin, walakin ma kayn ta njma hna.'},{x:88,y:74,e:'🕯️',s:'Tfkkrou fik, w machi ghir merra.'},{x:60,y:64,e:'🌸',q:'Rit7a zwina, walakin mazal machi njma.'}];
 scene(`<div class="forest">${trees()}</div>${ch('guide','guide')}${ch('khadija','kh')}`+I.map((o,i)=>`<button class="item" data-i="${i}" style="left:${o.x}%;top:${o.y}%" aria-label="Glowing object">${o.e}</button>`).join(''),1);hidden();
 S.hint='Qelbi 3la lchya2 lli kaybrqo qrib mn chjar. Tlata fihom mkhbyin njoum!';let n=0;
 await say(['Hadi ghabat nojoum d-d3at. Tlata dyal njoum ta7o hna w ma 3rfnach fin.','3awnni nl9awhom — clicki 3la lchya2 lli kaybrqo.']);
 const f=await ask('Tnbih: chi 7wayj kaybrqo ghir fotr 😂 Wach t9drti tfar9i binathom?',['Bssohola.','Chwiya, la...']);
 await say(f?'Matkhafich, ghadi nchaj3ek b ssout 3ali w ghalat 😂':'Hhh hadchi li bghit nchof. Yallah!');
 await new Promise(res=>{st.querySelectorAll('.item').forEach(b=>b.onclick=e=>{const o=I[b.dataset.i];b.classList.add('off');if(o.s){n++;addStar(e);toast(`★ ${n}/3 — “${o.s}”  ·  Ayoub: ${['Bravo 3lik!','Wa7da khra! Fin kanti mkhbya?','Ma kontch 3aref belli nti had l9ed f lbi7ath 😂'][n-1]}`,5200);if(n===3)setTimeout(res,2200)}else toast(o.q)})});
 await say(['Tlata dyal njoum! L9itihom 9bel ma nl9ahom ana.','Wakha, ma kontch kan9elb bssa7... bghit ghir nchoufk katkhdmi 😂'])}
/* ---------- CHAPTER 3 ---------- */
async function c3(){
 const Y=['☾','✦','❀','♡'],D=[...Y,...Y].sort(()=>Math.random()-.5);
 scene(`<div class="panel"><div class="bridge locked" id="br"></div><h3>Match the magical symbols to unlock the bridge</h3><div class="grid">${D.map((y,i)=>`<button class="tile" data-y="${y}" aria-label="Hidden symbol">${y}</button>`).join('')}</div></div>${ch('guide','guide')}${ch('spirit','spirit a')}`,2);hidden();
 S.hint='9lbi joj dyal tuiles. Ila t9abtlo, kaybqaw kaybrqo. Khod wa9tk!';
 await say(['L9ntra dyal dikrayat. Msdoda, tab3an 😂','Jm3i rmoz lli kaychbhou, tft7 l9ntra. Ana ghadi nbqa hna w nt3ml rassi ma kanchofch 🙈']);
 await new Promise(res=>{let a=null,lock=false,m=0;st.querySelectorAll('.tile').forEach(b=>b.onclick=async()=>{if(lock||b.classList.contains('up')||b.classList.contains('ok'))return;b.classList.add('up');if(!a){a=b;return}
  if(a.dataset.y===b.dataset.y){a.className=b.className='tile ok';a=null;if(++m===4)res()}else{lock=true;await wait(800);a.classList.remove('up');b.classList.remove('up');a=null;lock=false}})});
 $('#br').classList.remove('locked');const b=await ask('Bravo 3lik! Kont 3arf ghadi twslti l hna. Sara7a, wach chkiti fiya?',['Mchkitch ta chwiya.','Chwiya 😅','Hadi ghir l7dh!']);
 await say([['Tiqa kamla! Hadchi li kanbghi fik.','Matkhafich, ana tani chkit chwiya f l9ntra 😅','L7dh? Wakha... walakin ana 3arf bli nti dkiya 😂'][b],'Chwiya 3lik, rah lmaghamara mazal f lbidaya!']);}
/* ---------- CHAPTER 4 ---------- */
const LET=['Machi koulchi zwin khassou sbab bach ykoun.','Kayn nas kayzidou chwiya dyal dow l nhar 3adi.','Chi wa7d fchi blasa 9arrar ysawb had l3alam sghir ghir 3lik nti.'];
async function c4(){
 scene(`<div class="center"><h3>Three letters float in the air</h3><div class="row">${LET.map((l,i)=>`<button class="env" data-i="${i}" aria-label="Open letter ${i+1}">💌</button>`).join('')}</div></div>${ch('guide','guide')}`,3);hidden();
 S.hint='Fte7 tlata dyal rssayl.';let n=0;
 await say(['Tlata dyal rssayl 3ayqin f lhwa, kolhom 3lik nti.','Ana lli ktbthom. Rfqi bia, ana mchi chi kateb kbir 😅']);
 await new Promise(res=>st.querySelectorAll('.env').forEach(b=>b.onclick=async e=>{const m=$('#modal');m.hidden=false;m.innerHTML=`<div class="paper"><p>${LET[b.dataset.i]}</p><button class="btn now" id="mc">Close</button></div>`;burst(e.clientX,e.clientY,22);
  if(!b.classList.contains('read')){b.classList.add('read');addStar();n++}$('#mc').onclick=()=>{m.hidden=true;if(n===3)setTimeout(res,300)}}));
 const l=await ask('Koulchi fihom kan bssa7, w mn 9lbi. Achmn wa7da 3jbtk bzzaf?',['Lwla','Tanya','Talta']);
 await say([['Bsita w sadqa. Dwq mzyan.','Hadik 3ziza 3liya bzzaf, ma tgoulich l-l7a9i9a 😂','Hadik hiya li 9rbt l l7a9i9a.'][l],'Daba l9sr. L7ares dyal l9mar kayt9ellek.']);}
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
 await say(['Mrhba biki, a msafra dyal tri9 l9mar.','Lmofaja2a lli kat3ayet 3lik mkhbya wra had lbab.','Walakin lbab bgha tlata dyal lmfatih. Jm3hom, w ghaytft7 lik.'],'guardian');
 await say('Tlata dyal lmfatih. Matkhafich, ana hna, ghadi n3awnek ila bghiti. W ma ghadich n7kem 3lik 😂');
 let k=0;const ready=['Clicki 3la njoum lli kayt7tou. Ma kay3adouch!','Chofi mzyan l lfanar, w 3awdi nfs tartib.','9riba! Zidi w n9ssi chwiya 7ta ybrq dow bzzaf.'];
 for(const g of [g1,g2,g3]){S.hint=ready[k];await g();document.querySelectorAll('.fall').forEach(x=>x.remove());k++;$('#keys b').textContent=k;addStar();toast(`🗝 Key ${k} of 3 collected!  ·  Ayoub: ${['Mzyan 3lik!','Nti dkiya bzzaf 😂','L9sr tbehr, w ana tani.'][k-1]}`,4500);await wait(1200)}
 $('#game').innerHTML='<h3>The keys glow in unison…</h3><button class="btn now" id="dr">OPEN THE CASTLE DOOR</button>';await click('#dr');
 await say(['Lbab tfta7. L7ares dyal l9mar kay7ni rassou lik.','Zidi, a Khadija. Tri9 lkhra dyalk.'],'guardian');await say('Yallah, ana ghadi nmchi m3ak.')}
/* ---------- CHAPTER 6 ---------- */
async function c6(){
 scene(`<div class="warp"></div>${ch('guide','guide walk')}${ch('khadija','kh walk')}<button class="door" id="door" hidden aria-label="Glowing door"></button>`,5);hidden();
 S.hint='Clicki 3la lbab lli kaybrq.';await wait(2500);
 await say(['9rbna, a Khadija… wa9ila tl3na f tri9 ghalat, walakin matgolich l7ta wa7d 😂','Bghit ntakd bli tmt3ti b koul khtwa f had lmaghamara sghira.']);
 const c=await ask('Wach n9ol lik chi 7aja? Lmchi m3ak f had tri9 kan a7sn mn li kont mtsawer.',['Awww... ana tani 🥹','Safi, rak katkhjlni 🙈','Hhh, hadchi 3lih smooth 😂']);
 await say([['Daba farhan bli kanti nti. Bssa7.','Hhh l7mdolillah, hadchi howa lplan. (Ola ma 3rftch... nsit 😂)','Tdrbt 3liha ayam. Chrfat 3liya 😂'][c],'Yallah, jat lwa9t bach nwrik chno wjdt lik.']);
 $('#door').hidden=false;toast('A glowing door appears…');await click('#door')}
/* ---------- CHAPTER 7 ---------- */
const P=[['L Khadija,','ltr'],['Yemken had l3alam ghir khayal, walakin lwa9t w lmjhoud lli 7tito fih 7a9i9iyin.','ltr'],['Bghit nsawb lik chi 7aja mkhtalfa, machi ghir risala 3adiya wla tahnia katdouz bhal ay nhar.','ltr'],['Bghitk t3ichi maghamara sghira, tkchfi fiha blasat w chakhsiyat, w tl9ay mofajaat mkhbya f koul marhala, 7ta twsli l hna.','ltr'],['Ma 3rftch wach had lmaghamara ghadi tkoun ajmal hdia, walakin 3rft bli bghit ndir lik chi 7aja tbqa dikra zwina.','ltr'],['Kanmnaw lik 3am jdid m3mer b lfr7a, nnajah, w llahdat lli tstahl tbqa fakra.','ltr'],['W 7ta ila kan had l3alam khayali, ltmnyat zwinin lli fih koulhom 7a9i9iyin. W nti, a Khadija, kanbghi nkoun dayman wa7ed mn nas lli kaychofk far7ana.','ltr'],['3id miladk mbarak, a Khadija! ❤️','ltr'],['— Ayoub','ltr']];
async function c7(){
 scene(`${ch('spirit','spirit a')}${ch('guide','guide')}<button class="gift" id="gift" aria-label="Open the gift"><div class="lid"></div><div class="box"></div></button>`,6);
 const pt=setInterval(()=>{const p=document.createElement('i');p.className='petal';p.textContent=['🌸','🌼','✨','🌷'][Math.random()*4|0];p.style.left=Math.random()*100+'%';p.style.fontSize=14+Math.random()*16+'px';p.style.animationDuration=8+Math.random()*6+'s';document.body.append(p);setTimeout(()=>p.remove(),14000)},500);
 const r=await ask('Hadi hiya, a Khadija. Wajda?',['Wajda 🎁','Kanxaf chwiya…']);
 await say([r?'Ana tani, walakin n3ahdk bli ghadi t3jbk.':'Yallah, ma ntkhrouch 3la l9mar.','Clicki 3la l hdia!']);toast('Tap the gift box 🎁');
 const e=await click('#gift');$('#gift').classList.add('open');burst(e.clientX,e.clientY,60);await wait(1400);
 st.insertAdjacentHTML('beforeend','<div class="bday">HAPPY BIRTHDAY, KHADIJA! 🎂</div>');for(let i=0;i<4;i++){burst(innerWidth*(.2+i*.2),innerHeight*.3,30);await wait(500)}
 await wait(2000);await say(['3id miladk mbarak, a Khadija.','Had l3alam kaml swebto b tari9a khassa, bach ykoun 3andek chi souvenir zwine.','Sara7a, kanbghi nchofk dayman far7ana. Bqat rissala lkhra — 9rawha melli tkouni wajda.']);st.insertAdjacentHTML('beforeend','<div class="fin"><button class="btn now" id="rd">READ AYOUB’S LETTER</button></div>');await click('#rd');
 const m=$('#modal');m.hidden=false;m.innerHTML='<div class="paper" id="pp"></div>';const pp=$('#pp');
 for(const [t,d] of P){const e=document.createElement('p');e.dir=d;pp.append(e);for(let i=1;i<=t.length;i++){e.textContent=t.slice(0,i);pp.scrollTop=1e6;await wait(26)}await wait(500)}
 pp.insertAdjacentHTML('beforeend','<p style="text-align:center"><button class="btn now" id="cl">CLOSE</button> <button class="btn now" id="rs">RESTART THE ADVENTURE</button></p>');pp.scrollTop=1e6;
 $('#cl').onclick=()=>m.hidden=true;$('#rs').onclick=()=>location.reload();
 st.querySelector('.fin').innerHTML='<button class="btn now" id="rd2">READ THE LETTER AGAIN</button><button class="btn now" id="rs2">RESTART THE ADVENTURE</button>';
 $('#rd2').onclick=()=>m.hidden=false;$('#rs2').onclick=()=>location.reload()}
(async()=>{hud();for(const c of [c1,c2,c3,c4,c5,c6,c7])await c()})();
