// Each pair of blocks is one fixed paper. Keep item order stable for saved attempts.
const AFTER_PAPERS = [
 {id:'council', title:'社會｜誰接下一棒？', groups:[
  {title:'四張工作單', text:'這是一項虛構的補助制度。請根據工作單，分清楚誰作決定、誰在地方辦理。', table:[['工作單','內容'],['甲','立法院三讀通過法律'],['乙','總統公布這部法律'],['丙','法律指定的中央主管機關訂定施行細則'],['丁','市政府依規定受理申請']], items:[
   ['市府說：「我們依丁單辦理，所以也能自行更改甲單的法律條文。」哪張工作單最能指出這句話混淆的分工？',['乙：公布法律','甲：通過法律','丙：訂施行細則','丁：受理申請'],1,'對照甲、丁：受理申請是執行，不能因此自行修改中央法律。公布和訂細則也不是修改法律條文。'],
   ['法律已通過、已公布。現在缺全國一致的申請細節，按材料應找誰？',['辦理收件的市政府','公布法律的總統','丙單上的主管機關','三讀法律的立法院'],2,'關鍵是「已公布」和「申請細節」。依這部虛構法律的授權找丙，不是從甲重新開始。'],
   ['若只收集中央層級的工作單，哪一份資料夾剛好齊全？',['甲、乙、丁','乙、丙、丁','甲、丁','甲、乙、丙'],3,'分層級不要看誰先做：丁是市政府。先排除丁，再檢查前三張都在。']]},
  {title:'社區服務台的留言', text:'市民服務台：一般市政問題轉交承辦單位。反詐騙諮詢：協助辨認可疑訊息。市府申請櫃台：核對本項補助的申請文件。',items:[
   ['小哲拍下雨停後仍積水的人行道，想請人修繕。哪份留言能送對地方，也方便承辦人查找？',['送市民服務台，附路口、日期及照片','送反詐騙諮詢，附路口及照片','送補助櫃台，附雨量及路口','送市民服務台，只問「怎麼還沒好？」'],0,'問題是市政修繕，路口和日期才能定位。照片齊全也不能彌補送錯單位。'],
   ['另一則訊息聲稱「先匯保證金才能領補助」。小哲現在只想辨別訊息真偽，哪個窗口最對題？',['市民服務台反映路面狀況','反詐騙諮詢核對可疑訊息','市府櫃台補交申請表','請立法院更改補助條文'],1,'圈出「辨別訊息真偽」。雖然訊息提到補助，眼前要處理的是可疑要求。'],
   ['在「公布規則、核對文件、通過法律」三件事中，哪件事有材料證明由地方櫃台負責？',['公布規則和通過法律','三件都負責','只核對申請文件','只通過法律'],2,'回到「市府申請櫃台」那一句：證據只到核對文件，不能把運用規則當成制定規則。']]}]},
 {id:'lab', title:'自然｜實驗紀錄會說什麼？', groups:[
  {title:'兩本顏色密碼簿', text:'同一批蝶豆花指示液的校正紀錄：酸性呈紫、中性呈藍、鹼性呈綠。兩張石蕊試紙都用新的，分別測試。',table:[['樣本','紅色試紙測完','藍色試紙測完'],['甲','紅','紅'],['乙','藍','藍'],['丙','紅','藍']],items:[
   ['乙加這批蝶豆花指示液，預測哪一色？',['藍，因為兩張試紙最後都藍','紫，因為原來有紅色試紙','綠，因為紅紙轉藍表示鹼性','紅，因為乙是酸性'],2,'先比「紅紙 → 藍」判乙為鹼，再查蝶豆花的鹼性格是綠。兩本色表不能抄同一個顏色。'],
   ['同學只看到甲的紅紙沒變，就說它中性。還需看哪一格，才能推翻他的判斷？',['甲的藍紙測完是紅色','乙的紅紙測完是藍色','丙的藍紙仍是藍色','甲原先的紅紙是紅色'],0,'同一列的藍紙轉紅才驗出甲為酸性；另一個樣本的結果不能拿來判甲。'],
   ['把甲與乙混合後，兩張新試紙的結果仍跟甲列相同。哪個說法最符合測量？',['混合液一定中性','混合液由酸變鹼','甲與乙從未混合','混合液仍呈酸性'],3,'看混合後的結果：藍紙轉紅。酸、鹼混合不能只憑「兩種都加了」就說恰好中性。']]},
  {title:'哪一筆實驗能當證人？',text:'在不灑出也不蒸發的條件下，把鹽放入水中。另用相同電池、接線、燈泡及電極，在相同間距測試兩種液體。',table:[['紀錄','觀察'],['①','杯、水、鹽混合前後總質量相等'],['②','取少量鹽水蒸乾，留下白色晶體'],['③','鹽水使燈亮；蒸餾水未使燈亮']],items:[
   ['只用①，能支持哪句話？',['鹽的味道沒有改變','秤量的物質總質量沒減少','鹽水能讓燈亮','每顆鹽仍保有原形'],1,'天平測的是總質量，不能測味道、導電性或看不見的晶形。先問：儀器實際量到什麼？'],
   ['想用實物回應「鹽一碰水就不見了」，該指哪筆結果？',['①，因為天平能辨認鹽粒','③，因為所有白色物質都導電','②，水離開後仍留下晶體','①，因為質量能顯示顏色'],2,'②把溶解後的物質重新分離出來。①只給總量，不能辨認是哪種物質。'],
   ['重做③時，鹽水的燈沒亮，連原本會亮的測試液也沒亮。最先檢查什麼？',['先斷定兩杯都不導電','把鹽水改成兩倍濃再宣布結果','用燈泡代替原本的電池','先檢查電池、接線和燈泡是否正常'],3,'連已知會亮的對照也失敗，要先排除電路問題。單看暗燈不能直接判液體。']]}]},
 {id:'weather', title:'自然｜追蹤一滴水', groups:[
  {title:'海岸觀測站',text:'晴天，海面與葉面沒有雨滴。甲：海面液態水變成水蒸氣。乙：根吸收的水經葉片釋入空氣。丙：潮溼空氣接觸冷表面，出現小水珠。',items:[
   ['若把植物移走，哪一條路徑會因為缺少植物而中斷？',['甲，因為海面水要先被根吸收','乙，因為水是從植物體內送出','丙，因為冷表面一定要是葉子','甲和丙，因為都需要根'],1,'沿出發點找：只有乙必須經過根與葉，這叫蒸散。海面蒸發、冷面凝結不必經過植物。'],
   ['用透明杯裝溫水，杯口蓋冷金屬片。金屬片下表面出現水珠，對應哪段？',['甲，因為杯底有水','乙，因為水往上走','丙，因為水蒸氣遇冷成液滴','甲，因為金屬片是冷的'],2,'問的是水珠形成的位置與變化。下表面的水蒸氣變液體是凝結；先前杯裡的水蒸發是另一段。'],
   ['有人說「金屬片下一定是冰晶」。紀錄裡哪個細節能直接反駁？',['觀察到小滴合併並流下','下方裝了水','金屬片摸起來冷','杯口被蓋住'],0,'「合併並流下」是液態水滴的線索。摸起來冷不能單獨證明已結冰。']]},
  {title:'小記者的兩頁筆記',text:'第一頁：同一測站記到颱風接近，上午風強；中午颱風眼經過，風變弱；下午又轉強。第二頁：空氣中的二氧化碳能溶入雨滴，使一般雨水略帶酸性；其他污染物也可能讓雨水酸性增強。',items:[
   ['中午風變弱時，哪句播報最忠於這次紀錄？',['颱風警報已可解除','以後每次中午都平靜','所有測站同時進入颱風眼','測站短暫風弱，稍後仍可能有強風'],3,'同一站下午風又轉強；中午是眼區經過，不能把短暫平靜當作整個颱風結束。'],
   ['題目問「沒有額外污染時，雨水也可能略酸的原因」。應從第二頁摘哪個線索？',['污染物可能讓雨水更酸','二氧化碳能溶進雨滴','中午風變弱','雨滴下落的速度'],1,'圈「沒有額外污染」：要找一般雨水的原因，而非污染使酸性增強的原因。'],
   ['只靠這兩頁，哪一項還缺證據？',['這個測站下午風又強了','一般雨水可能略酸','哪個月份颱風侵臺次數最多','污染物可能增加雨水酸性'],2,'一次過境只有一日的變化；比較月份要有跨年逐月統計。要分清文章回答了什麼、沒回答什麼。']]}]},
 {id:'families', title:'社會｜數字能替誰說話？',groups:[
  {title:'職涯訪問：同一班的 20 份回條',text:'每戶只能選一項。回條不記性別，也沒問孩子最後選了哪個職業。',table:[['照顧者的回覆','戶數'],['支持孩子先探索','12'],['希望孩子承接家業','5'],['尚未決定','3']],items:[
   ['哪個標題跟資料的範圍大小剛好相同？',['本班回覆中，過半支持先探索','全市過半家庭支持探索','本班過半學生已決定職業','所有回覆都支持先探索'],0,'12 大於 20 的一半；受訪的是本班照顧者，只問態度，沒問全市或孩子的決定。'],
   ['哪一句雖然含有「全部」，卻有資料支持？',['全部家長都要孩子繼承家業','全部家庭的決定都沒有變過','全部孩子都同意家長的想法','這 20 份回條全部都歸在表內三類'],3,'12＋5＋3＝20，且每戶只選一次。「全部」要核對範圍，不能看到這兩個字就判錯。'],
   ['要研究「同一批家庭的期待有沒有改變」，還缺哪份資料？',['今年三類各用什麼顏色標示','同一批家庭較早時對同一問題的回答','今年學生最喜歡哪門課','其他班今年有幾人交回條'],1,'要看變化，就要有可比較的前後兩次。換班或換問題都不能直接比較這批家庭。']]},
  {title:'社區托育站的新海報',text:'舊海報寫「徵保母」，新海報改寫「徵托育人員」。工作仍是照顧幼兒；所有申請人都依同樣的訓練及照顧能力接受評估。本週有兩人應徵，尚未公布錄取結果。',items:[
   ['哪個改寫理由同時符合新名稱和甄選條件？',['照顧內容已改成另一種工作','要讓每種性別錄取人數相同','讓符合能力的人不受性別稱呼限制','有意應徵就不必受訓'],2,'名稱放寬對性別的想像；能力條件仍在。公平的條件不等於錄取人數必須相等。'],
   ['同學說「兩名應徵者都已錄取」。哪個詞是查證的關鍵？',['「社區」說明是地方機構','「尚未公布」表示結果仍未知','「同樣」表示兩人都通過','「新」表示原來規則全取消'],1,'同樣的是評估標準，不是評估結果。從「應徵」跳到「錄取」多推了一步。'],
   ['另一個社區想仿效海報，哪個做法保留了同樣的原則？',['先依性別分配照顧任務','符合一項條件就保證錄取','只更改稱呼，仍限定一種性別報名','招募不限定性別，以相同照顧能力標準評估'],3,'把文字落實成規則：報名不被性別擋住，工作能力仍要檢核。只改招牌、不改排除規則，沒有做到同一原則。']]}]}
];

