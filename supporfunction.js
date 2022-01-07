function getRandomWord(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
};

function compare(a, b) {
  if (a['eng'] > b['eng']) return 1;
  if (a['eng'] === b['eng']) return 0;
  if (a['eng'] < b['eng']) return -1;
};

async function getAnswers(arr, testObj) {
  let word = await getRandomWord(arr);
  testObj.word = word;
  testObj.count++;
  let wordsArr = [];
  wordsArr.push(word);
  for (let i = 0; i < 3; i++) {
    wordsArr.push(getRandomWord(arr));
  }
  testObj.wordsArr = wordsArr.sort(compare);
};

async function checkAnswer(answer, testObj) {
  if (testObj.word.eng === answer) {
    testObj.rightAnswers++;
  }
};

function getResult(testObj, arr) {
  if(testObj.rightAnswers / testObj.count) {
    return 'Ваш словарный запас явно превышает 3000 слов!';
  } else {
    let result = Math.round((testObj.rightAnswers / testObj.count) * arr.length);
    return `Ваш словарный запас составляет приблизительно ${result} анлийских слов!`
  }
}

module.exports = {
  getAnswers,
  checkAnswer,
  getResult
}