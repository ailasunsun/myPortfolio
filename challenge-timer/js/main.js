'use strict';

// 教科書参考
// ボタンの定数
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

//bodyの定数
const body = document.querySelector('body');


//入力時間の最終時刻（初期値null）
let goal;
// setTimeOutの変数（初期値null）
let timer;
//今の経過時刻（初期値null）
let remainTime;

// スタートボタンを押したら
startBtn.addEventListener('click', () => {
  //inputの入力値を数値（10進数）を変数に代入
  let inputHour = parseInt(document.querySelector('input[name="setHour"]').value, 10) || 0;
  let inputMin = parseInt(document.querySelector('input[name="setMin"]').value, 10) || 0;
  let inputSec = parseInt(document.querySelector('input[name="setSec"]').value, 10) || 0;


  // 入力値が00:00:00だったら処理中止してclickイベント出る
  if (inputHour === 0 && inputMin === 0 && inputSec === 0) {
    return;
  }
  // goalにinputの入力時間をミリ秒で代入
  goal = (inputHour * 3600 + inputMin * 60 + inputSec) * 1000;

  //recalcの実行
  recalc();
});


// カウントダウンの処理
// ゴール時間から現在時間を引く
// 残り時間をリターンする
function countdown(due) {
  //残り時間が0ならcountdownの引数return0
  if (remainTime == null) {
    remainTime = due;
  }

  // 残り時間をミリ秒から秒に
  const sec = Math.floor(remainTime / 1000) % 60;
  // 残り時間をミリ秒から分に
  const min = Math.floor(remainTime / 1000 / 60) % 60;
  // 残り時間をミリ秒から時に
  const hour = Math.floor(remainTime / 1000 / 60 / 60);
  console.log(remainTime);
  // 残り時間（時、分、秒の順に）を定数に代入
  return [hour, min, sec];
}

// recalcの処理内容
// p要素に00:00:00の形で時分秒を代入
function recalc() {

  // counterにcountdown関数を代入
  const counter = countdown(goal);
  // hourにゴールの時数を代入
  document.getElementById('hour').textContent = String(counter[0]).padStart(2, '0');
  // minにゴールの分数を代入
  document.getElementById('min').textContent = String(counter[1]).padStart(2, '0');
  // secにゴールの秒数を代入
  document.getElementById('sec').textContent = String(counter[2]).padStart(2, '0');

  // 残り時間が０になったらtrue
  if (counter[0] === 0 && counter[1] === 0 && counter[2] === 0) {
    // recalcの処理をやめる
    clearTimeout(timer);
  } else {
    // 残りの秒数から1000ミリ秒ずつ減算
    remainTime -= 1000;
    // 一秒毎にrecalcを実行し、処理結果をtimerに代入
    timer = setTimeout(recalc, 1000);
  }//if(counter)の判定終了
}//recalcの処理



// ストップボタン押したら止める
stopBtn.addEventListener('click', () => {
  //recalcの処理をやめる
  clearTimeout(timer);
  console.log('ストップボタンを押しました');
});

// リセットボタン押したらリセットする
resetBtn.addEventListener('click', () => {
  //recalcの処理をやめる
  clearTimeout(timer);
  //p要素に0を代入
  document.getElementById('hour').textContent = '00';
  document.getElementById('min').textContent = '00';
  document.getElementById('sec').textContent = '00';

  //input要素を空にする
  resetInput();

  // remainTimeのリセット
  remainTime = null;
  console.log('リセットボタンを押しました');
});

//resetInputの処理
//inputの入力欄を空にする
function resetInput() {
  document.querySelector('input[name="setHour"]').value = '';
  document.querySelector('input[name="setMin"]').value = '';
  document.querySelector('input[name="setSec"]').value = '';
}
