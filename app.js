function startGame() {
  let j = 3;
  let timer = document.getElementById("timer");

  let intervalId = setInterval(() => {
    let scaleFactor = 1 + (1 * (3 - j)) / 3;
    timer.style.transform = `scale(${scaleFactor})`;
    timer.innerText = j;
    j--;
    if (j <= -1) {
      timer.innerText = "Start";
    }
    if (j <= -2) {
      let container = document.getElementById("container");
      container.style.display = "flex";
      timer.style.display = "none";
      game();
      clearInterval(intervalId);
    }
  }, 800);
}

startGame();

function game() {
  i = 0;
  let clicks = 0;
  let guess = [];
  let num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let shuffledRandom = shuffle(num);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  console.log(shuffledRandom);

  function fillColor(index) {
    setTimeout(function () {
      let div = document.getElementById(shuffledRandom[index]);
      div.style.backgroundColor = "white";
      index++;
      if (index < shuffledRandom.length) {
        fillColor(index);
      }
    }, 250);
  }

  fillColor(0);

  function checkColors() {
    let Boxes = document.querySelectorAll(".box");
    Boxes.forEach((box) => {
      box.addEventListener("click", function () {
        clicks++;
        id = parseInt(this.id);
        guess.push(id);
        if (id === shuffledRandom[i]) {
          let div = document.getElementById(shuffledRandom[i]);
          div.style.backgroundColor = "green";
          // console.log("right");
        } else {
          let rightdiv = document.getElementById(shuffledRandom[i]);
          // console.log(shuffledRandom[i]);
          rightdiv.style.transform = "rotate(360deg)";
          let wrongdiv = document.getElementById(this.id);
          wrongdiv.style.backgroundColor = "red";
          // console.log("wrong");
        }
        if (clicks == 9) {
          let container = document.getElementById("container");
          setTimeout(() => {
            if (
              guess.length === shuffledRandom.length &&
              guess.every((value, index) => value === shuffledRandom[index])
            ) {
              container.innerText = "you win";
            } else {
              // console.log(guess);
              // console.log(shuffledRandom);
              container.innerText = "you loose";
            }
          }, 500);
        }
        i++;
      });
    });
  }

  checkColors();
}
