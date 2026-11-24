const AFTER_EXAM_STATIONS = [
  {
    id:'water-path', subject:'自然', icon:'💧', color:'#287e91', title:'水滴旅行團', subtitle:'蒸發和蒸散，不要搭錯車',
    hook:'海面曬太陽，水變成水蒸氣叫「蒸發」；植物把水從葉子送出去叫「蒸散」。兩個都把水送進空氣，但出發地不同。',
    say:'海水出發叫蒸發，植物出發叫蒸散。看到圖先找水從哪裡來。',
    questions:[
      {q:'水循環圖上，海面有箭頭往上，樹葉也有箭頭往上。海面的箭頭代表什麼？',options:['蒸發，水從海面進入空氣','蒸散，水從植物葉子進入空氣','凝結，空氣中的水變成海水','降水，雲把水送回地面'],answer:0,why:['海面液態水變成水蒸氣，是蒸發。','蒸散的起點是植物，不是海面。','凝結是水蒸氣遇冷變成小水滴。','降水是雨、雪等從空中落下。']},
      {q:'樹葉把水分送進空氣；操場水窪被太陽曬乾。哪個配對正確？',options:['樹葉蒸散；水窪蒸發','樹葉蒸發；水窪蒸散','兩者都是凝結','兩者都是降水'],answer:0,why:['植物送水到空氣是蒸散；水窪變水蒸氣是蒸發。','水窪不是植物，不能叫蒸散。','凝結是氣體變液體，這兩個情況都不是。','水沒有從雲落下來，所以不是降水。']},
      {q:'圖上 A 標在海面上升的水氣，B 標在植物上升的水氣。要怎麼記 A、B？',options:['A 蒸發、B 蒸散','A 蒸散、B 蒸發','A 凝結、B 蒸散','A 降水、B 蒸發'],answer:0,why:['看出發地：海面蒸發，植物蒸散。','把兩個出發地對調了。','海面上升與植物送水都不是凝結。','向上進入空氣不是降水。']}
    ]
  },
  {
    id:'evidence-lab', subject:'自然', icon:'⚖️', color:'#287e91', title:'證據偵探所', subtitle:'「還在」和「性質沒變」是兩件事',
    hook:'天平像「點名簿」：重量沒少，支持鹽還在；但天平不會告訴你鹽還鹹不鹹。題目問什麼，就找能回答那一題的證據。',
    say:'重量證明「沒不見」；特徵證明「性質還在」。證據要對準問題。',
    questions:[
      {q:'食鹽溶進水後，整杯重量和溶解前的材料總重量相同。這最能支持什麼？',options:['食鹽沒有憑空消失，仍在溶液裡','食鹽水一定嚐起來很鹹','食鹽的形狀完全沒變','食鹽水一定是鹼性'],answer:0,why:['重量相同支持物質仍在，沒有因溶解而消失。','重量不能直接證明味道。','食鹽溶解後看不見原來的晶體形狀。','重量和酸鹼性是不同問題。']},
      {q:'題目問「混合後還看得出食鹽原來的性質嗎？」哪個觀察最直接？',options:['安全的食鹽水樣本仍呈鹹味','溶解前後總重量一樣','杯子是透明玻璃做的','水面比杯口低'],answer:0,why:['鹹味是食鹽可辨認的性質，直接對應題目。','重量可支持食鹽仍存在，但不能單獨證明鹹味。','杯子的材質與食鹽性質無關。','液面高度不能判斷食鹽性質。']},
      {q:'把一杯糖水蒸發，最後看到糖的結晶。這個結果最能說明什麼？',options:['糖溶解後仍留在溶液中','糖水原本一定有甜味','水變成了糖','糖在溶液中保有原來形狀'],answer:0,why:['蒸發水後找回糖，證明糖仍在溶液中。','結晶結果能證明糖存在，不能直接測味道。','水蒸發離開，不會變成糖。','糖先前溶解時看不見原來晶體形狀。']}
    ]
  },
  {
    id:'color-code', subject:'自然', icon:'🎨', color:'#347d68', title:'變色密碼室', subtitle:'先判酸鹼，再查「這一種」指示劑',
    hook:'石蕊、紫色高麗菜汁、蝶豆花是不同密碼本，顏色不能互相套用。先從紅藍石蕊表格判斷酸鹼，再看題目提供的蝶豆花顏色表。',
    say:'先讀試紙，再找指示劑自己的顏色表。不要只背「酸紅鹼藍」。',
    questions:[
      {q:'甲液讓紅色石蕊變藍，藍色石蕊不變。甲液最可能是哪種？',options:['鹼性','酸性','中性','一定是純水'],answer:0,why:['紅色石蕊遇鹼變藍；藍色石蕊保持藍，符合鹼性。','酸性會使藍色石蕊變紅。','中性通常不會使紅色石蕊變藍。','試紙結果不能證明液體一定是純水。']},
      {q:'蝶豆花顏色表寫著：酸性變紫、中性偏藍、鹼性變綠。已確認甲液是鹼性，甲加蝶豆花會怎麼樣？',options:['變綠','變紫','偏藍','一定無色'],answer:0,why:['依題目給的蝶豆花表，鹼性對應綠色。','紫色在這張表中代表酸性。','偏藍代表中性，不是鹼性。','表格沒有說鹼性會變無色。']},
      {q:'題目同時給石蕊和蝶豆花的顏色表，最可靠的解題順序是什麼？',options:['先用石蕊判酸鹼，再查蝶豆花表','把石蕊顏色直接當成蝶豆花顏色','只看液體原本的顏色就猜','不看表格，所有指示劑都背同一種顏色'],answer:0,why:['先由試紙判斷酸鹼，再使用另一種指示劑自己的規則。','不同指示劑不是同一本顏色密碼。','原液顏色不一定代表酸鹼。','指示劑的變色規則可能不同，題目資料要用起來。']}
    ]
  },
  {
    id:'government-route', subject:'社會', icon:'🏛️', color:'#b86232', title:'法令接力賽', subtitle:'立法院 → 總統 → 行政院 → 地方政府',
    hook:'把法令想成接力棒：立法院通過法律，總統公布，行政院訂執行細節，地方政府在地方落實。記口訣：「立、總、行、地」。',
    say:'立法不是執行；公布不是訂細節。每一棒都有不同工作。',
    questions:[
      {q:'依考卷的法令流程，哪個順序最合理？',options:['立法院通過 → 總統公布 → 行政院訂細則 → 地方政府執行','行政院執行 → 地方政府通過法律 → 立法院公布','總統訂地方細則 → 立法院執行 → 行政院公布','地方政府通過法律 → 行政院公布 → 總統執行'],answer:0,why:['依序是立法、公布、訂細則、地方落實。','地方政府不負責通過中央法律；公布也不是立法院的下一棒。','把總統、行政院、立法院的工作混在一起了。','地方政府不會先通過中央法律，公布也不是行政院工作。']},
      {q:'法律通過後，需要整理具體的行政執行細節，主要是哪個機關接棒？',options:['行政院','立法院','總統府','縣市政府'],answer:0,why:['行政院負責行政政策與執行安排。','立法院負責制定、修正法律及審議預算。','總統公布法律，不負責訂行政執行細節。','縣市政府負責地方落實，不是中央行政細則的制定者。']},
      {q:'下列哪一組全部屬於中央政府機關？',options:['行政院、總統府、立法院','行政院、臺南市政府、立法院','縣市政府、總統府、區公所','學校、縣市政府、行政院'],answer:0,why:['行政院、總統府、立法院都屬中央層級。','臺南市政府是地方政府。','縣市政府和區公所屬地方層級。','學校不是中央政府機關，縣市政府也是地方層級。']}
    ]
  },
  {
    id:'work-and-equality', subject:'社會', icon:'🧭', color:'#a44e56', title:'職業平等觀察站', subtitle:'看制度與證據，不替所有人下結論',
    hook:'把職業名稱改得不分男女，是提醒大家：照顧工作不只屬於女性，任何適合的人都能學習與投入。讀資料時也要小心「全部、一定」這種超出證據的字。',
    say:'公平是打開選擇，不是替每個人做同一個決定。結論不能比資料更大。',
    questions:[
      {q:'「保母人員」改稱「托育人員」，最能表達哪個想法？',options:['照顧工作不應被認為只適合某一種性別','只有男性可以照顧幼兒','女性不能從事托育工作','職業名稱改了，工作內容就完全消失'],answer:0,why:['名稱不把工作綁定某種性別，能減少職業刻板印象。','改名不是把工作限定給男性。','改名不是禁止女性投入。','名稱改變不代表托育工作消失。']},
      {q:'資料只說「有些家長支持孩子自由選職業」。哪個結論最符合證據？',options:['有些家長支持；不能直接說全部家長都支持','全部家長一定支持','沒有家長支持','資料證明每個孩子都選同一種職業'],answer:0,why:['結論的範圍要和資料相同；「有些」不能擴大成「全部」。','資料沒有說全部。','有些支持不等於沒有人支持。','資料談家長態度，沒有證明孩子的選擇結果。']},
      {q:'家庭統計表顯示，單人與夫妻家庭比例上升，三代同堂比例下降。哪個說法有資料支持？',options:['家庭型態正在變多元，不能說三代同堂已經消失','每個家庭都變成單人家庭','所有人都不再和長輩同住','家庭比例變化代表出生率一定上升'],answer:0,why:['比例變化顯示型態改變，但下降不代表消失。','單人家庭上升不代表所有家庭都是單人。','資料沒有說所有人都不與長輩同住。','家庭型態比例不能單獨證明出生率上升。']}
    ]
  },
  {
    id:'evidence-check', subject:'考場技能', icon:'🔎', color:'#687946', title:'三步驗證司令部', subtitle:'檢查有證據，才算真的檢查',
    hook:'檢查三遍，不如每一遍都有任務。第一遍圈「不正確、最主要、全部」；第二遍回文章、圖表找證據；第三遍逐個核對選項，說出答案為什麼對、其他為什麼不合。',
    say:'圈題目要什麼 → 找證據在哪裡 → 驗每個選項。',
    questions:[
      {q:'如果考前預估分數比實得高，下一次哪種檢查最能幫忙？',options:['每題找出關鍵線索，再用線索核對答案和選項','只要再把整張考卷快速讀三遍','預估高就不必檢查','把不確定的題目全部改成第一個選項'],answer:0,why:['有步驟的檢查能找出哪類線索漏看，並確認選項是否符合。','重讀但不帶任務，可能再次跳過同一個陷阱。','預估不是證據，仍要逐題核對。','第一個選項沒有特別正確的理由。']},
      {q:'題目問「哪一項不符合」，你已圈出「不」。接下來怎麼做？',options:['逐項找證據，挑出唯一不符合的選項','找到一項看起來正確的就停','忘記「不」，選最熟悉的答案','只看選項長短'],answer:0,why:['題目要找例外；逐項用證據核對，才能定位不符合者。','找到一項正確的還不能回答「哪項不符合」。','漏看否定詞會把題目方向答反。','選項長短不是判斷依據。']},
      {q:'你想把一題改答案，什麼時候才值得改？',options:['找到題幹或資料中的明確證據，能說明原答案哪裡不合','因為隔壁同學選別的答案','因為改答案感覺比較安心','看到選項有熟悉的詞就改'],answer:0,why:['改答案要有新的證據和理由，這才是檢查，不是猜測。','別人的答案不是題目證據。','安心感不能證明答案正確。','熟悉詞可能是干擾，還要核對完整意思。']}
    ]
  }
];

