// Scope confirmed by the user's Here We Go 9 titles and public school curriculum plans.
// All situations, questions and feedback below are authored for this review site.
window.ENGLISH_SOURCE='https://tten.tp.edu.tw/Login/Downment?grade=99&spid=7079e0b0-2865-44f9-8173-9533291684ec&subject=English';
window.ENGLISH_WORDS=[
  ['department-store','eng-1','🏬','department store','百貨公司','','','',''],
  ['night-market','eng-1','🏮','night market','夜市','','','',''],
  ['amusement-park','eng-1','🎡','amusement park','遊樂園','','','',''],
  ['riverside-park','eng-1','🌳','riverside park','河濱公園','','','',''],
  ['eat','eng-1','🍪','ate snacks','吃點心','eat','ate','snacks','eated'],
  ['drink','eng-1','🧃','drank juice','喝果汁','drink','drank','juice','drinked'],
  ['fly','eng-1','🪁','flew a kite','放風箏','fly','flew','a kite','flied'],
  ['ride','eng-1','🚲','rode a bike','騎腳踏車','ride','rode','a bike','rided'],
  ['see','eng-1','🎬','saw a movie','看電影','see','saw','a movie','seed'],
  ['go','eng-1','🛍️','went shopping','去購物','go','went','shopping','goed'],
  ['draw','eng-2','🎨','drew a picture','畫圖','draw','drew','a picture','drawed'],
  ['have','eng-2','🧺','had a picnic','野餐','have','had','a picnic','haved'],
  ['run','eng-2','🏃','ran','跑步','run','ran','','runned'],
  ['sing','eng-2','🎤','sang songs','唱歌','sing','sang','songs','singed'],
  ['swim','eng-2','🏊','swam','游泳','swim','swam','','swimmed'],
  ['take','eng-2','🚶','took a walk','散步','take','took','a walk','taked'],
  ['write','eng-2','✉️','wrote a letter','寫信','write','wrote','a letter','writed'],
  ['get','eng-2','💇','got a haircut','剪頭髮','get','got','a haircut','getted']
].map(([id,lessonId,emoji,en,zh,base,past,tail,trap])=>({id,lessonId,emoji,en,zh,base,past,tail,trap}));
window.ENGLISH_QUESTIONS=[];
(() => {
  const add=(lessonId,id,skill,q,options,why,clue,rule,tryIt)=>{
    ENGLISH_QUESTIONS.push({id:`english-${id}`,lessonId,skill,q,options,answer:0,explain:why[0],
      optionFeedback:Object.fromEntries(options.map((o,i)=>[o,why[i]])),clue,rule,tryIt,
      origin:'期中範圍延伸・本站另編',curriculumUrl:ENGLISH_SOURCE});
  };
  for(const w of ENGLISH_WORDS){
    const others=ENGLISH_WORDS.filter(x=>x.lessonId===w.lessonId&&x.id!==w.id);
    const pool=[w,...others.slice(0,3)];
    add(w.lessonId,w.id+'-meaning','英文單字',`小島詞語卡：${w.en} 是什麼意思？`,pool.map(x=>x.zh),
      pool.map(x=>x.id===w.id?`${w.en} 表示「${w.zh}」。${w.base?`動詞 ${w.base} 的過去式是 ${w.past}。`:'這是一個地點名稱。'}`:`「${x.zh}」應配 ${x.en}，不是 ${w.en}。先分清詞義，再看動詞。`),
      w.en,`把 ${w.en} 與「${w.zh}」連成一張心像。`,`遮住英文，看到「${w.zh}」時自己說一次。`);
    add(w.lessonId,w.id+'-recall','英文單字',`旅行日記要寫「${w.zh}」${w.base?'（已發生的活動）':''}，選哪個英文？`,pool.map(x=>x.en),
      pool.map(x=>x.id===w.id?`「${w.zh}」對應 ${w.en}。${w.base?`${w.base} → ${w.past}，不要直接加 ed。`:'地點詞要連在一起記。'}`:`${x.en} 是「${x.zh}」，與題目的「${w.zh}」不同。`),
      `題目指定「${w.zh}」`,w.base?`活動已經發生，這裡用 ${w.past}。`:'地點與動作分開記，問 where 時要回應地點。',`自己畫一個「${w.zh}」小圖，再寫 ${w.en}。`);
    if(!w.base)continue;
    const tail=w.tail?' '+w.tail:'';
    const ing=({ride:'riding',have:'having',run:'running',swim:'swimming',take:'taking',write:'writing',get:'getting'})[w.base]||w.base+'ing';
    add(w.lessonId,w.id+'-past','英文句型',`昨天日記：Mia ___${tail} yesterday.（${w.zh}）`,[w.past,w.base,w.trap,ing],
      [`yesterday 表示昨天；肯定句用過去式 ${w.past}。`,`這是原形 ${w.base}，但句子沒有 did，且動作已在昨天完成，要改成 ${w.past}。`,`${w.base} 是不規則動詞，在本題不是加 ed；正確變化是 ${w.base} → ${w.past}。`,'這個 -ing 選項不能單獨放在這個過去式肯定句；本題要用動詞的過去式。'],
      'yesterday；句子沒有 did',`${w.base} → ${w.past}`,`把 Mia 換成 We，再說一遍：We ${w.en} yesterday.`);
    add(w.lessonId,w.id+'-did','英文句型',`問昨天的活動：Did Ben ___${tail} yesterday?（${w.zh}）`,[w.base,w.past,w.trap,ing],
      [`Did 已經表示過去，後面用原形 ${w.base}。`,`${w.past} 是過去式，但 Did 後面要還原為 ${w.base}，不能把兩處都改成過去式。`,`${w.trap} 不是這裡需要的形式；先看到 Did，再選原形 ${w.base}。`,'Did 問句後接動詞原形，這個 -ing 選項不符合本題句型。'],
      '句首 Did',`Did + 人 + ${w.base}${tail} ...?`,`回答一次：Yes, he did. 然後補完整句：He ${w.en} yesterday.`);
    add(w.lessonId,w.id+'-negative','英文句型',`否定日記：Lily didn't ___${tail} yesterday.（昨天沒有${w.zh}）`,[w.base,w.past,w.trap,ing],
      [`didn't 後接原形 ${w.base}，表示昨天沒有做這件事。`,`${w.past} 要用在過去式肯定句；didn't 已表示過去，後方回到 ${w.base}。`,`${w.trap} 不能放在 didn't 後面；否定句這個位置用原形 ${w.base}。`,'這裡不是進行式；didn’t 後要接原形。'],
      "didn't",`didn't + ${w.base}`,`比較：Lily ${w.en}. / Lily didn't ${w.base}${tail}.`);
    add(w.lessonId,w.id+'-detective','英文閱讀',`日記偵探：Noah ${w.en} yesterday. What did Noah do yesterday?`,[w.zh,...others.slice(0,3).map(x=>x.zh)],
      [`句中 ${w.en} 就是 Noah 昨天做的事：「${w.zh}」。`,...others.slice(0,3).map(x=>`「${x.zh}」要有 ${x.en} 的線索，但短句寫的是 ${w.en}。不要用自己覺得可能發生的活動替代文字。`)],
      `Noah 後面的 ${w.en}`,'What ... do? 問做了什麼，找活動。',`把答案完整說出來：He ${w.en} yesterday.`);
  }
  const places=ENGLISH_WORDS.filter(w=>!w.base);
  for(const w of places){
    const options=[w,...places.filter(x=>x.id!==w.id)];
    add('eng-1',w.id+'-where','英文閱讀',`週末明信片：I went to the ${w.en} last weekend. Where did I go?`,options.map(x=>x.zh),
      options.map(x=>x.id===w.id?`went to the ${w.en} 明確指出去了「${w.zh}」。`:`「${x.zh}」是 ${x.en}；明信片寫的是 ${w.en}，不能只憑週末的印象選。`),
      `to the ${w.en}`,'Where 問地點；先找 to 後面的地方。',`問家人：Where did you go last weekend? 再用本題地點回答。`);
    add('eng-1',w.id+'-repair','英文句型',`小編改日記：要說「我上週末去了${w.zh}」，哪句正確？`,[`I went to the ${w.en} last weekend.`,`I go to the ${w.en} last weekend.`,`I goed to the ${w.en} last weekend.`,`I went the ${w.en} last weekend.`],
      ['last weekend 表示過去，go 改成 went；前往這個地點用 went to the…。','go 是原形；這個肯定句要描述上週末，改用 went。','go 的過去式是不規則的 went，不是 goed。','本題這些地點前要有 to；went to the… 才把動作和目的地接起來。'],
      'last weekend；前往地點','go → went；went to the + 地點',`將句中 I 換成 They，went 保持不變。`);
  }
  for(const [id,word,letter,sound,other,explain] of [
    ['c-ice','ice','c','/s/','/k/','ice 的 c 在 e 前，這個字的 c 發 /s/。'],
    ['c-city','city','c','/s/','/k/','city 的 c 在 i 前，發 /s/。'],
    ['c-candy','candy','c','/k/','/s/','candy 的 c 發 /k/，不是 /s/。'],
    ['c-cake','cake','c','/k/','/s/','cake 的 c 發 /k/。先看 c 後緊接的 a，不是字尾的 e。'],
    ['g-cage','cage','g','/dʒ/','/ɡ/','cage 的 g 發 /dʒ/，可和字尾 e 一起辨認。'],
    ['g-magic','magic','g','/dʒ/','/ɡ/','magic 的 g 在 i 前，這個字發 /dʒ/。'],
    ['g-garden','garden','g','/ɡ/','/dʒ/','garden 的 g 發 /ɡ/。'],
    ['g-game','game','g','/ɡ/','/dʒ/','game 的 g 發 /ɡ/；看 g 後緊接的 a，不是最後的 e。']
  ])add(letter==='c'?'eng-1':'eng-2',id,'英文發音',`字母偵探：${word} 裡的 ${letter} 發哪個音？`,[sound,other,'不發音','/m/'],
    [explain,`${other} 是另一種讀法；${word} 中的 ${letter} 要讀 ${sound}。`,`${word} 裡這個 ${letter} 有發音，讀 ${sound}。`,`/m/ 是另一個音，${word} 中的 ${letter} 不是這個音。`],
    `${word} 的字母 ${letter} 與後面的字母`,`${word}：${letter} → ${sound}；發音規則有例外，要連單字一起記。`,`回英文單字教室，用發音示例按鈕聽 ${word}，再跟讀。`);
  const rows=[
    ['eng-1','where-what','英文句型','回答是「I went to the riverside park.」，哪個問句最合適？',['Where did you go last weekend?','What did you do last weekend?','Did you ride a bike?','What is your name?'],['答案重點是地點 riverside park，Where 問去了哪裡。','What ... do? 要活動，如 rode a bike；這個答案主要提供地點。','Did 問句通常先用 Yes / No 回應；本題是在問地點。','姓名問句要回答名字，與地點無關。'],'答案中的 riverside park','Where → 地點；What ... do → 活動','把地點答案換成 night market，再說一次問答。'],
    ['eng-1','go-base','英文句型','Where did you ___ last weekend?',['go','went','goes','going'],['did 後面接原形 go。','went 是過去式，did 後面要還原為 go。','goes 用於現在式第三人稱單數；本題 did 後接原形。','going 不能直接接在這個 did 問句裡。'],'did','Where + did + 人 + go + 過去時間？','答句可以說 I went to the night market.，問句的 go 和答句的 went 不一樣。'],
    ['eng-1','time-clue','英文句型','哪個時間詞明確表示「上個週末」？',['last weekend','every weekend','next weekend','tomorrow'],['last weekend 是已過去的上個週末。','every weekend 表示每個週末，是習慣的線索。','next weekend 是下個週末，還沒到。','tomorrow 是明天，不是上週末。'],'上個','last → 上一個；next → 下一個','用手指向身後說 last weekend，再說一件做過的事。'],
    ['eng-1','two-days','英文閱讀','週末記錄：On Saturday, Amy went to the department store. On Sunday, she went to the riverside park. Where did she go on Sunday?',['The riverside park.','The department store.','The night market.','The amusement park.'],['Sunday 那句寫 riverside park，所以要配星期日的地點。','百貨公司是 Saturday 的地點，時間對錯了。','文字沒有寫夜市，不能補入自己的猜想。','文字沒有寫遊樂園，不能只看到週末就推測。'],'on Sunday','先找時間，再在同一句找地點。','畫兩格時間表：Saturday / Sunday，各寫一個地方。'],
    ['eng-1','habit-past','英文句型','比較時間：I go shopping every Sunday. 改成「上週日」應選哪句？',['I went shopping last Sunday.','I go shopping last Sunday.','I goes shopping last Sunday.','I goed shopping last Sunday.'],['時間改成 last Sunday，肯定句 go 變成 went。','時間已改成過去，但動詞還停在原形 go。','I 不搭配 goes；而且 last Sunday 要用 went。','go 不直接加 ed，過去式是 went。'],'every Sunday → last Sunday','習慣與已發生的單次活動，要用不同時間和動詞。','說出 go—went，再用 last Sunday 造句。'],
    ['eng-1','no-to-shopping','英文句型','買東西任務：昨天去購物，哪句正確？',['I went shopping yesterday.','I went to shopping yesterday.','I goed shopping yesterday.','I go shopping yesterday.'],['去購物是 go shopping；過去式變成 went shopping，中間不加 to。','shopping 是這個活動片語的一部分，go shopping 不在中間加 to。','go 的過去式是 went，不是 goed。','yesterday 表示過去，這個肯定句要用 went。'],'活動 shopping','去地點：went to the park；去購物：went shopping。','把這兩種句型各念一次，說出哪個要 to。'],
    ['eng-2','did-do','英文句型','What did he ___ yesterday?',['do','did','does','doing'],['第一個 did 表示過去，後面的主要動詞要用原形 do。','不能在本句兩個位置都填 did；後面應用 do。','does 是現在式第三人稱單數形式，本句已有 did。','doing 不符合這個 did 問句的原形位置。'],'前面的 did','What + did + 人 + do + 過去時間？','答句 He swam yesterday. 不用再放 did。'],
    ['eng-2','yes-short','英文句型','對話：Did Leo swim yesterday? Leo 昨天確實游泳了。選正確簡答。',['Yes, he did.','Yes, he does.','Yes, he is.','No, he didn’t.'],['用 Did 問過去，就用 did 回應；Leo 對應 he。','does 回應現在的習慣，和本題 Did 不配。','is 不是這裡回應 Did 的助動詞。','No 表示沒有做，與題目「確實游泳」相反。'],'Did；確實游泳','Did…? → Yes, 人 did. / No, 人 didn’t.','把 Leo 換成 Mia，簡答改成 Yes, she did.'],
    ['eng-2','no-short','英文句型','對話：Did Emma write a letter yesterday? 她昨天沒寫信。選正確簡答。',['No, she didn’t.','No, she doesn’t.','Yes, she did.','No, he didn’t.'],['Did 問過去，用 didn’t 表示沒有；Emma 對應 she。','doesn’t 是現在式；本題問昨天，要用 didn’t。','Yes 與「沒寫信」相反。','題目是她，要用 she，不能改成 he。'],'Did；她；沒有','先對時間，再對 Yes/No，最後對人稱。','完整說：She didn’t write a letter yesterday.'],
    ['eng-2','contrast-read','英文閱讀','活動卡：Ben didn’t swim yesterday. He took a walk. What did Ben do?',['He took a walk.','He swam.','He sang songs.','He wrote a letter.'],['第二句直接說 took a walk；第一句 didn’t 否定游泳。','只看到 swim 不夠：前面有 didn’t，表示沒游泳。','沒有 sang songs 的線索，不要加入文章沒說的事。','沒有 wrote a letter 的線索，這不是他的活動。'],'didn’t swim；took a walk','圈出否定詞，避免只看到熟悉單字就選。','遮住答案，用中文說出「沒做什麼、做了什麼」。'],
    ['eng-2','who-read','英文閱讀','活動卡：Mia drew a picture. Ben wrote a letter. What did Ben do?',['He wrote a letter.','He drew a picture.','He had a picnic.','He ran.'],['Ben 那句是 wrote a letter，回答他寫信。','畫圖的是 Mia；活動和人物配錯了。','文章沒有說 Ben 野餐，不能猜。','文章沒有說 Ben 跑步，不能猜。'],'Ben','先找問題問誰，再找這個人的動作。','做兩欄配對：Mia—drew；Ben—wrote。'],
    ['eng-2','past-subject','英文句型','He swam yesterday. 把 He 換成 They，哪句正確？',['They swam yesterday.','They swams yesterday.','They swim yesterday.','They swimming yesterday.'],['這裡的過去式 swam 不因主詞換成 They 而改變。','過去式 swam 不加 s；也不是用現在式主詞規則。','yesterday 的肯定句要用 swam，不是原形 swim。','這個句子不能讓 swimming 單獨作主要動詞。'],'yesterday；主詞換了','本單元這些過去式動詞，不隨 I / he / they 改變。','用 I、She、We 各說一次 swam yesterday。']
  ];
  rows.forEach(r=>add(...r));
  const units=[
    {id:'eng-1',subject:'英文',unit:'Unit 1',title:'Where Did You Go Last Weekend?',accent:'purple',sub:'翰林 Here We Go 9 × 週末回憶',goal:'問清楚上週末去了哪裡、做了什麼；用地點和過去式講自己的故事。',points:[['先找時間','last weekend 是上週末。已發生的肯定句用過去式：I went to the night market.'],['問地點還是活動？','Where did you go? 要回答地點。What did you do? 要回答活動，如 I flew a kite.'],['did 出現，動詞回原形','Where did you go? 的 go 不改 went；答句 I went… 才用過去式。'],['拼讀線索','c 有 /s/ 和 /k/ 的讀法，如 city、candy。規則有例外，連單字一起聽、一起記。']],cards:[['Where 問什麼？','問地點：I went to the riverside park.'],['go 的過去式？','went。問句 Did…go，肯定答句 went。'],['fly / ride / see 的過去式？','flew / rode / saw。讀成整句比只背單字更清楚。']]},
    {id:'eng-2',subject:'英文',unit:'Unit 2',title:'What Did He Do Yesterday?',accent:'purple',sub:'翰林 Here We Go 9 × 昨日偵探',goal:'讀懂昨天的活動，說出做了什麼、沒做什麼，並用 did 回答。',points:[['不規則動詞成對記','draw→drew、have→had、run→ran、sing→sang、swim→swam、take→took、write→wrote、get→got。'],['三種句子一起比','He swam. / Did he swim? / He didn’t swim.。肯定用過去式，did / didn’t 後用原形。'],['簡答也要對時間','Did she…? → Yes, she did. / No, she didn’t.。別把現在式 does 混進來。'],['讀句子先看人和否定','先找問題問誰，再看 didn’t。有 swim 不代表真的游泳，還要看前面的否定詞。'],['字母 g 的聲音','cage 的 g 發 /dʒ/；garden 的 g 發 /ɡ/。不能只看字母名稱猜聲音。']],cards:[['看到 didn’t，後面怎麼寫？','動詞原形：didn’t swim，不是 didn’t swam。'],['Did he take a walk? 怎麼簡答？','Yes, he did. 或 No, he didn’t.'],['What did he do yesterday? 問什麼？','問他昨天的活動：He drew a picture yesterday.']]}
  ];
  for(const l of units){l.questions=ENGLISH_QUESTIONS.filter(q=>q.lessonId===l.id);LESSONS.push(l);}
  QUESTION_BANK.push(...ENGLISH_QUESTIONS);
  EXAMS['eng-quiz']={title:'英文期中任務',subject:'英文',desc:'Unit 1–2 單字、過去式、發音辨別與短文線索。',questions:ENGLISH_QUESTIONS};
  EXAMS['mix-quiz'].title='四科期中大冒險';
  EXAMS['mix-quiz'].desc='在本次期中範圍，練國語、自然、社會與英文。';
  EXAMS['mix-quiz'].questions=[...QUESTION_BANK];
})();
