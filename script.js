const myCards = document.getElementById("container");
const textElement = document.getElementById("text");
const tensElement = document.getElementById("tens");
const secondsElement = document.getElementById("seconds");

let resultsArray = [];
let counter = 0;
let seconds = 0;
let tens = 0;
let Interval;

const images = ["sass", "git", "gulp", "css", "grunt"];
const cards = [...images, ...images].sort(() => Math.random() - 0.5);

cards.forEach((item) => {
  const card = document.createElement("div");
  card.dataset.item = item;
  card.dataset.view = "card";

  card.addEventListener("click", function () {
    if (this.className != "flipped" && this.className != "correct") {
      this.className = "flipped";
      let result = this.dataset.item;
      resultsArray.push(result);
      clearInterval(Interval);
      Interval = setInterval(startTimer, 10);
    }

    if (resultsArray.length > 1) {
      if (resultsArray[0] === resultsArray[1]) {
        check("correct");
        counter++;
        win();
        resultsArray = [];
      } else {
        check("reverse");
        resultsArray = [];
      }
    }
  });

  myCards.appendChild(card);
});

let check = function (className) {
  let x = document.getElementsByClassName("flipped");
  setTimeout(function () {
    for (let i = x.length - 1; i >= 0; i--) {
      x[i].className = className;
    }
  }, 500);
};

let win = function () {
  if (counter === 5) {
    clearInterval(Interval);
    textElement.innerHTML = "Your time was " + seconds + ":" + tens;
  }
};

function startTimer() {
  tens++;
  tensElement.innerHTML = tens < 10 ? "0" + tens : tens;

  if (tens <= 99) return;

  seconds++;
  secondsElement.innerHTML = seconds < 10 ? "0" + seconds : seconds;

  tens = 0;
  tensElement.innerHTML = "00";
}

// check - win - startTimer
