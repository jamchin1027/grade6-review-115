(function(){
  LESSONS.push(...MATH_UNITS);
  QUESTION_BANK.push(...MATH_QUESTIONS);
  EXAMS['math-quiz']={title:'數學期中練習',subject:'數學',desc:'康軒六上第 1–4 單元。先列式，再辨別容易混淆的算式。',questions:MATH_QUESTIONS};
  EXAMS['mix-quiz'].title='五科期中大冒險';
  EXAMS['mix-quiz'].desc='國語、英文、數學、自然、社會的期中範圍混合練習。';
  EXAMS['mix-quiz'].questions=QUESTION_BANK.filter(q=>!q.idiomId);
})();
