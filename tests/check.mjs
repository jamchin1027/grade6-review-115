import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const main = {innerHTML:''}, wrongCount={textContent:''};
const saved = new Map([['review-island-115-v1',JSON.stringify({done:{'chi-1':true},stats:{'chi-1':{seen:2,correct:1}},wrong:{},streak:2,totalAnswered:2,totalCorrect:1})]]);
const context = {console,Math,Date,JSON,Map,Set,setTimeout,clearTimeout,document:{querySelector:s=>s==='#main'?main:s==='#wrongCount'?wrongCount:null,addEventListener(){}},localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v)},location:{hash:''},history:{replaceState(){}},requestAnimationFrame:fn=>fn()};
context.window=context;context.addEventListener=()=>{};context.scrollTo=()=>{};
vm.createContext(context);
for(const file of ['data.js','bank.js','vocab-data.js','vocab.js','english-data.js','english.js','practice.js','quiz.js','app.js']) vm.runInContext(fs.readFileSync(new URL('../'+file,import.meta.url),'utf8'),context,{filename:file});
const run=code=>vm.runInContext(code,context);
const {QUESTION_BANK:bank,PAPERS:papers,LESSONS:lessons,DRILL:drill}=context;
assert.equal(bank.length,511);
assert.equal(bank.filter(q=>q.sourceId).length,160);
assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
assert.equal(new Set(bank.map(q=>q.q)).size,bank.length);
for(const q of bank){
  assert.equal(q.options.length,4,q.id);
  assert.equal(new Set(q.options).size,4,q.id);
  assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,q.id);
  assert.ok(q.explain.length>10,q.id);
  assert.ok(lessons.some(l=>l.id===q.lessonId),q.id);
  if(q.sourceId){assert.ok(papers.some(p=>p.id===q.sourceId),q.id);assert.ok(q.sourceRef,q.id);}
  for(let i=0;i<20;i++){const mixed=drill.options(q);assert.equal(mixed.options[mixed.answer],q.options[q.answer],q.id);assert.equal(new Set(mixed.options).size,4,q.id);}
}
const seen=Object.fromEntries(bank.slice(0,430).map(q=>[q.id,true]));
const picked=drill.select([...bank,bank[0]],90,seen);
assert.equal(picked.length,90);assert.equal(new Set(picked.map(q=>q.id)).size,90);
assert.ok(picked.slice(0,81).every(q=>!seen[q.id]));
assert.ok(picked.slice(81).every(q=>seen[q.id]));
assert.equal(drill.select(bank,1000,seen).length,511);
assert.equal(run('data.totalAnswered'),2,'old progress survives');
assert.equal(run('data.done["chi-1"]'),true);
assert.ok(run('data.seen && typeof data.seen==="object"'));
run("startExam('test',[QUESTION_BANK[0]],'國語','測試','mock');answer(session.items[0].answer)");
assert.ok(!main.innerHTML.includes('class="explain'),'mock hides explanation');
assert.ok(!main.innerHTML.includes('option correct'),'mock hides correct marker');
assert.ok(!main.innerHTML.includes('答對 1 題'),'mock hides score');
assert.ok(main.innerHTML.includes('答案已記錄'));
run('finishExam()');
assert.ok(main.innerHTML.includes('正確答案：'));
assert.ok(main.innerHTML.includes('這回合的答案與解析'));
assert.equal(run('Object.keys(data.seen).length'),1);
run("startExam('test',[QUESTION_BANK.find(q=>q.sourceId)],'國語','測試');answer((session.items[0].answer+1)%4)");
assert.ok(main.innerHTML.includes('class="explain'));
assert.ok(main.innerHTML.includes('對照原卷'));
assert.equal(run('Object.values(data.wrong).flat().length'),1);
run("beginNamedExam('wrong-quiz');answer(session.items[0].answer)");
assert.equal(run('Object.values(data.wrong).flat().length'),0,'wrong-answer remapping survives shuffled options');
run("beginLessonTest('chi-3')");assert.equal(run('session.items.length'),50);
run("beginNamedExam('chi-quiz')");assert.equal(run('session.items.length'),20);
run("beginNamedExam('paper:jg108-sci')");assert.ok(run("session.items.every(q=>q.lessonId==='sci-2')"));
run('beginDailyExam()');assert.equal(run('session.items.length'),5);
assert.equal(run("drillPool({subject:'自然',lesson:'sci-2',school:'全部'}).length"),33);
assert.equal(run("drillPool({subject:'國語',lesson:'sci-2',school:'全部'}).length"),0);
assert.ok(main.innerHTML.includes('第 1 題 / 5 題'));
const previousBadge=wrongCount.textContent;
run("startExam('test',[QUESTION_BANK[50]],'國語','測試','mock');answer((session.items[0].answer+1)%4)");
assert.equal(wrongCount.textContent,previousBadge,'mock wrong-count badge must not leak correctness');
assert.ok(!main.innerHTML.includes('option correct'));
run('finishExam()');
assert.equal(Number(wrongCount.textContent),run('Object.values(data.wrong).flat().length'));
const inventories=['爽塵垢鳳頁曝涉霾暈跡','栽茂藤蔓掀悉添免隙尚櫃稿顫暮肩絨咂瀉賴','舍皆緣蓬飧兼樽酒舊醅籬簡陋鎮濾潺笆寂陳','衫肌沸騰兀唯勺吶握抵置頒屬榮搞黝襯惹摟','載益副監噪避迅滅援燒液蝕觸承陌攝檔撈註','艇劃荒垠宇宙朽誌系訓械艙駕凌隕眺奪億征'];
assert.equal(context.VOCAB_WORDS.length,105);
assert.equal(context.VOCAB_QUESTIONS.length,210);
inventories.forEach((chars,i)=>{
  const words=context.VOCAB_WORDS.filter(w=>w.lessonId===`chi-${i+1}`);
  assert.equal(words.map(w=>w.char).join(''),chars,'verified lesson membership');
  run(`renderVocab('chi-${i+1}')`);
  assert.equal((main.innerHTML.match(/class="vocab-card"/g)||[]).length,chars.length);
});
for(const w of context.VOCAB_WORDS){
  const qs=context.VOCAB_QUESTIONS.filter(q=>q.vocabId===w.id);
  assert.equal(qs.length,2);
  assert.equal(qs[0].options[qs[0].answer],w.reading);
  assert.equal(qs[1].options[qs[1].answer],w.char);
  assert.ok(!qs[1].q.includes(w.char),`character prompt must not reveal answer: ${w.word}`);
  assert.ok(qs.every(q=>q.referenceUrl===w.sourceUrl&&!q.sourceId));
}
for(const [skill,count] of [['生字注音',105],['生字國字',105],['閱讀與概念',181]]){
  assert.equal(run(`drillPool({subject:'全部',lesson:'全部',school:'全部',skill:'${skill}'}).length`),count);
}
assert.equal(run("drillPool({subject:'全部',lesson:'全部',school:'原創概念題'}).length"),21);
run("launchVocabExam('chi-1','sound','10')");
assert.equal(run('session.items.length'),10);
assert.ok(run("session.items.every(q=>q.lessonId==='chi-1'&&q.skill==='生字注音')"));
const xpBeforeVocab=run('data.xp');run('answer(session.items[0].answer)');assert.ok(main.innerHTML.includes('本課生字來源'));assert.ok(main.innerHTML.includes('training-hud'));assert.equal(run('data.xp')-xpBeforeVocab,10,'correct practice answer grants XP');assert.ok(main.innerHTML.includes('本回合 +10 XP'));
run("beginNamedExam('vocab:chi-1:sound:10')");assert.equal(run('session.items.length'),10);
run("launchVocabExam('all','char','全部')");
assert.equal(run('session.items.length'),105);
assert.ok(run("session.items.every(q=>q.skill==='生字國字')"));
run("vocabCover=true;renderVocab('chi-1')");
assert.equal((main.innerHTML.match(/待默寫的生字/g)||[]).length,10);
assert.ok(main.innerHTML.includes('<h3>涼□</h3>'));
assert.ok(main.innerHTML.includes('細小的□土。'));
// Back/forward restores the original shuffled options and first practice response.
run("startExam('nav',QUESTION_BANK.slice(0,3),'國語','導航')");
const beforePractice=run('data.totalAnswered');
run('answer(session.items[0].answer)');
const firstOptions=run('JSON.stringify(session.items[0].options)'),firstChoice=run('session.selected');
run('goQuestion(1);answer((session.items[1].answer+1)%4);goQuestion(0)');
assert.equal(run('session.selected'),firstChoice);
assert.equal(run('JSON.stringify(session.items[0].options)'),firstOptions);
run('answer((session.items[0].answer+1)%4)');
assert.equal(run('data.totalAnswered'),beforePractice+2,'practice revisit cannot score again');
assert.equal(run('session.correct'),1);
run('goQuestion(-1)');assert.equal(run('session.index'),0);
run('goQuestion(999)');assert.equal(run('session.index'),0);
run('finishExam()');assert.equal(run('session.index'),2,'incomplete submission goes to missing question');
assert.equal(run('session.finished'),false);
assert.ok(main.innerHTML.includes('還有題目沒作答'));
run('answer(session.items[2].answer);finishExam();finishExam()');
assert.equal(run('data.totalAnswered'),beforePractice+3,'repeated finish is idempotent');
// Mock edits stay private and are committed only once, using the final selections.
run("startExam('mock-nav',ENGLISH_QUESTIONS.slice(0,3),'英文','期中','mock')");
const beforeMock=run('JSON.stringify(data)'),mockBadge=wrongCount.textContent;
run('answer((session.items[0].answer+1)%4);goQuestion(2);answer(session.items[2].answer);goQuestion(0);answer(session.items[0].answer)');
assert.equal(run('JSON.stringify(data)'),beforeMock,'unsubmitted mock does not alter stats or mistakes');
assert.equal(wrongCount.textContent,mockBadge);
assert.ok(!main.innerHTML.includes('class="explain'));
assert.ok(!main.innerHTML.includes('option correct'));
assert.ok(!main.innerHTML.includes('本課生字來源'));
assert.ok(main.innerHTML.includes('可修改'));
run('finishExam()');assert.equal(run('session.index'),1);
run('answer(session.items[1].answer);finishExam()');
assert.equal(run('session.correct'),3);
assert.equal(run('data.totalAnswered'),JSON.parse(beforeMock).totalAnswered+3);
assert.equal(run('data.totalCorrect'),JSON.parse(beforeMock).totalCorrect+3);assert.equal(run('data.xp')-JSON.parse(beforeMock).xp,35,'mock XP and three-answer combo bonus settle only on submission');
run('finishExam()');assert.equal(run('data.totalAnswered'),JSON.parse(beforeMock).totalAnswered+3);
assert.ok(main.innerHTML.includes('換你試試'));
// English has per-option feedback, not letter-index feedback that breaks on shuffle.
assert.equal(context.ENGLISH_QUESTIONS.length,120);
assert.equal(context.ENGLISH_WORDS.length,18);
for(const q of context.ENGLISH_QUESTIONS){
  for(const o of q.options)assert.ok(q.optionFeedback[o]?.length>12,q.id+' '+o);
  assert.ok(q.clue&&q.rule&&q.tryIt&&q.curriculumUrl);
  const mixed=drill.options(q);for(const o of mixed.options)assert.equal(mixed.optionFeedback[o],q.optionFeedback[o]);
}
assert.equal(run("englishQuizPool('eng-1','全部').length"),62);
assert.equal(run("englishQuizPool('eng-2','全部').length"),58);
assert.equal(run("englishQuizPool('all','英文發音').length"),8);
run("launchEnglishExam('all','英文發音','全部','practice')");assert.equal(run('session.items.length'),8);
run("beginNamedExam('english:eng-2:英文單字:10:mock')");assert.equal(run('session.items.length'),10);assert.equal(run('session.mode'),'mock');
assert.ok(run("session.items.every(q=>q.lessonId==='eng-2'&&q.skill==='英文單字')"));
run("startExam('feedback',[ENGLISH_QUESTIONS.find(q=>q.id==='english-swim-did')],'英文','錯因');answer(session.items[0].options.indexOf('swam'))");
assert.ok(main.innerHTML.includes('不能把兩處都改成過去式'));
run('renderMistakes()');assert.ok(main.innerHTML.includes('不能把兩處都改成過去式'),'mistake chest retains selected-option reasoning');
run("renderEnglish('eng-1')");assert.ok(main.innerHTML.includes('句子變身工坊'));assert.equal((main.innerHTML.match(/class="english-word"/g)||[]).length,10);
run("renderEnglish('eng-2')");assert.equal((main.innerHTML.match(/class="english-word"/g)||[]).length,8);
assert.equal(papers.length,9);assert.ok(papers.every(p=>p.kind!=='競賽'));
assert.ok(!run('catalogHtml()').includes('慈濟'));
assert.ok(!run('catalogHtml()').includes('進階競賽'));
console.log(`PASS: ${bank.length} unique questions; 105 vocabulary entries; 120 English questions with option-specific feedback; back/forward, skipping, stable shuffled options, practice no double scoring, editable mock final scoring, incomplete/idempotent submit, old progress, source filters and competition removal.`);
