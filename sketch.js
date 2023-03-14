var grid;
var next;

var dA = 1;
var dB = 0.5;
var feed = 0.055;
var kill = 0.062;

function setup() {
  createCanvas(200, 200);
  pixelDensity(1);
  grid = [];
  next = [];
  for (var x = 0; x < width; x += 1) {
    grid[x] = [];
    next[x] = [];
    for (var y = 0; y < height; y += 1) {
      grid[x][y] = {
        a: 1,
        b: 0
      };
      next[x][y] = {
        a: 1,
        b: 0
      };
    }
  }
  for (var i = 100; i < 110; i += 1) {
    for (var j = 100; j < 110; j += 1) {
      grid[i][j].b = 1;
    }
  }
}

function draw() {
  background(51);

  for (var x = 1; x < width - 1; x += 1) {
    for (var y = 1; y < height - 1; y += 1) {
      var a = grid[x][y].a;
      var b = grid[x][y].b;
      next[x][y].a = a + dA * laplaceA(x, y) - a * b * b + feed * (1 - a);
      next[x][y].b = b + dB * laplaceB(x, y) + a * b * b - (kill + feed) * b;

      next[x][y].a = constrain(next[x][y].a, 0, 1);
      next[x][y].b = constrain(next[x][y].b, 0, 1);
    }
  }

  loadPixels();
  for (var x = 0; x < width; x += 1) {
    for (var y = 0; y < height; y += 1) {
      var pixelIndex = (x + y * width) * 4
      var a = next[x][y].a;
      var b = next[x][y].b;
      var c = floor((a - b) * 255);
      c = constrain(c, 0, 255);
      pixels[pixelIndex + 0] = c;
      pixels[pixelIndex + 1] = c;
      pixels[pixelIndex + 2] = c;
      pixels[pixelIndex + 3] = 255;
    }
  }
  updatePixels();

  swapValues();
}

function laplaceA(x, y) {
  var sum = 0;
  sum += grid[x][y].a * -1;
  sum += grid[x - 1][y].a * 0.2;
  sum += grid[x + 1][y].a * 0.2;
  sum += grid[x][y + 1].a * 0.2;
  sum += grid[x][y - 1].a * 0.2;
  sum += grid[x - 1][y - 1].a * 0.05;
  sum += grid[x + 1][y - 1].a * 0.05;
  sum += grid[x + 1][y + 1].a * 0.05;
  sum += grid[x - 1][y + 1].a * 0.05;

  return sum;
}

function laplaceB(x, y) {
  var sum = 0;
  sum += grid[x][y].b * -1;
  sum += grid[x - 1][y].b * 0.2;
  sum += grid[x + 1][y].b * 0.2;
  sum += grid[x][y + 1].b * 0.2;
  sum += grid[x][y - 1].b * 0.2;
  sum += grid[x - 1][y - 1].b * 0.05;
  sum += grid[x + 1][y - 1].b * 0.05;
  sum += grid[x + 1][y + 1].b * 0.05;
  sum += grid[x - 1][y + 1].b * 0.05;
  return sum;
}

function swapValues() {
  var temp = grid;
  grid = next;
  next = temp;
}
