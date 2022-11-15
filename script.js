const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let initialState = {
  cols: 30,
  rows: 20,
  score: 0,
  tail: [],
  static: 20,
  snakeX: 0,
  snakeY: 0,
  eatX: null,
  eatY: null,
  velY: 0,
  velX: 0,
  gameOver: false,
};

canvas.width = initialState.static * initialState.cols; // 600
canvas.height = initialState.static * initialState.rows; // 400

class Square {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Text {
  constructor(text, x, y, textAlign, fontSize) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.textAlign = textAlign;
    this.fontSize = fontSize;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.font = `${this.fontSize}px Inter`;
    ctx.textAlign = this.textAlign;
    ctx.fillText(this.text, this.x, this.y);
  }
}
addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
      initialState.velX = 0;
      initialState.velY = -1;
      break;
    case "s":
      initialState.velX = 0;
      initialState.velY = 1;
      break;
    case "a":
      initialState.velX = -1;
      initialState.velY = 0;
      break;
    case "d":
      initialState.velX = 1;
      initialState.velY = 0;
      break;

    default:
      break;
  }
  document.getElementById("score").innerText = initialState.score;
});
const generateEat = () => {
  initialState.eatX =
    Math.floor(Math.random() * initialState.cols) * initialState.static;
  initialState.eatY =
    Math.floor(Math.random() * initialState.rows) * initialState.static;
};
generateEat();

const loop = () => {
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    new Square(0, 0, canvas.width, canvas.height, "black").draw();
    new Square(
      initialState.snakeX,
      initialState.snakeY,
      initialState.static,
      initialState.static,
      "white"
    ).draw();
    new Square(
      initialState.eatX,
      initialState.eatY,
      initialState.static,
      initialState.static,
      "red"
    ).draw();

    initialState.snakeX += initialState.velX * initialState.static;
    initialState.snakeY += initialState.velY * initialState.static;

    if (
      initialState.snakeX === initialState.eatX &&
      initialState.snakeY === initialState.eatY
    ) {
      initialState.tail.push([initialState.eatX, initialState.eatY]);
      initialState.score++;
      generateEat();
    }

    for (let i = initialState.tail.length - 1; i >= 0; i--) {
      initialState.tail[i] = initialState.tail[i - 1];
    }
    if (initialState.tail.length > 0) {
      initialState.tail[0] = [initialState.snakeX, initialState.snakeY];
    }
    for (let i = 0; i < initialState.tail.length; i++) {
      new Square(
        initialState.tail[i][0],
        initialState.tail[i][1],
        initialState.static,
        initialState.static,
        "white"
      ).draw();
    }

    if (
      initialState.snakeX < 0 ||
      initialState.snakeX > initialState.cols * initialState.static ||
      initialState.snakeY < 0 ||
      initialState.snakeY > initialState.rows * initialState.static
    ) {
      gameOverFunc();
    }

    if (initialState.gameOver) {
      new Text(
        "Game Over",
        canvas.width / 2,
        canvas.height / 2 - 25,
        "center",
        50
      ).draw();
      new Text(
        "Click to start to again",
        canvas.width / 2,
        canvas.height / 2 + 25,
        "center",
        20
      ).draw();
    }
  }, 1000 / 10);
};

const gameOverFunc = () => {
  (initialState.score = 0),
    (initialState.tail = []),
    (initialState.snakeX = 0),
    (initialState.snakeY = 0),
    (initialState.static = 0),
    (initialState.velY = 0),
    (initialState.velX = 0),
    (initialState.gameOver = true);
};

addEventListener("click", () => {
  (initialState.gameOver = false), (initialState.static = 20);
});
loop();
