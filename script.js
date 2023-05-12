let myCards = document.getElementById("container");
let resultsArray = [];
let counter = 0;
let text = document.getElementById("text");
let seconds = 00;
let tens = 00;
let appendTens = document.getElementById("tens");
let appendSeconds = document.getElementById("seconds");
let Interval;
let images = ["sass", "git", "gulp", "css", "grunt"];

let clone = images.slice(0); // duplicate array
let cards = images.concat(clone); // merge to arrays

// Shufffel function
function shuffle(o) {
  for (
    let j, x, i = o.length;
    i;
    j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
}
shuffle(cards);

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
    text.innerHTML = "Your time was " + seconds + ":" + tens;
  }
};

function startTimer() {
  tens++;

  if (tens < 9) {
    appendTens.innerHTML = "0" + tens;
  }

  if (tens > 9) {
    appendTens.innerHTML = tens;
  }

  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }

  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;
  }
}
