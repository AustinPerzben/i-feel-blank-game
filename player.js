class Player {
  constructor(name, x, y, color, rot = 0) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.color = color;
    this.rotation = rot;
    this.opp = null;
    this.state = null;
    this.undo = "";
  }

  eye(x, y, target = createVector(mouseX, mouseY)) {
    push();
    fill(255);
    stroke(160);
    circle(x, y, 32);

    const angle = atan2(target.y - y, target.x - x);
    x += cos(angle) * 6;
    y += sin(angle) * 6;
    noStroke();
    fill(this.color);
    circle(x, y, 16);
    x += cos(angle) * 1;
    y += sin(angle) * 1;
    fill(0);
    circle(x, y, 8);
    pop();
  }

  get_state() {
    let s = "";
    if (this.x <= 2*step) {
      s += "G";
    } else {
      s += "B";
    }
    s += dirs[abs(this.rotation / 90) % 4];

    return s;
  }

  move(cmd) {
    if (cmd == "cc") {
      this.undo = "cw";
      if (this.rotation == 0) {
        this.rotation = 270;
      } else {
        this.rotation -= 90;
      }
    } else if (cmd == "cw") {
      this.rotation += 90;
      this.undo = "cc";
    } else if (cmd == "no") {
      this.y -= 2*step;
      this.undo = "so";
    } else if (cmd == "so") {
      this.y += 2*step;
      this.undo = "no";
    } else if (cmd == "we") {
      this.x -= 2*step;
      this.undo = "ea";
    } else if (cmd == "ea") {
      this.x += 2*step;
      this.undo = "we";
    }
  }

  draw() {
    this.state = this.get_state();
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < 35) {
      hovered = this;
    }
    if (phase.includes(this.name)) {
      selected = this;
    }
    
    push();

    fill(200);
    stroke(160);
    if (hovered == this) {
      strokeWeight(3);
      stroke("#FF9800");
    }
    if (selected == this) {
      stroke("#FF9800");
      fill("#D3BA96");
    }

    angleMode(DEGREES);
    translate(this.x, this.y);
    rotate(this.rotation);
    ellipse(0, 0, 65, 80);
    pop();

    if (abs(this.rotation / 90) % 4 == 0) {
      this.eye(this.x, this.y + 24, this.opp);
      textAlign(CENTER, BOTTOM);
    }
    if (abs(this.rotation / 90) % 4 == 1) {
      this.eye(this.x + 24, this.y, this.opp);
      textAlign(RIGHT, CENTER);
    }
    if (abs(this.rotation / 90) % 4 == 2) {
      this.eye(this.x, this.y - 24, this.opp);
      textAlign(CENTER, TOP);
    }
    if (abs(this.rotation / 90) % 4 == 3) {
      this.eye(this.x - 24, this.y, this.opp);
      textAlign(LEFT, CENTER);
    }
    if (selected == this || hovered == this || phase == "INSIGHT") {
      push();
      noStroke();
      fill(80);
      textStyle(BOLD);
      text(this.state, this.x, this.y);
      pop();
    }
  }
}
