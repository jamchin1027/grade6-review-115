// Pure selection helpers are also exercised by tests/check.mjs.
window.DRILL = {
  shuffle(items, random = Math.random) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
    return result;
  },
  options(q, random = Math.random) {
    const order = this.shuffle(q.options.map((_,i) => i), random);
    return {...q, options:order.map(i => q.options[i]), answer:order.indexOf(q.answer)};
  },
  select(pool, count, seen = {}, random = Math.random) {
    const unique = [...new Map(pool.map(q => [q.id || q.q, q])).values()];
    const unseen = unique.filter(q => !seen[q.id || q.q]);
    const old = unique.filter(q => seen[q.id || q.q]);
    return [...this.shuffle(unseen, random), ...this.shuffle(old, random)].slice(0, count);
  }
};
let lastDrill = {subject:'全部', lesson:'全部', school:'全部', skill:'全部', count:'20', mode:'practice'};
function sourceFor(q) { return PAPERS.find(p => p.id === q.sourceId); }
function questionSourceHtml(q) {
  const p = sourceFor(q);
  if(q.referenceUrl)return `<div class="question-source"><strong>${esc(q.origin)}</strong><br>南一 115 六上・教育雲生字表<br><a href="${esc(q.referenceUrl)}" target="_blank" rel="noopener noreferrer">本課生字來源 ↗</a> · <a href="${esc(q.dictionaryUrl)}" target="_blank" rel="noopener noreferrer">字典核對讀音 ↗</a></div>`;
  return `<div class="question-source"><strong>${esc(q.origin || '原創概念題')}</strong>${p ? `<br>參考：${esc(p.school)} · ${p.year} 學年度 · 原卷 ${esc(p.grade)}<br>${esc(q.sourceRef || '')}<br><a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">對照原卷 ↗</a>` : ''}</div>`;
}
function drillHtml() {
  const schools = [...new Set(PAPERS.filter(p => p.kind !== '競賽').map(p => p.school))];
  return `<section class="drill-panel" aria-labelledby="drill-title"><div class="section-header"><div><span class="eyebrow">PRACTICE LAB</span><h2 id="drill-title">刷題練功房</h2><p>共 ${QUESTION_BANK.length} 題：${QUESTION_BANK.filter(q=>q.sourceId).length} 題歷屆考點延伸＋${QUESTION_BANK.filter(q=>!q.sourceId&&!q.referenceUrl).length} 題原創概念題＋${VOCAB_QUESTIONS.length} 題生字練習。先練未做過的，再回頭鞏固。</p></div><span class="bank-count">${QUESTION_BANK.length}<small>道題目</small></span></div><form id="drillForm"><div class="drill-fields"><label>學科<select name="subject">${subjects.map(s=>`<option ${lastDrill.subject===s?'selected':''}>${s}</option>`).join('')}</select></label><label>課文／單元<select name="lesson"><option value="全部">全部單元</option>${LESSONS.map(l=>`<option value="${l.id}" ${lastDrill.lesson===l.id?'selected':''}>${l.subject} ${l.unit}｜${esc(l.title)}</option>`).join('')}</select></label><label>考點來源學校<select name="school"><option>全部</option>${schools.map(s=>`<option ${lastDrill.school===s?'selected':''}>${esc(s)}</option>`).join('')}<option ${lastDrill.school==='原創概念題'?'selected':''}>原創概念題</option></select></label><label>題型<select name="skill">${['全部','閱讀與概念','生字注音','生字國字'].map(s=>`<option ${lastDrill.skill===s?'selected':''}>${s}</option>`).join('')}</select></label><label>每回合題數<select name="count">${['10','20','40','全部'].map(n=>`<option ${lastDrill.count===n?'selected':''}>${n}</option>`).join('')}</select></label><label>練習方式<select name="mode"><option value="practice" ${lastDrill.mode==='practice'?'selected':''}>邊做邊學｜即時解析</option><option value="mock" ${lastDrill.mode==='mock'?'selected':''}>模擬考｜考後看解析</option></select></label></div><div class="drill-start"><p id="drillAvailability" role="status"></p><button class="button" type="submit">出發刷題 →</button></div></form><p class="fineprint">同回合不重複，選項順序每回合重排。未作答的題目會保留為未練習。慈濟競賽原卷請到下方「進階競賽」閱讀。</p></section>`;
}
function readDrill() {
  const form = document.querySelector('#drillForm');
  return form ? Object.fromEntries(new FormData(form)) : lastDrill;
}
function drillPool(config) {
  return QUESTION_BANK.filter(q=>{
    const l = LESSONS.find(l=>l.id===q.lessonId), p=sourceFor(q);
    return (!config.skill||config.skill==='全部'||(config.skill==='閱讀與概念'?!q.skill:q.skill===config.skill)) && (config.subject==='全部'||l.subject===config.subject) && (config.lesson==='全部'||q.lessonId===config.lesson) && (config.school==='全部'||(config.school==='原創概念題'?(!p&&!q.referenceUrl):p?.school===config.school));
  });
}
function updateDrillAvailability() {
  const el = document.querySelector('#drillAvailability'); if (!el) return;
  lastDrill = readDrill();
  const pool = drillPool(lastDrill), unseen = pool.filter(q=>!data.seen[q.id]).length;
  const count = lastDrill.count==='全部'?pool.length:Math.min(Number(lastDrill.count),pool.length);
  el.textContent = pool.length ? `符合 ${pool.length} 題 · 未練習 ${unseen} 題 · 本回合 ${count} 題${unseen<count?'（包含已練過的題目）':''}` : '這個組合沒有題目，請調整學科、單元或學校。';
  document.querySelector('#drillForm button[type="submit"]').disabled = !pool.length;
}
function beginDrill() {
  if (document.querySelector('#drillForm')) lastDrill = readDrill();
  const pool = drillPool(lastDrill);
  if (!pool.length) return notify('這個篩選組合沒有題目，請調整選項。');
  const count = lastDrill.count==='全部'?pool.length:Number(lastDrill.count);
  startExam('drill-quiz',DRILL.select(pool,count,data.seen),lastDrill.subject,`${lastDrill.mode==='mock'?'模擬考':'刷題挑戰'} · ${lastDrill.subject}`,lastDrill.mode);
}
function catalogHtml() {
  const regular = PAPERS.filter(p=>p.kind!=='競賽');
  return `<section class="source-section" id="sources"><div class="section-header"><div><div class="eyebrow">PAST PAPERS & REFERENCES</div><h2>跨校考古題圖書館</h2><p>${new Set(regular.map(p=>p.school)).size} 所學校 · ${regular.length} 份已檢視試卷 · 另有慈濟 ${PAPERS.filter(p=>p.kind==='競賽').length} 年競賽原卷。核對日期：2026 年 10 月 26 日。</p></div></div><p>依學校、學年度與學科找原卷及答案。舊卷可能採不同版本或範圍，請先看每張卡片的提醒。</p><div class="catalog-filters"><label>學科<select id="paperSubject">${subjects.map(s=>`<option>${s}</option>`).join('')}</select></label><label>學校<select id="paperSchool"><option>全部</option>${[...new Set(PAPERS.map(p=>p.school))].map(s=>`<option>${esc(s)}</option>`).join('')}</select></label><label>學年度<select id="paperYear"><option>全部</option>${[...new Set(PAPERS.map(p=>p.year))].sort((a,b)=>b-a).map(y=>`<option>${y}</option>`).join('')}</select></label></div><p id="paperCount" role="status"></p><div id="paperResults"></div><details class="reference-details"><summary>課本版本與其他公開資料夾</summary><p>國語：南一六上第 1–6 課。自然：康軒六上「探索天氣的變化」「水溶液」。社會：南一六上「日治時期臺灣的發展與變遷」「邁向民主的社會」。115 學年度修訂以孩子課本為準。</p>${Object.entries(sources).map(([k,arr])=>`<p><strong>${esc(k)}</strong></p><div class="source-list">${arr.map(([label,url])=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`).join('')}</div>`).join('')}</details><p class="legal-line">原卷著作權歸原作者；本站提供外部連結，不重製整份試卷。站內「歷屆考點延伸」是依考點另編，題幹、選項與解析由本站撰寫，不是原題逐字收錄，也不代表校方授權或出題預測。資料夾標籤不能保證出版社與範圍。</p></section>`;
}
function paperCard(p) {
  const count=QUESTION_BANK.filter(q=>q.sourceId===p.id).length;
  return `<article class="paper-card"><div class="paper-tags"><span class="subject-tag">${p.subject} · ${p.year} 學年度</span><span class="paper-kind">${esc(p.kind)} · ${esc(p.grade)}</span></div><h3>${esc(p.school)}</h3><p>${esc(p.scope)}</p>${p.examDate?`<p class="fineprint">校方標示 ${p.year} 學年度，卷面考試日期為 ${esc(p.examDate)}；學年度與舉辦日期不同。</p>`:''}<div class="source-list"><a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${p.kind==='競賽'?'國語競賽原卷':'開啟原卷'} ↗</a>${p.answerUrl?`<a href="${esc(p.answerUrl)}" target="_blank" rel="noopener noreferrer">${p.kind==='競賽'?'校方各科解答':'原卷答案'} ↗</a>`:'<span class="fineprint">未取得填答後的解答</span>'}</div>${count?`<button class="paper-practice" data-paper-drill="${p.id}">練這份卷的延伸考點 · ${count} 題 →</button>`:'<p class="fineprint">外部閱讀，不計入站內刷題數。</p>'}</article>`;
}
function updateCatalog() {
  const el=document.querySelector('#paperResults'); if(!el)return;
  const subject=document.querySelector('#paperSubject').value, school=document.querySelector('#paperSchool').value, year=document.querySelector('#paperYear').value;
  const rows=PAPERS.filter(p=>(subject==='全部'||p.subject===subject)&&(school==='全部'||p.school===school)&&(year==='全部'||String(p.year)===year));
  const standard=rows.filter(p=>p.kind!=='競賽'), competitions=rows.filter(p=>p.kind==='競賽');
  document.querySelector('#paperCount').textContent=`找到 ${rows.length} 份：${standard.length} 份段考／主題參考，${competitions.length} 份競賽。`;
  el.innerHTML=rows.length?`${standard.length?`<div class="paper-grid">${standard.map(paperCard).join('')}</div>`:''}${competitions.length?`<div class="competition-note"><h3>進階競賽｜臺南慈濟小六菁英盃</h3><p>這裡找到的是慈濟高中提供給小六學生的競賽試題；目前尚未核實到慈濟國小六上校內段考公開卷。競賽不限定本次課本範圍，適合學有餘力再挑戰。</p><a href="https://www.tcsh.tn.edu.tw/Acad-111Camping.aspx" target="_blank" rel="noopener noreferrer">校方歷屆試題總目錄 ↗</a></div><div class="paper-grid">${competitions.map(paperCard).join('')}</div>`:''}`:'<p class="empty-state">沒有符合的試卷，請調整篩選。</p>';
}
function reviewHtml(s) {
  return `<section class="attempt-review"><h2>這回合的答案與解析</h2><p>先回想理由，再對照答案；也可以開啟來源連結核對學習內容。</p>${s.responses.map((r,i)=>`<article class="review-item ${r.correct?'is-correct':'is-wrong'}"><div class="question-meta">第 ${i+1} 題 · ${r.correct?'✓ 答對':'待複習'}</div><h3>${esc(r.q.q)}</h3><p>你的答案：${esc(r.q.options[r.selected])}</p><p><strong>正確答案：${esc(r.q.options[r.q.answer])}</strong></p><p>${esc(r.q.explain)}</p>${questionSourceHtml(r.q)}</article>`).join('')}</section>`;
}
document.addEventListener('submit',e=>{if(e.target.id==='drillForm'){e.preventDefault();beginDrill();}});
document.addEventListener('change',e=>{
  if(e.target.closest('#drillForm')) {
    const form=document.querySelector('#drillForm');
    if(e.target.name==='subject') form.elements.lesson.value='全部';
    if(e.target.name==='lesson'&&e.target.value!=='全部') form.elements.subject.value=LESSONS.find(l=>l.id===e.target.value).subject;
    updateDrillAvailability();
  }
  if(['paperSubject','paperSchool','paperYear'].includes(e.target.id))updateCatalog();
});
document.addEventListener('click',e=>{
  const btn=e.target.closest('[data-paper-drill]');
  if(btn) { const p=PAPERS.find(p=>p.id===btn.dataset.paperDrill);startExam(`paper:${p.id}`,DRILL.select(QUESTION_BANK.filter(q=>q.sourceId===p.id),20,data.seen),p.subject,`${p.school} · 考點延伸`); }
  const anchor=e.target.closest('a[href^="#"]');
  if(anchor && anchor.getAttribute('href')===location.hash && session?.examId){e.preventDefault();route();}
});
