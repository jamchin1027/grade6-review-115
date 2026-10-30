let idiomZone='1',idiomCover=false;
const idiomZones=['啟航港','星光林','雲朵谷','勇氣橋','智慧泉','遠望峰','行動城','寶藏灣'];
function idiomStars(w){const s=data.idiomProgress?.[w.id]||{};return Number(s.blank===true)+Number(s.meaning===true)}
function idiomWords(zone){return zone==='all'?IDIOMS:IDIOMS.slice((Number(zone)-1)*8,Number(zone)*8)}
function renderIdioms(zone=idiomZone){
  idiomZone=zone==='all'||/^[1-8]$/.test(zone)?zone:'1';session=null;
  const words=idiomWords(idiomZone),stars=IDIOMS.reduce((n,w)=>n+idiomStars(w),0),mastered=IDIOMS.filter(w=>idiomStars(w)===2).length;
  const wrong=Object.values(data.wrong).flat().filter(q=>words.some(w=>w.id===q.idiomId));
  main.innerHTML=`<section class="idiom-world"><div class="detail-head"><button class="back-button" data-action="home">← 回探索地圖</button><div><div class="detail-kicker">家長提供成語講義 · 第 16–20 頁 · 編號 1–64</div><h1>成語天地 <span aria-hidden="true">🏝️</span></h1></div></div>
  <section class="idiom-hero"><div><span class="eyebrow">每天一小區，記住有方法</span><h2>認得意思，也寫得出來。</h2><p>① 看卡片理解 → ② 遮住回想 → ③ 填字、選意思 → ④ 看錯因再練一次。</p><p>先用手指在桌面寫，或在紙上默寫，再用平板輸入缺字。答題不計時，想好再確認。</p></div><div class="idiom-trophy"><strong>⭐ ${stars}<small> / 128 顆星</small></strong><span>${mastered} / 64 個成語亮起雙星</span><progress value="${stars}" max="128" aria-label="成語雙星進度"></progress><small>每個成語：填字、意思各一星。依各題型最近一次作答更新，答錯就再練亮。</small></div></section>
  <div role="navigation" class="idiom-zones" aria-label="成語分區">${idiomZones.map((name,i)=>{const group=idiomWords(String(i+1)),n=group.reduce((sum,w)=>sum+idiomStars(w),0);return `<a href="#idioms/${i+1}" ${idiomZone===String(i+1)?'aria-current="page"':''}><span>${n===16?'🏅':'🏝️'} ${name}</span><strong>${i*8+1}–${i*8+8}</strong><small>${n} / 16 星</small></a>`}).join('')}<a href="#idioms/all" ${idiomZone==='all'?'aria-current="page"':''}><span>📖 全部成語</span><strong>1–64</strong><small>完整複習</small></a></div>
  <section class="idiom-missions"><h2>${idiomZone==='all'?'全島總複習':idiomZones[Number(idiomZone)-1]+' · 第 '+words[0].no+'–'+words.at(-1).no+' 個'}</h2><div class="idiom-mission-grid"><button data-exam="idiom:${idiomZone}:blank:8:practice"><span>✎ 補字工坊</span><small>自己填 1～2 字 · 每次換挖空位置</small></button><button data-exam="idiom:${idiomZone}:meaning:8:practice"><span>🔎 意思偵探</span><small>選出意思 · 解開容易混淆的線索</small></button><button data-exam="idiom:${idiomZone}:mix:16:practice"><span>⭐ 雙星闖關</span><small>兩種考法一起練 · 未練題優先</small></button></div>
  <details class="idiom-exam-settings"><summary>調整題數／期中模擬考</summary><form id="idiomForm"><label>題型<select name="kind"><option value="mix">填字＋意思</option><option value="blank">只練填字</option><option value="meaning">只練意思</option></select></label><label>題數<select name="count"><option>8</option><option selected>16</option><option>20</option><option>全部</option></select></label><label>方式<select name="mode"><option value="practice">練習：確認後看解析</option><option value="mock">模擬考：交卷後看解析</option></select></label><button class="button" type="submit">開始這回合</button></form><p class="fineprint">每回合同一成語、同一題型最多一題。選「全部」時，本區綜合 16 題、全島綜合 128 題。填字依講義字形批改；可使用平板鍵盤的中文手寫輸入。</p></details></section>
  <div class="idiom-card-tools"><label class="cover-toggle"><input id="idiomCover" type="checkbox" ${idiomCover?'checked':''}>遮住成語，先看意思自己回想</label><button class="button button-small" data-exam="idiom:${idiomZone}:wrong:全部:practice" ${wrong.length?'':'disabled'}>修復本區錯題 · ${wrong.length} 題</button></div>
  <div class="idiom-grid">${words.map(w=>{const p=data.idiomProgress?.[w.id]||{};return `<article class="idiom-card"><div class="card-top"><span>第 ${w.no} 個</span><span class="idiom-stars" aria-label="填字${p.blank===true?'已亮星':'待練習'}，意思${p.meaning===true?'已亮星':'待練習'}">${p.blank===true?'★':'☆'} ${p.meaning===true?'★':'☆'}</span></div><h3>${idiomCover?'□□□□':esc(w.idiom)}</h3><p>${esc(w.meaning)}</p><details><summary>${idiomCover?'想好了？翻開成語':'看例句與記憶線索'}</summary>${idiomCover?`<strong class="idiom-reveal">${esc(w.idiom)}</strong>`:''}<p><strong>生活畫面：</strong>${esc(w.example)}</p><p><strong>記憶線索：</strong>${esc(w.tip)}</p><p class="fineprint">換你說說看：生活中什麼情況可以用這個成語？</p></details><div class="idiom-card-status"><span>✎ 填字 ${p.blank===true?'✓':p.blank===false?'再練一次':'未練'}</span><span>🔎 意思 ${p.meaning===true?'✓':p.meaning===false?'再練一次':'未練'}</span></div></article>`}).join('')}</div>
  <p class="vocab-source">範圍依你提供的 5 張成語講義照片整理，保留第 1–64 個的順序與主要寫法。解釋為白話整理，例句與練習另編。先按講義字形準備填空考；例如第 35 個主列「蕙質蘭心」，第 46 個是「孜孜矻矻」。</p></section>`;
}
function idiomRoundPool(zone,kind){
  const words=idiomWords(zone),pool=[];
  for(const w of words){
    if(kind!=='meaning')pool.push(...DRILL.select(IDIOM_QUESTIONS.filter(q=>q.idiomId===w.id&&q.type==='text'),1,data.seen));
    if(kind!=='blank')pool.push(IDIOM_QUESTIONS.find(q=>q.idiomId===w.id&&q.skill==='成語意思'));
  }
  return pool;
}
function launchIdiomExam(zone='1',kind='mix',count='16',mode='practice'){
  zone=zone==='all'||/^[1-8]$/.test(zone)?zone:'1';
  kind=['blank','meaning','mix','wrong'].includes(kind)?kind:'mix';mode=mode==='mock'?'mock':'practice';
  const words=idiomWords(zone),pool=kind==='wrong'?Object.values(data.wrong).flat().filter(q=>words.some(w=>w.id===q.idiomId)):idiomRoundPool(zone,kind);
  const size=count==='全部'?pool.length:Math.max(1,Number(count)||16);
  const items=DRILL.select(pool,size,data.seen),label={blank:'補字工坊',meaning:'意思偵探',mix:'雙星闖關',wrong:'錯題修復'}[kind];
  startExam(`idiom:${zone}:${kind}:${count}:${mode}`,items,'成語',`成語天地 · ${label} · ${items.length} 題`,mode);
}
document.addEventListener('change',e=>{if(e.target.id==='idiomCover'){idiomCover=e.target.checked;const y=window.scrollY;renderIdioms();window.scrollTo(0,y)}});
document.addEventListener('submit',e=>{if(e.target.id==='idiomForm'){e.preventDefault();const v=Object.fromEntries(new FormData(e.target));launchIdiomExam(idiomZone,v.kind,v.count,v.mode)}});