function paperItems(p){return p.groups.flatMap(g=>g.items)}
function paperState(p){data.afterPapers ||= {};return data.afterPapers[p.id] ||= {choices:{},submitted:false,first:null}}
function paperScore(p,s){return paperItems(p).filter((q,i)=>s.choices[i]===q[2]).length}
function paperMenu(){return `<section class="check-ritual"><h2>獨立驗收卷</h2><div class="paper-menu">${AFTER_PAPERS.map(p=>{
  const s=paperState(p),n=paperItems(p).length;
  return `<a href="#after-exam/${p.id}"><strong>${esc(p.title)}</strong><small>${s.first!=null?`首次 ${s.first} / ${n} 題答對`:Object.keys(s.choices).length?`繼續作答 · 已選 ${Object.keys(s.choices).length} / ${n} 題`:`${n} 題 · 尚未作答`} →</small></a>`;
}).join('')}</div></section>`}
function renderAfterPaper(id){
  const p=AFTER_PAPERS.find(x=>x.id===id);if(!p)return renderAfterExam();session=null;
  const s=paperState(p),n=paperItems(p).length;let i=0;
  main.innerHTML=`<section class="after-exam-page exam-paper"><a href="#after-exam">← 回考後升級基地</a><h1>${esc(p.title)}</h1><p>${s.submitted?`首次 ${s.first} / ${n} 題答對；本次 ${paperScore(p,s)} / ${n} 題答對。先找答錯的那一題，指給自己看：材料裡哪一句能改變我的答案？`:'先讀材料再作答。交卷前可以改選，整卷交出才揭曉答案。'}</p>${p.groups.map(g=>`<section class="paper-group"><h2>${esc(g.title)}</h2><p>${esc(g.text)}</p>${g.table?`<table aria-label="${esc(g.title)}"><thead><tr>${g.table[0].map(c=>`<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${g.table.slice(1).map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`:''}${g.items.map(([stem,opts,key,why])=>{
    const j=i++,v=s.choices[j];return `<fieldset><legend>${j+1}. ${esc(stem)}</legend>${opts.map((opt,k)=>`<label><input type="radio" name="paper-${j}" data-paper-pick="${p.id}" data-item="${j}" value="${k}" ${v===k?'checked':''} ${s.submitted?'disabled':''}> ${esc(opt)}</label>`).join('')}${s.submitted?`<p class="station-feedback ${v===key?'is-correct':'is-retry'}"><strong>${v===key?'答對了':'再找一次線索'} · 正解：${esc(opts[key])}</strong><br>${esc(why)}</p>`:''}</fieldset>`}).join('')}</section>`).join('')}<p id="paper-count" aria-live="polite">已選 ${Object.keys(s.choices).length} / ${n} 題</p><button class="button" data-paper-action="${p.id}">${s.submitted?'重做同一卷（保留首次成績）':'確認交卷，看解析'}</button>　<a href="#after-exam">回基地</a></section>`;
}
document.addEventListener('change',e=>{
  const el=e.target,p=AFTER_PAPERS.find(x=>x.id===el.dataset?.paperPick);if(!p)return;
  const s=paperState(p),i=Number(el.dataset.item),k=Number(el.value),items=paperItems(p);
  if(s.submitted||!items[i]||!Number.isInteger(k)||k<0||k>=items[i][1].length)return;
  s.choices[i]=k;saveData();document.querySelector('#paper-count').textContent=`已選 ${Object.keys(s.choices).length} / ${items.length} 題`;
});
document.addEventListener('click',e=>{
  const el=e.target.closest('[data-paper-action]');if(!el)return;
  const p=AFTER_PAPERS.find(x=>x.id===el.dataset.paperAction);if(!p)return;const s=paperState(p);
  if(s.submitted){s.submitted=false;s.choices={}}else{
    const missing=paperItems(p).findIndex((q,i)=>!Number.isInteger(s.choices[i]));
    if(missing!==-1){notify(`第 ${missing+1} 題還沒選。`);document.querySelector(`[name="paper-${missing}"]`)?.focus();return}
    s.first ??= paperScore(p,s);s.submitted=true;
  }
  saveData();renderAfterPaper(p.id);window.scrollTo(0,0);
});
