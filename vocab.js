(() => {
  const tones = ['', 'ˊ', 'ˇ', 'ˋ'];
  window.VOCAB_QUESTIONS = VOCAB_WORDS.flatMap(w => {
    const syllable = w.reading.replace(/[ˊˇˋ˙]/g,'');
    const sounds = [w.reading, ...tones.map(t => syllable+t).filter(p=>p!==w.reading)].slice(0,4);
    const marked = w.word.replace(w.char, `「${w.char}」`);
    const common = {lessonId:w.lessonId, vocabId:w.id, answer:0, origin:'課本生字延伸・本站另編', referenceUrl:w.sourceUrl, dictionaryUrl:w.dictionaryUrl};
    return [
      {...common, id:w.id+'-sound', skill:'生字注音', q:`${marked}中的「${w.char}」，正確的注音是哪一個？`, options:sounds, explain:`「${w.word}」的「${w.char}」讀 ${w.reading}。${w.meaning}${w.note?' '+w.note:''}`},
      {...common, id:w.id+'-char', skill:'生字國字', q:`「${w.word.replaceAll(w.char,'□')}」表示：${w.meaning.replaceAll(w.char,'□')} □ 的注音是 ${w.reading}，應填哪個國字？`, options:[w.char,...w.confusions], explain:`正確寫法是「${w.word}」，填「${w.char}」（${w.reading}）。${w.note||'請留意字的部件，再用手寫一次完整詞語。'}`}
    ];
  });
  for(const l of LESSONS) l.questions.push(...VOCAB_QUESTIONS.filter(q=>q.lessonId===l.id));
  QUESTION_BANK.push(...VOCAB_QUESTIONS);
  for(const ex of Object.values(EXAMS)) ex.questions = LESSONS.filter(l=>ex.subject==='混合'||l.subject===ex.subject).flatMap(l=>l.questions);
})();

let vocabLesson = 'chi-1';
let vocabCover = false;
let vocabCount = '10';
let vocabKind = 'mix';
function vocabIntroHtml(){
  return `<section class="vocab-banner"><div><span class="eyebrow">WORDS & SOUNDS</span><h2>國語生字練習</h2><p>南一 115 六上，第 1–6 課共 ${VOCAB_WORDS.length} 個生字。先認字、讀音，再遮住答案動筆寫。</p></div><a class="button" href="#vocab/chi-1">打開生字本 →</a></section>`;
}
function renderVocab(id){
  if(LESSONS.some(l=>l.subject==='國語'&&l.id===id))vocabLesson=id;
  session=null;
  const l=LESSONS.find(l=>l.id===vocabLesson), words=VOCAB_WORDS.filter(w=>w.lessonId===vocabLesson);
  main.innerHTML=`<div class="detail-head"><button class="back-button" data-action="home">← 回探索地圖</button><div><div class="detail-kicker">南一版 · 115 學年度六上 · 第 1–6 課</div><h1>生字練習本</h1><p>${VOCAB_WORDS.length} 個生字 · ${VOCAB_QUESTIONS.length} 題注音／國字練習</p></div></div><div class="vocab-tabs" role="group" aria-label="選擇生字課次">${LESSONS.filter(x=>x.subject==='國語').map(x=>`<a class="vocab-tab ${x.id===vocabLesson?'active':''}" ${x.id===vocabLesson?'aria-current="page"':''} href="#vocab/${x.id}">${x.unit}<span>${esc(x.title)}</span></a>`).join('')}</div><section class="vocab-workbench"><div><h2>${esc(l.title)} · ${words.length} 個生字</h2><p>先看詞語讀一遍；再切換「遮字默寫」，在紙上寫出空格，最後展開卡片核對。</p><label class="cover-toggle"><input id="vocabCover" type="checkbox" ${vocabCover?'checked':''}> 遮字默寫：先寫，再點開看答案</label></div><div class="vocab-quiz-options"><label>題型<select id="vocabKind"><option value="mix" ${vocabKind==='mix'?'selected':''}>注音＋國字混合</option><option value="sound" ${vocabKind==='sound'?'selected':''}>看生字選注音</option><option value="char" ${vocabKind==='char'?'selected':''}>看注音選國字</option></select></label><label>題數<select id="vocabCount">${['10','20','全部'].map(n=>`<option ${n===vocabCount?'selected':''}>${n}</option>`).join('')}</select></label><button class="button" data-vocab-start="lesson">練本課生字 →</button><button class="button button-small" data-vocab-start="all">六課混合挑戰</button></div></section><div class="vocab-card-grid">${words.map(w=>`<article class="vocab-card"><div class="vocab-glyph" aria-label="${vocabCover?'待默寫的生字':esc(w.char)}">${vocabCover?'？':esc(w.char)}</div><div class="vocab-reading">${esc(w.reading)}</div><h3>${esc(vocabCover?w.word.replaceAll(w.char,'□'):w.word)}</h3><p>${esc(vocabCover?w.meaning.replaceAll(w.char,'□'):w.meaning)}</p><details><summary>${vocabCover?'我寫好了，看答案':'看字形提醒'}</summary><div class="vocab-answer"><strong>${esc(w.char)} · ${esc(w.word)}</strong><p>${esc(w.note||`這裡寫「${w.char}」。比較字形：${w.confusions.join('、')}；再用手寫一次「${w.word}」。`)}</p><a href="${esc(w.dictionaryUrl)}" target="_blank" rel="noopener noreferrer">教育百科查讀音、部首與筆順 ↗</a></div></details></article>`).join('')}</div><aside class="vocab-source"><strong>生字範圍已核對</strong><p>依教育部教育雲「115 學年度上學期・六年級・國語・南一版」逐課生字詞彙表，只收錄標示為「生字」的項目。詞語、簡要說明及練習由本站整理；多音字的題目以指定詞語判斷讀音。</p><a href="${esc(words[0].sourceUrl)}" target="_blank" rel="noopener noreferrer">查看本課教育雲生字表 ↗</a><p>默寫採自己動筆、自己核對，不會自動辨識筆跡或判分；選擇題才會記入答題紀錄。</p></aside>`;
  updateTop();
}
function beginVocabExam(scope='lesson',id){
  if(id)vocabLesson=id;
  const kind=document.querySelector('#vocabKind');
  const count=document.querySelector('#vocabCount');
  if(kind)vocabKind=kind.value;
  if(count)vocabCount=count.value;
  const lessonId=scope==='all'?'all':vocabLesson;
  launchVocabExam(lessonId,vocabKind,vocabCount);
}
function launchVocabExam(lessonId,kind,count){
  const pool=VOCAB_QUESTIONS.filter(q=>(lessonId==='all'||q.lessonId===lessonId)&&(kind==='mix'||q.id.endsWith('-'+kind)));
  const title=lessonId==='all'?'六課生字混合':LESSONS.find(l=>l.id===lessonId)?.title+' · 生字';
  if(!pool.length)return notify('找不到這個生字範圍，請回生字本重新選擇。');
  startExam(`vocab:${lessonId}:${kind}:${count}`,DRILL.select(pool,count==='全部'?pool.length:Number(count),data.seen),'國語',title);
}
document.addEventListener('change',e=>{
  if(e.target.id==='vocabCover'){vocabCover=e.target.checked;renderVocab(vocabLesson);}
  if(e.target.id==='vocabKind')vocabKind=e.target.value;
  if(e.target.id==='vocabCount')vocabCount=e.target.value;
});
document.addEventListener('click',e=>{const b=e.target.closest('[data-vocab-start]');if(b)beginVocabExam(b.dataset.vocabStart);});
