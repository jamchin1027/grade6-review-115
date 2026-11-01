const NOTE_SUBJECTS=['國語','英文','數學','自然','社會','成語天地'];
const NOTE_COLORS={國語:'#267453',英文:'#62529a',數學:'#176b89',自然:'#288675',社會:'#a05d2d',成語天地:'#8b692c'};
const NOTE_TERMS={
  國語:['景物','擬人','證據','主旨','信任','尊重','時間線','事實','感受','原理','作用','安納亞','穆太','公平'],
  英文:['Where did you go last weekend?','What did he do yesterday?','He didn’t swim.','Did he swim?','He swam.','didn’t','did','went','go','過去式','原形','yesterday','last weekend'],
  數學:['最大公因數','最小公倍數','質數','合數','倒數','分子','分母','商不變','因數','倍數','間隔','總和','差不變','積不變','除數','被除數','驗算','四捨五入'],
  自然:['水蒸氣','小水滴','冰晶','天氣','氣候','長時間','溶解','溶液','公平實驗','指示劑','酸鹼','導電'],
  社會:['1895','1945','1987','行政院','立法院','法院','民主','權利','多數決','殖民統治','措施','影響'],
  成語天地:['填字','意思','字形','記憶線索']
};
const noteReviewKey='notebook';
function noteText(value,note){
  const terms=[note.title,...NOTE_TERMS[note.subject]].filter(Boolean).sort((a,b)=>b.length-a.length);
  const expression=new RegExp('('+terms.map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','g');
  return String(value).split(expression).map(part=>terms.includes(part)?`<mark class="note-mark">${esc(part)}</mark>`:esc(part)).join('');
}
function noteRecord(id){return data[noteReviewKey]?.[id]||null}
function localStudyDate(day){return [day.getFullYear(),String(day.getMonth()+1).padStart(2,'0'),String(day.getDate()).padStart(2,'0')].join('-')}
function noteDue(id){const r=noteRecord(id);return !r||!r.next||r.next<=localStudyDate(new Date())}
function noteSummary(){const read=STUDY_NOTES.filter(n=>noteRecord(n.id)),due=read.filter(n=>noteDue(n.id));return {read:read.length,due:due.length,total:STUDY_NOTES.length}}
function noteSubjectHtml(subject){const notes=STUDY_NOTES.filter(n=>n.subject===subject),read=notes.filter(n=>noteRecord(n.id)).length;return `<a href="#notes/${encodeURIComponent(subject)}" class="note-subject ${subject===activeNoteSubject?'active':''}" ${subject===activeNoteSubject?'aria-current="page"':''} style="--note-accent:${NOTE_COLORS[subject]}"><strong>${esc(subject)}</strong><span>${read} / ${notes.length} 已看</span></a>`}
let activeNoteSubject='國語';
function renderNotebook(target){
  const chosen=STUDY_NOTES.find(n=>n.id===target);
  const requestedSubject=NOTE_SUBJECTS.includes(target)?target:chosen?.subject;
  if(requestedSubject)activeNoteSubject=requestedSubject;
  const list=STUDY_NOTES.filter(n=>n.subject===activeNoteSubject);
  const note=chosen&&chosen.subject===activeNoteSubject?chosen:(list.find(n=>noteRecord(n.id)?.status==='again')||list.find(n=>noteRecord(n.id)&&noteDue(n.id))||list.find(n=>!noteRecord(n.id))||list[0]);
  const index=list.indexOf(note),record=noteRecord(note.id),summary=noteSummary();session=null;
  main.innerHTML=`<section class="notebook" style="--note-accent:${NOTE_COLORS[activeNoteSubject]}"><div class="note-head"><div><div class="detail-kicker">115 學年度 · 六上期中</div><h1>筆記中心</h1><p>國語、英文、數學、自然、社會與成語天地；沿著本次考試範圍讀重點、練回想、訂正失分處。</p></div><div class="note-overview"><strong>${summary.read} / ${summary.total}</strong><span>已看筆記</span><small>${summary.due} 篇待回想</small></div></div>
  <div class="note-method" aria-label="筆記閱讀順序"><span><b>①</b> 讀重點</span><span><b>②</b> 遮答案自己說</span><span><b>③</b> 做題後訂正</span></div>
  <div class="note-subjects" role="navigation" aria-label="筆記科目">${NOTE_SUBJECTS.map(noteSubjectHtml).join('')}</div>
  <div class="note-layout"><aside class="note-index"><h2>${esc(activeNoteSubject)}筆記</h2><div class="note-index-list">${list.map(n=>{const r=noteRecord(n.id);return `<a href="#notes/${n.id}" class="${n.id===note.id?'active':''}" ${n.id===note.id?'aria-current="page"':''}><span>${esc(n.title)}</span><small>${!r?'未讀':r.status==='again'?'要再練':noteDue(n.id)?'待回想':'已看'}</small></a>`}).join('')}</div><p>只在這台裝置儲存閱讀狀態；換裝置可用「進度備份與設定」。</p></aside>
  <article class="note-paper" aria-labelledby="note-title"><div class="note-paper-top"><span>${esc(note.scope)}</span><span>${index+1} / ${list.length}</span></div><h2 id="note-title">${esc(note.title)}</h2><div class="note-status">${!record?'新筆記':noteDue(note.id)?'今天適合再回想一次':record.status==='again'?'下次優先練':'已看過，過幾天再複習'}</div>
  <section class="note-section"><h3>考前要記住</h3>${note.core.map(([label,text])=>`<div class="note-core"><strong>${esc(label)}</strong><p>${noteText(text,note)}</p></div>`).join('')}</section>
  ${note.subject==='成語天地'?`<section class="note-section note-word-section"><h3>這 8 個成語</h3><dl class="note-idioms">${IDIOMS.slice((Number(note.id.split('-')[1])-1)*8,Number(note.id.split('-')[1])*8).map(w=>`<div><dt>${w.no}. ${esc(w.idiom)}</dt><dd>${esc(w.meaning)}<small>${esc(w.tip)}</small></dd></div>`).join('')}</dl></section>`:''}
  <section class="note-section note-example"><h3>看一道怎麼想</h3><strong>${esc(note.worked[0])}</strong><p>${noteText(note.worked[1],note)}</p></section>
  <section class="note-section note-trap"><h3>這裡容易失分</h3><p>${noteText(note.trap,note)}</p></section>
  <section class="note-section note-recall"><h3>先自己回答，再翻開</h3>${note.recall.map(([q,a],i)=>`<details><summary><b>${i+1}</b> ${esc(q)}</summary><p>${noteText(a,note)}</p></details>`).join('')}</section>
  <div class="note-actions"><button data-note-review="again" data-note-id="${note.id}">還要再練</button><button data-note-review="know" data-note-id="${note.id}">能自己說出來了</button><a class="button" href="${note.href}">${esc(note.linkLabel)} →</a></div>
  <div class="note-stepper"><a href="#notes/${list[Math.max(0,index-1)].id}" ${index===0?'aria-disabled="true" tabindex="-1"':''}>← 上一篇</a><a href="#notes/${list[Math.min(list.length-1,index+1)].id}" ${index===list.length-1?'aria-disabled="true" tabindex="-1"':''}>下一篇 →</a></div></article></div>
  <p class="note-source">筆記是依這次確認的範圍另寫的複習內容；國語、社會參考南一，自然與數學參考康軒，英文參考翰林 Here We Go 9，成語依家長提供的 1–64 成語講義。數學單元順序依<a href="${MATH_SOURCE}" target="_blank" rel="noopener noreferrer">康軒 115 學年數學特刊</a>核對。以老師公告、孩子手上的課本和講義為最終考試範圍。閱讀標記是自我評估，不代表測驗分數。</p></section>`;
  updateTop();window.scrollTo(0,0);
}
function markNote(id,status){
  if(!STUDY_NOTES.some(n=>n.id===id)||!['again','know'].includes(status))return;
  data[noteReviewKey]||={};const today=new Date(),next=new Date(today);next.setDate(next.getDate()+(status==='again'?1:3));
  data[noteReviewKey][id]={status,seen:localStudyDate(today),next:localStudyDate(next)};
  saveData();renderNotebook(id);
}
document.addEventListener('click',e=>{const button=e.target.closest('[data-note-review]');if(button)markNote(button.dataset.noteId,button.dataset.noteReview)});
