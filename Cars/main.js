//gather valeus of html//
let btnRace = document.getElementById("race");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//adding event listener//
btnRace.addEventListener("click", race);
function random(min, max) {
  return (num = Math.floor(Math.random() * (max - min + 1)) + min);
}
let myCars = [];

let CarNumber = [1,2,3,4];

let win = [CarNumber[0], CarNumber[1], CarNumber[2], CarNumber[3]];

function MakeCar() {
  fetch("https://www.colr.org/json/colors/random/10").then(function (response) {
    response.json().then(function (json) {
      if (ctx) {
        myCars.push(
          new Car({
            number: CarNumber[0],
            carColour: "#" + json.colors[myCars.length].hex,
            window: "#" + json.colors[myCars.length + 2].hex,
          })
        );
        // myCar.draw();
        myCars.push(
          new Car({
            y: 150,
            number: CarNumber[1],
            carColour: "#" + json.colors[myCars.length].hex,
            window: "#" + json.colors[myCars.length + 2].hex,
          })
        );
        // myCar1.draw();
        myCars.push(
          new Car({
            y: 300,
            number: CarNumber[2],
            carColour: "#" + json.colors[myCars.length].hex,
            window: "#" + json.colors[myCars.length + 2].hex,
          })
        );
        // myCar2.draw();
        myCars.push(
          new Car({
            y: 450,
            number: CarNumber[3],
            carColour: "#" + json.colors[myCars.length].hex,
            window: "#" + json.colors[myCars.length + 2].hex,
          })
        );
        // myCar3.draw();
        for (let i = 0; i < myCars.length; i++) {
          myCars[i].draw();
        }
      }
    });
  });
}

class Car {
  constructor(p) {
    this.x = (p && p.x) || 0;
    this.y = (p && p.y) || 0;
    this.height = (p && p.height) || 250;
    this.directionX = random(1, 5) || 10;
    this.carColour = (p && p.carColour) || "red";
    this.window = (p && p.window) || "black";
    this.number = (p && p.number) || "1";
    this.end = canvas.width || 700;
  }
  draw() {
    //calucating the size of the squares
    let s = this.height / 10;

    //drawing car body

    ctx.beginPath();
    ctx.moveTo(this.x + s * 2, this.y + s * 4);
    ctx.lineTo(this.x + s * 2, this.y + s * 2);
    ctx.lineTo(this.x + s * 4, this.y + s * 2);
    ctx.lineTo(this.x + s * 4, this.y + s * 1);
    ctx.lineTo(this.x + s * 6, this.y + s * 1);
    ctx.lineTo(this.x + s * 6, this.y + s * 1);
    ctx.lineTo(this.x + s * 6, this.y + s * 2);
    ctx.lineTo(this.x + s * 8.5, this.y + s * 2);
    ctx.lineTo(this.x + s * 8.5, this.y + s * 4);
    ctx.lineTo(this.x + s * 2, this.y + s * 4);
    ctx.fillStyle = this.carColour;
    ctx.fill();
    //
    //drawing car windows
    ctx.fillStyle = this.window;
    ctx.fillRect(this.x + s * 2.5, this.y + s * 2.3, s * 1.5, s * 0.7);
    ctx.fillRect(this.x + s * 5.5, this.y + s * 2.3, s * 1.5, s * 0.7);
    //drawing lights
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x + s * 8, this.y + s * 2, s * 0.5, s * 1.5);
    //drawing car wheels
    ctx.fillStyle = "black";
    this.wheels(this.x + s * 3, this.y + s * 4, s * 0.9);
    this.wheels(this.x + s * 7.5, this.y + s * 4, s * 0.9);
    //drawing number
    // text box
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black 1px";
    ctx.font = "40px comic";
    ctx.fillText(this.number, this.x + s * 4.5, this.y + s * 3);
    ctx.strokeText(this.number, this.x + s * 4.5, this.y + s * 3);
  }

  //setting the wheel direction
  wheels(x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 1 * Math.PI);
    ctx.fill();
  }
  move() {
    this.x += this.directionX;
    if(this.x + this.directionX >= this.end) {
      this.x = this.end;
      this.directionX = this.x

      win.push(this.CarNumber);

      alert(`Race Finished! \n \nThe winner is: Number ${win[this.number -1]}`);

      document.location.reload();
    }
  }
}

//NEED TO DO!!!!!//
//when to finish the loop//
//clear the screen//
//random number for speed//
//how to times to repeat while loop//

//funcation for moving the cars//
function race() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let j = 0; j < 1; j++) {
    for (let i = 0; i < myCars.length; i++) {
      myCars[i].draw();
      myCars[i].move();
    }
  }

  requestAnimationFrame(race);
}


MakeCar();
