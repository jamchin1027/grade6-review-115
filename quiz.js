// Response slots belong to question positions. Navigation never reshuffles or scores twice.
function startExam(id,items,subject,title,mode='practice'){
  if(!items?.length){notify('目前沒有可練習的題目。');return renderHome();}
  textComposing=false;
  const shuffled=DRILL.shuffle(items.map(normalizeQuestion)).map(q=>DRILL.options(q));
  session={examId:id,items:shuffled,index:0,answered:false,selected:null,correct:0,combo:0,bestCombo:0,xpEarned:0,levelBefore:Math.floor((data.xp||0)/100)+1,subject,title,mode,responses:Array(shuffled.length).fill(null),drafts:Array(shuffled.length).fill(null),finished:false};
  renderQuestion();window.scrollTo(0,0);
}
function goQuestion(index,incomplete=false){
  if(!session?.items||session.finished||!Number.isInteger(index)||index<0||index>=session.items.length)return;
  textComposing=false;session.index=index;session.incomplete=incomplete;renderQuestion();window.scrollTo(0,0);
}
function learningFeedback(q,selected){
  const right=q.type==='text'?selected===q.expected:selected===q.answer,choice=q.type==='text'?selected:q.options[selected],correct=q.options[q.answer];
  let reason=q.optionFeedback?.[choice],clue=q.clue,rule=q.rule,tryIt=q.tryIt;
  if(q.type==='text'){const w=IDIOMS.find(w=>w.id===q.idiomId);const comparison=Array.from(q.expected).map((c,i)=>choice?.[i]===c?`第 ${i+1} 格「${c}」正確`:`第 ${i+1} 格你填「${choice?.[i]||'空白'}」，應是「${c}」`).join('；');reason=`${comparison}。完整寫法是「${w.idiom}」。${w.tip} 意思：${w.meaning}`;}
  if(q.vocabId){const w=VOCAB_WORDS.find(w=>w.id===q.vocabId);if(w){clue=`指定詞語「${w.word}」`;rule=`${w.char}：${w.reading}。${w.note||'把字、讀音和詞語連起來記。'}`;tryIt=`遮住答案，先念「${w.word}」，再在紙上寫一次。`;
    reason=right?`你把詞語、字形與讀音配對了。`:q.skill==='生字注音'?`你選的「${choice}」與這裡「${w.word}」的讀音 ${w.reading} 不同；請比較聲調，並留意多音字要看詞語。`:`題目要完成「${w.word}」，所以應寫「${w.char}」；你選的「${choice}」是另一個字。請對照部件，再自己寫出完整詞語。`;}}
  const subject=LESSONS.find(l=>l.id===q.lessonId)?.subject;
  if(!tryIt)tryIt=subject==='自然'?'用自己的話說出實驗條件或現象的原因，再想一個可以驗證的例子。':subject==='社會'?'用「事件／制度 → 原因 → 影響」說明答案，不只背選項。':'遮住選項，指出題目中的行動或描述，說明它怎麼支持答案。';
  return `<div class="explain ${right?'good':'try'}"><h2>${right?'🌟 答對，也說說理由':'🔎 找到可以修正的一步'}</h2><p><strong>你的答案：</strong>${esc(choice)}</p><p><strong>正確答案：</strong>${esc(correct)}</p><div class="feedback-steps">${clue?`<p><strong>① 找線索</strong><br>${esc(clue)}</p>`:''}<p><strong>${clue?'②':'①'} ${right?'為什麼正確':'這個選項為何不合'}</strong><br>${esc(reason||`${right?'這個答案符合題目線索。':'把你選的答案與下列判斷依據對照：'} ${q.explain}`)}</p><p><strong>${clue?'③':'②'} 記住判斷方法</strong><br>${esc(rule||q.explain)}</p></div><details class="explain-back"><summary>🗣️ 換你試試：遮住答案說一次</summary><p>${esc(tryIt)}</p><p>自我檢查：我有說出線索嗎？我能解釋另一個選項為何不合嗎？這是口頭練習，不自動評分。</p></details></div>`;
}
function trainingRank(level){return level>=10?'知識大師':level>=7?'學習探險家':level>=4?'解題高手':'練功新手'}
function trainingHud(s,done){
  const xp=data.xp||0,level=Math.floor(xp/100)+1,within=xp%100,goal=Math.min(5,s.items.length),cleared=Math.min(goal,done),milestones=[...new Set([1,3,goal])];
  return `<section class="training-hud" aria-label="本回合練功進度"><div class="training-top"><div class="training-rank"><span class="training-avatar" aria-hidden="true">🧭</span><div><strong>Lv.${level} ${trainingRank(level)}</strong><small>累積 ${xp} XP${s.mode==='mock'?' · 交卷後結算':''}</small></div></div><div class="training-stats"><span>⚡ 本回合 +${s.xpEarned} XP</span><span>🔥 連對 ${s.combo} 題</span></div></div><div class="level-track" role="progressbar" aria-label="升級經驗值" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${within}"><i style="width:${within}%"></i></div><div class="training-bottom"><span>下一級還差 ${100-within} XP</span><span>小目標 ${cleared}/${goal} 題</span></div><div class="quest-steps" aria-label="本回合小目標">${milestones.map(n=>`<span class="quest-step ${cleared>=n?'cleared':''}">${cleared>=n?'✓':'○'} ${n===goal?'完成這回合':`答完 ${n} 題`}</span>`).join('')}</div>${s.combo>=2?`<p class="combo-note" role="status">✨ 連對 ${s.combo} 題！再接再厲，連對 3 題有額外 XP。</p>`:''}</section>`
}
function renderQuestion(){
  const s=session,q=s.items[s.index],length=s.items.length,r=s.responses[s.index];s.answered=!!r;s.selected=s.drafts[s.index]??r?.selected??null;
  const reveal=!!r&&s.mode!=='mock',done=s.responses.filter((r,i)=>r&&s.drafts[i]===r.selected).length,pending=s.selected!==null&&(!r||s.selected!==r.selected);
  main.innerHTML=`<section class="exam-shell"><div class="exam-shell-top"><button class="back-button" data-action="exit-exam">← 離開本回合</button><span class="mini-tag">${esc(s.title)}</span></div>${trainingHud(s,done)}<div class="exam-progress" role="progressbar" aria-label="答題進度" aria-valuemin="0" aria-valuemax="${length}" aria-valuenow="${done}"><i style="width:${pct(done/length)}%"></i></div><details class="question-map"><summary>🗺️ 題號地圖 · 已答 ${done} / ${length}（可跳題）</summary><p>● 已確認；◐ 待確認；○ 未選。點題號回看，選項會保留。</p><div class="question-numbers">${s.items.map((_,i)=>{const confirmed=s.responses[i]&&s.drafts[i]===s.responses[i].selected,picked=s.drafts[i]!==null;return `<button data-question-index="${i}" class="${confirmed?'is-answered':''}" ${i===s.index?'aria-current="step"':''} aria-label="第 ${i+1} 題，${confirmed?'已確認':picked?'待確認':'未選'}">${confirmed?'●':picked?'◐':'○'} ${i+1}</button>`;}).join('')}</div></details><div class="question-box"><div class="question-meta">第 ${s.index+1} 題 / ${length} 題 · ${esc(LESSONS.find(l=>l.id===q.lessonId)?.title||s.subject)}</div><p class="fineprint">${s.mode==='mock'?'模擬考：先作答，再按「確認答案」。修改後也要確認，交卷後才看解析。':'練習模式：先作答，再按「確認答案」看解析。確認前可修改；確認後可往前回看。'}</p>${s.incomplete?'<p class="incomplete-note" role="status">還有題目沒作答或尚未確認，已帶你到需要確認的題目；請按「確認答案」後再交卷。</p>':''}<h1 class="question-text">${esc(q.q)}</h1>${q.type==='text'?textAnswerHtml(q,s.selected,reveal):`<div class="option-list">${q.options.map((o,i)=>{let cls='';if(reveal&&i===q.answer)cls='correct';else if(reveal&&i===s.selected)cls='wrong';else if(i===s.selected)cls='selected';return `<button class="option ${cls}" data-answer="${i}" aria-pressed="${i===s.selected}" ${reveal?'disabled':''}><span class="option-letter">${String.fromCharCode(65+i)}</span><span>${esc(o)}</span></button>`;}).join('')}</div>`}${reveal?`${learningFeedback(q,s.selected)}${questionSourceHtml(q)}`:confirmationHtml(s,q,r,pending)}<div class="question-controls"><button class="button button-small" data-action="prev-question" ${s.index===0?'disabled':''}>← 上一題</button><span class="question-meta">${s.mode==='mock'?'已答 '+done+' 題':'答對 '+s.correct+' 題'}</span><button class="button" data-action="${s.index===length-1?'finish-exam':'next-question'}">${s.index===length-1?'交卷看結果':'下一題 →'}</button></div></div></section>`;
}
function recordResponse(r){
  if(r.recorded)return;r.recorded=true;const q=r.q,s=session,earned=r.correct?10:5;data.xp=(data.xp||0)+earned;if(s){s.xpEarned+=earned;if(r.correct){s.combo++;s.bestCombo=Math.max(s.bestCombo,s.combo);if(s.combo%3===0){data.xp+=5;s.xpEarned+=5;}}else s.combo=0;}
  if(q.idiomId){data.idiomProgress ||= {};const p=data.idiomProgress[q.idiomId] ||= {};p[q.type==='text'?'blank':'meaning']=r.correct;}
  data.seen[q.id]=true;data.totalAnswered++;
  const day=d=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-'),today=day(new Date());
  if(data.lastDay!==today){const prev=new Date();prev.setDate(prev.getDate()-1);data.streak=data.lastDay===day(prev)?data.streak+1:1;data.lastDay=today;}
  const id=q.lessonId||findLessonForQuestion(q),st=data.stats[id]||(data.stats[id]={seen:0,correct:0});st.seen++;
  if(r.correct){data.totalCorrect++;st.correct++;removeWrong(q);if(!q.idiomId)data.done[id]=true;}
  else {const list=data.wrong[id]||(data.wrong[id]=[]),saved={...q,selectedAnswer:q.type==='text'?r.selected:q.options[r.selected]};const i=list.findIndex(x=>x.id===q.id||x.q===q.q);if(i<0)list.push(saved);else list[i]=saved;}
  if(q.idiomId){if(IDIOMS.every(w=>idiomStars(w)===2))data.done[id]=true;else delete data.done[id];}
}
function answer(i){
  const s=session;if(!s?.items||s.finished||(s.mode!=='mock'&&s.responses[s.index]))return;
  const q=s.items[s.index];if(q.type==='text')return;if(!Number.isInteger(i)||i<0||i>=q.options.length)return;
  s.drafts[s.index]=i;renderQuestion();
  document.querySelector('[data-answer="'+i+'"]')?.focus();
}
function confirmAnswer(){
  const s=session;if(!s?.items||s.finished||(s.mode!=='mock'&&s.responses[s.index]))return;
  const q=s.items[s.index],i=s.drafts[s.index];
  if(!validDraft(q,i)||textComposing||s.responses[s.index]?.selected===i)return;
  const r={q,selected:i,correct:q.type==='text'?i===q.expected:i===q.answer};s.responses[s.index]=r;s.correct=s.responses.filter(x=>x?.correct).length;s.incomplete=false;
  if(s.mode!=='mock'){recordResponse(r);saveData();updateTop();}renderQuestion();
}
function finishExam(){
  if(!session?.items)return;
  const s=session,missing=s.responses.findIndex((r,i)=>!r||s.drafts[i]!==r.selected);
  if(missing>=0){goQuestion(missing,true);return;}
  if(!s.finished){s.responses.forEach(recordResponse);s.finished=true;saveData();}
  renderResult();
}
function reviewHtml(s){return `<section class="attempt-review"><h2>這回合的答案與解析</h2><p>找到線索 → 比較選項 → 用自己的話說一次。先複習「待複習」的題目。</p>${s.responses.filter(Boolean).map((r,i)=>`<article class="review-item ${r.correct?'is-correct':'is-wrong'}"><div class="question-meta">第 ${i+1} 題 · ${r.correct?'✓ 答對':'待複習'}</div><h3>${esc(r.q.q)}</h3>${learningFeedback(r.q,r.selected)}${questionSourceHtml(r.q)}</article>`).join('')}</section>`;}
document.addEventListener('click',e=>{const jump=e.target.closest('[data-question-index]');if(jump)goQuestion(Number(jump.dataset.questionIndex));});
