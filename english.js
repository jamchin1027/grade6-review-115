let englishUnit='eng-1';
function englishBannerHtml(){return `<section class="english-banner"><div><span class="eyebrow">MIDTERM · ENGLISH LAB</span><h2>🧭 英文時光任務</h2><p>Here We Go 9 · Unit 1–2。看圖記詞 → 說出句子 → 找線索作答 → 修正錯因。</p></div><a class="button" href="#english/eng-1">進入英文教室 →</a></section>`;}
function renderEnglish(id){
  if(['eng-1','eng-2'].includes(id))englishUnit=id;
  session=null;const l=LESSONS.find(x=>x.id===englishUnit),words=ENGLISH_WORDS.filter(w=>w.lessonId===l.id);
  main.innerHTML=`<div class="detail-head"><button class="back-button" data-action="home">← 回期中地圖</button><div><div class="detail-kicker">翰林 HERE WE GO 9 · 六上期中</div><h1>🧭 英文時光任務</h1><p>Unit 1–2 · ${ENGLISH_QUESTIONS.length} 題另編練習</p></div></div>
  <div class="english-tabs">${LESSONS.filter(x=>x.subject==='英文').map(x=>`<a href="#english/${x.id}" class="vocab-tab ${x.id===l.id?'active':''}" ${x.id===l.id?'aria-current="page"':''}>${x.unit}<span lang="en">${esc(x.title)}</span></a>`).join('')}</div>
  <section class="learning-route"><h2>今天用這 4 步學，不急著猜答案</h2><ol><li><strong>看圖說詞</strong><span>先看中文，猜英文，再翻卡；聽完跟讀。</span></li><li><strong>配一句話</strong><span>把單字放進 yesterday 或 last weekend 的句子。</span></li><li><strong>找兩個線索</strong><span>先找「何時」，再找 did / didn’t 或問句。</span></li><li><strong>說出錯因</strong><span>讀解析後，遮答案再說一次完整句。</span></li></ol></section>
  <section class="english-rule"><h2>${esc(l.title)}</h2><p>${esc(l.goal)}</p><div class="point-list">${l.points.map(p=>`<article class="point"><span aria-hidden="true">💡</span><div><h3>${esc(p[0])}</h3><p>${esc(p[1])}</p></div></article>`).join('')}</div></section>
  <section><div class="section-header"><div><h2>🎒 單字翻卡</h2><p>先看中文回想，翻開核對，再按喇叭跟讀。朗讀是裝置合成語音，並非課本錄音；口說不會錄音或自動評分。</p></div></div><div class="english-word-grid">${words.map(w=>`<article class="english-word"><div class="word-emoji" aria-hidden="true">${w.emoji}</div><h3>${w.zh}</h3><details><summary>我想好了，翻開英文</summary><p class="word-en" lang="en">${w.en}</p>${w.base?`<p lang="en">${w.base} → <strong>${w.past}</strong></p>`:'<p>Where 問地點，將整組地點名稱一起記。</p>'}<button class="speak-button" data-english-say="${w.id}">🔊 聽英文並跟讀</button></details></article>`).join('')}</div></section>
  <section class="sentence-lab"><h2>🛠️ 句子變身工坊</h2><p>選一個活動，觀察同一件事如何變成肯定句、問句、否定句。先自己說，再核對下方句子。</p><label for="sentenceActivity">想練的活動</label><select id="sentenceActivity">${words.filter(w=>w.base).map(w=>`<option value="${w.id}">${w.zh} · ${w.base}</option>`).join('')}</select><div id="sentencePreview"></div></section>
  <section class="english-sounds"><h2>👂 字母發音小站</h2><p>${l.id==='eng-1'?'比較 c 的兩種聲音：ice、city 是 /s/；candy、cake 是 /k/。':'比較 g 的兩種聲音：cage、magic 是 /dʒ/；garden、game 是 /ɡ/。'} 這裡先聽例字；測驗的發音題是看字辨音。</p><div class="sound-actions">${(l.id==='eng-1'?['ice','city','candy','cake']:['cage','magic','garden','game']).map(w=>`<button class="speak-button" data-phonics-say="${w}">🔊 ${w}</button>`).join('')}</div></section>
  <section class="english-start"><h2>🎯 期中練習任務</h2><p>練習答錯後，先看「你的選項為何不合」，再練「換你試試」。模擬考可以回前題修改，交卷後才公布答案。</p><div class="english-quiz-fields"><label>練習範圍<select id="englishScope"><option value="${l.id}">本單元</option><option value="all">Unit 1＋Unit 2</option></select></label><label>題型<select id="englishSkill"><option>全部</option>${['英文單字','英文句型','英文閱讀','英文發音'].map(x=>`<option>${x}</option>`).join('')}</select></label><label>題數<select id="englishCount"><option>10</option><option>20</option><option>全部</option></select></label><label>方式<select id="englishMode"><option value="practice">邊做邊學</option><option value="mock">期中模擬考</option></select></label></div><button class="button" data-english-start>開始英文任務 →</button></section>
  <aside class="vocab-source"><strong>範圍與來源</strong><p>依你確認的 Here We Go 9 單元名稱及公開學校課程計畫整理單字、句型與拼讀範圍。本站的日記、活動卡、題目和解析為另編，並非課本故事或原卷重製；實際期中進度以老師公告為準。</p><a href="${ENGLISH_SOURCE}" target="_blank" rel="noopener noreferrer">核對 Here We Go 9 公開課程計畫 ↗</a></aside>`;
  renderSentenceLab();updateTop();window.scrollTo(0,0);
}
function renderSentenceLab(){
  const select=document.querySelector('#sentenceActivity'),el=document.querySelector('#sentencePreview');if(!select||!el)return;
  const w=ENGLISH_WORDS.find(w=>w.id===select.value);if(!w)return;
  const tail=w.tail?' '+w.tail:'';
  el.innerHTML=`<div class="sentence-grid"><article><h3>✅ 說做過</h3><p lang="en">He <strong>${w.past}</strong>${tail} yesterday.</p><span>沒有 did，肯定句的動詞變成過去式。</span></article><article><h3>❓ 問做過嗎</h3><p lang="en"><strong>Did</strong> he <strong>${w.base}</strong>${tail} yesterday?</p><span>Did 已表示過去，後面回原形。</span></article><article><h3>🙅 說沒做</h3><p lang="en">He <strong>didn't ${w.base}</strong>${tail} yesterday.</p><span>didn’t 後也用原形。</span></article></div><button class="speak-button" data-sentence-say="${w.id}">🔊 聽三句，再試著跟讀</button>`;
}
function englishQuizPool(scope,skill){return ENGLISH_QUESTIONS.filter(q=>(scope==='all'||q.lessonId===scope)&&(skill==='全部'||q.skill===skill));}
function launchEnglishExam(scope,skill,count,mode){
  const pool=englishQuizPool(scope,skill);const title=(scope==='all'?'Unit 1–2':LESSONS.find(l=>l.id===scope)?.unit)+' · 英文期中';
  startExam(`english:${scope}:${skill}:${count}:${mode}`,DRILL.select(pool,count==='全部'?pool.length:Number(count),data.seen),'英文',title,mode);
}
function speakEnglish(text){
  if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){notify('這個瀏覽器不支援朗讀，可以看句子自行跟讀。');return;}
  window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.8;
  const voice=window.speechSynthesis.getVoices().find(v=>v.lang==='en-US')||window.speechSynthesis.getVoices().find(v=>v.lang.startsWith('en'));if(voice)u.voice=voice;
  u.onerror=()=>notify('朗讀暫時無法播放，請確認裝置語音功能。');window.speechSynthesis.speak(u);
}
document.addEventListener('change',e=>{if(e.target.id==='sentenceActivity')renderSentenceLab();});
document.addEventListener('click',e=>{
  const start=e.target.closest('[data-english-start]');if(start)launchEnglishExam(...['Scope','Skill','Count','Mode'].map(k=>document.querySelector('#english'+k).value));
  const word=e.target.closest('[data-english-say]');if(word){const w=ENGLISH_WORDS.find(w=>w.id===word.dataset.englishSay);if(w)speakEnglish(w.en);}
  const sound=e.target.closest('[data-phonics-say]');if(sound)speakEnglish(sound.dataset.phonicsSay);
  const sentence=e.target.closest('[data-sentence-say]');if(sentence){const w=ENGLISH_WORDS.find(w=>w.id===sentence.dataset.sentenceSay);if(w){const tail=w.tail?' '+w.tail:'';speakEnglish(`He ${w.en} yesterday. Did he ${w.base}${tail} yesterday? He didn't ${w.base}${tail} yesterday.`);}}
});
