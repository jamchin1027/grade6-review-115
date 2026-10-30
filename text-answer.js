// Keep the live input mounted while a Chinese IME is composing a character.
let textComposing=false;
function cleanTextAnswer(value){return String(value??'').normalize('NFC').replace(/\s/g,'')}
function validDraft(q,value){return q.type==='text'?typeof value==='string'&&Array.from(value).length===q.blankSize&&/^\p{Script=Han}+$/u.test(value):Number.isInteger(value)&&value>=0&&value<q.options.length}
function textAnswerHtml(q,value,reveal){
  return `<div class="text-answer"><p class="idiom-meaning-clue">💡 意思線索：${esc(IDIOMS.find(w=>w.id===q.idiomId).meaning)}</p><label for="writtenAnswer">依空格順序填入 ${q.blankSize} 個國字</label><input id="writtenAnswer" type="text" value="${esc(value??'')}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-describedby="writtenHelp" ${reveal?'disabled':''}><p id="writtenHelp">只填缺少的 ${q.blankSize} 字，不用寫整個成語。可用注音或平板鍵盤的中文手寫輸入。</p></div>`;
}
function confirmationMessage(s,q,r,pending){
  if(q.type==='text'){
    if(textComposing)return '正在輸入中文字，選好字後再確認。';
    if(!validDraft(q,s.selected))return `請依序輸入 ${q.blankSize} 個國字，再按確認。`;
    if(pending)return `已填「${s.selected}」，尚未確認。請檢查字形再按確認。`;
  }
  return pending?`已選 ${String.fromCharCode(65+s.selected)}，尚未確認。可以重新選擇，想好再按確認。`:r?'答案已記錄，可修改；修改後請再確認，交卷後一起對答案。':'先點選一個答案，想好再按確認。';
}
function confirmationHtml(s,q,r,pending){return `<div class="answer-confirm"><p role="status">${esc(confirmationMessage(s,q,r,pending))}</p><button class="button confirm-answer" data-action="confirm-answer" ${pending&&validDraft(q,s.selected)&&!textComposing?'':'disabled'}>${r?(pending?'確認修改':'已確認答案'):'確認答案'}</button></div>`}
function syncTextDraft(value){
  const s=session,q=s?.items?.[s.index];if(!q||q.type!=='text'||s.finished||(s.mode!=='mock'&&s.responses[s.index]))return;
  const normalized=cleanTextAnswer(value);s.drafts[s.index]=normalized||null;s.selected=s.drafts[s.index];
  const r=s.responses[s.index],pending=s.selected!==null&&(!r||r.selected!==s.selected);
  const box=document.querySelector('.answer-confirm');if(box)box.outerHTML=confirmationHtml(s,q,r,pending);
  // Update the collapsed map without rerendering the focused input.
  const done=s.responses.filter((r,i)=>r&&s.drafts[i]===r.selected).length;
  const summary=document.querySelector('.question-map summary');if(summary)summary.textContent=`🗺️ 題號地圖 · 已答 ${done} / ${s.items.length}（可跳題）`;
  const mapButton=document.querySelector(`[data-question-index="${s.index}"]`);
  if(mapButton){const confirmed=!!r&&r.selected===s.selected;mapButton.classList.toggle('is-answered',confirmed);mapButton.textContent=`${confirmed?'●':s.selected!==null?'◐':'○'} ${s.index+1}`;mapButton.setAttribute('aria-label',`第 ${s.index+1} 題，${confirmed?'已確認':s.selected!==null?'待確認':'未選'}`)}
  const bar=document.querySelector('.exam-progress');if(bar){bar.setAttribute('aria-valuenow',done);bar.querySelector('i').style.width=pct(done/s.items.length)+'%'}
}
document.addEventListener('compositionstart',e=>{if(e.target.id==='writtenAnswer'){textComposing=true;syncTextDraft(e.target.value)}});
document.addEventListener('compositionend',e=>{if(e.target.id==='writtenAnswer'){textComposing=false;syncTextDraft(e.target.value)}});
document.addEventListener('input',e=>{if(e.target.id==='writtenAnswer'&&!e.isComposing)syncTextDraft(e.target.value)});
