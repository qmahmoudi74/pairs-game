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

for (let i = 0; i < cards.length; i++) {
  card = document.createElement("div");
  card.dataset.item = cards[i];
  card.dataset.view = "card";
  myCards.appendChild(card);

  card.onclick = function () {
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
  };
}

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

  if (tens < 9) {
    tensElement.innerHTML = "0" + tens;
  }

  if (tens > 9) {
    tensElement.innerHTML = tens;
  }

  if (tens > 99) {
    seconds++;
    secondsElement.innerHTML = "0" + seconds;
    tens = 0;
    tensElement.innerHTML = "0" + 0;
  }

  if (seconds > 9) {
    secondsElement.innerHTML = seconds;
  }
}
