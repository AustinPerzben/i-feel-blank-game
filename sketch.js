let dirs = ["S", "E", "N", "W"];
let sz = 420;
let step;

let p1;
let p2;
let phase;
let moves;
let maxmoves = 1;

let hovered;
let selected;

function setup() {
  var cnv = createCanvas(sz, sz);
  cnv.parent("board");
  step = sz / 4;
  p1 = new Player("P1", step, step, "#8BC34A");
  p2 = new Player("P2", 3*step, 3*step, "#00BCD4", 180);
  p1.opp = p2;
  p2.opp = p1;
  phase = "SETUP";
  moves = 1;
}

function draw() {
  hovered = null;
  if (phase.includes("SCENE")) {
    selected = null;
  }

  board();
  p1.draw();
  p2.draw();
}

function board() {
  noStroke();
  fill("#8BC34A");
  rect(2, 2, 2*step, height - 4, 15, 0, 0, 15);
  fill("#00BCD4");
  rect(2*step+2, 2, 2*step-4, height - 4, 0, 15, 15, 0);
  strokeWeight(4);
  stroke(200);
  noFill();
  square(2, 2, width - 4, 15);
  line(step*2, 0, step*2, height);
  line(0, step*2, width, step*2);
  fill(210);
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  rect(2*step, 2*step, 60, 24, 5);
  fill(80);
  noStroke();
  text(phase, 2*step, 2*step);
  pop();
  strokeWeight(1);
}

function mousePressed() {
  if (phase == "SETUP") {
    selected = hovered;
  }
  
}

function keyPressed() {
  if (keyCode == BACKSPACE && moves < maxmoves) {
    selected.move(selected.undo);
    moves += 1;
  }
  if (keyCode == 82) {
    p1.x = step;
    p1.y = step;
    p1.rotation = 0;
    p2.x = 3*step;
    p2.y = 3*step;
    p2.rotation = 180;
    phase = "SETUP";
    selected = null;
  }
  if (keyCode == ENTER) {
    if (phase == "SETUP" || phase == "INSIGHT") {
      phase = "P1 TURN";
    } else if (phase == "P1 TURN") {
      phase = "SCENE 1";
    } else if (phase == "SCENE 1") {
      phase = "P2 TURN";
    } else if (phase == "P2 TURN") {
      phase = "SCENE 2";
    } else if (phase == "SCENE 2") {
      phase = "INSIGHT";
    }
    moves = 1;
  }
  if (moves > 0 || phase == "SETUP") {
    if (selected != null) {
      if (p1.y - p2.y != 0) {
        if (selected.x >= 2*step) {
          if (keyCode == LEFT_ARROW) {
            selected.move("we");
            moves -= 1;
          }
        }
        if (selected.x <= 2*step) {
          if (keyCode == RIGHT_ARROW) {
            selected.move("ea");
            moves -= 1;
          }
        }
      }
      if (p1.x - p2.x != 0) {
        if (selected.y >= 2*step) {
          if (keyCode == UP_ARROW) {
            selected.move("no");
            moves -= 1;
          }
        }
        if (selected.y <= 2*step) {
          if (keyCode == DOWN_ARROW) {
            selected.move("so");
            moves -= 1;
          }
        }
      }
      if (keyCode == 16) {
        selected.move("cc");
        moves -= 1;
      }
      if (keyCode == 17) {
        selected.move("cw");
        moves -= 1;
      }
    }
  }
}