function afterExamProgress(station){
  data.afterExam ||= {};
  return data.afterExam[station.id] ||= {index:0,streak:0,cleared:false,answered:false};
}
function afterExamScore(){
  const states=AFTER_EXAM_STATIONS.map(afterExamProgress);
  return {cleared:states.filter(s=>s.cleared).length,total:states.length};
}
function renderAfterExam(){
  session=null;
  const score=afterExamScore();
  main.innerHTML=`<section class="after-exam-page"><header class="after-exam-hero"><div class="eyebrow">POST-TEST POWER-UP</div><h1>考後升級基地</h1><p>暖身 ${score.total} 關共 ${AFTER_EXAM_STATIONS.reduce((n,s)=>n+s.questions.length,0)} 題；獨立驗收 ${AFTER_PAPERS.length} 卷共 ${AFTER_PAPERS.reduce((n,p)=>n+paperItems(p).length,0)} 題。徽章記錄暖身進度，驗收另看首次成績。</p><div class="after-exam-score"><strong>${score.cleared}<small> / ${score.total}</small></strong><span>已點亮徽章</span><i><b style="width:${pct(score.cleared/score.total)}%"></b></i></div></header>
  ${paperMenu()}<section class="check-ritual" aria-label="考卷檢查三步驟"><div class="ritual-title"><span>🧠 考場超能力</span><strong>檢查不是重看，是找證據</strong></div><div class="ritual-steps"><article><b>1</b><strong>圈任務</strong><p>圈出「不正確、最主要、全部」等關鍵字。</p></article><article><b>2</b><strong>找線索</strong><p>回文章、圖表或實驗，找到能支持答案的那一格。</p></article><article><b>3</b><strong>逐項驗</strong><p>說出答案為何符合，並找出其他選項錯在哪裡。</p></article></div><p class="ritual-memory">口訣：<strong>圈題目 → 找證據 → 驗選項</strong>。檢查幾遍不是重點，每遍都做對一件事才有用。</p></section>
  <div class="after-exam-grid">${AFTER_EXAM_STATIONS.map((station,index)=>afterExamStationHtml(station,index)).join('')}</div><p class="after-exam-foot">每次作答都會自動儲存在這台裝置。答錯是線索，不會扣分；下次打開可以繼續闖關。</p></section>`;
}
function afterExamStationHtml(station,index){
  const p=afterExamProgress(station),q=station.questions[p.index%station.questions.length];
  const answered=p.answered;
  // Stored choices always use their original IDs. Only their display positions change.
  const offset=[[2,0,3],[1,3,0],[3,1,2],[0,2,1],[2,1,3],[1,0,2]][index][p.index%3];
  const order=q.options.map((_,k)=>(k+offset)%q.options.length);
  const title=`${String(index+1).padStart(2,'0')} / ${station.subject}`;
  return `<article class="power-station ${p.cleared?'is-cleared':''}" style="--station:${station.color}"><div class="station-top"><span class="station-icon" aria-hidden="true">${station.icon}</span><div><span class="station-kicker">${title}</span><h2>${station.title}</h2><p>${station.subtitle}</p></div><span class="station-medal" aria-label="${p.cleared?'已通關':`連對 ${p.streak} / 2`}">${p.cleared?'✦ 徽章':`${p.streak} / 2`}</span></div><details class="station-note"><summary>打開記憶口訣</summary><p>${station.hook}</p><strong>${station.say}</strong></details><div class="station-quiz"><div class="station-quiz-meta">第 ${(p.index%station.questions.length)+1} 個問法 · ${p.cleared?'自由複習':'連續答對兩題點亮徽章'}</div><h3>${q.q}</h3><div class="station-options">${order.map((i,k)=>{const option=q.options[i];const cls=answered?(i===q.answer?'is-answer':i===p.selected?'is-choice-wrong':''):p.draft===i?'is-picked':'';return `<button class="station-option ${cls}" aria-pressed="${(answered?p.selected:p.draft)===i}" data-after-pick="${station.id}" data-option="${i}" ${answered?'disabled':''}><span>${String.fromCharCode(65+k)}</span>${option}</button>`}).join('')}</div>${!answered?`<button class="button button-small" data-after-answer="${station.id}" ${Number.isInteger(p.draft)?'':'disabled'}>確認答案</button>`:''}${answered?`<div class="station-feedback ${p.lastCorrect?'is-correct':'is-retry'}" role="status"><strong>${p.lastCorrect?(p.cleared?'暖身答對了！可以試一份獨立驗收卷。':'✨ 找對線索了！再連對一題就點亮徽章。'):'🧩 看看這個選項卡在哪裡，再挑下一種問法。'}</strong><p>${q.why[p.selected]}</p>${!p.lastCorrect?`<p><b>記憶口訣：</b>${station.say}</p>`:''}</div><div class="station-actions"><button class="button button-small" data-after-next="${station.id}">${p.cleared?'再練下一題':'繼續下一個問法 →'}</button>${p.cleared?`<button class="station-reset" data-after-reset="${station.id}">重練這一關</button>`:''}</div>`:''}</div></article>`;
}
document.addEventListener('click',event=>{
  const pick=event.target.closest('[data-after-pick]');
  if(pick){const station=AFTER_EXAM_STATIONS.find(x=>x.id===pick.dataset.afterPick),p=afterExamProgress(station),i=Number(pick.dataset.option);if(!p.answered&&Number.isInteger(i)&&i>=0&&i<4){p.draft=i;saveData();renderAfterExam();main.querySelector?.(`[data-after-pick="${station.id}"][data-option="${i}"]`)?.focus({preventScroll:true})}return}
  const answer=event.target.closest('[data-after-answer]');
  if(answer){
    const station=AFTER_EXAM_STATIONS.find(x=>x.id===answer.dataset.afterAnswer),p=afterExamProgress(station),q=station.questions[p.index%station.questions.length],selected=p.draft;
    if(p.answered||!Number.isInteger(selected)||selected<0||selected>=q.options.length)return;
    delete p.draft;p.lastCorrect=selected===q.answer;p.selected=selected;p.answered=true;p.streak=p.lastCorrect?p.streak+1:0;p.cleared=p.cleared||p.streak>=2;saveData();renderAfterExam();return;
  }
  const next=event.target.closest('[data-after-next]');
  if(next){const station=AFTER_EXAM_STATIONS.find(x=>x.id===next.dataset.afterNext),p=afterExamProgress(station);if(!p.answered)return;p.index=(p.index+1)%station.questions.length;p.answered=false;p.selected=null;delete p.lastCorrect;saveData();renderAfterExam();return;}
  const reset=event.target.closest('[data-after-reset]');
  if(reset){const station=AFTER_EXAM_STATIONS.find(x=>x.id===reset.dataset.afterReset);data.afterExam[station.id]={index:0,streak:0,cleared:false,answered:false};saveData();renderAfterExam();}
});
