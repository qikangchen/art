const FPS = 60
const CANVAS_SIZE = 500
let monsteras = []

function setup(){
  frameRate(FPS)
  createCanvas(CANVAS_SIZE, CANVAS_SIZE, WEBGL)

  for(let i=0; i<10; i++){
    
    // let monstera = new Monstera(random(0, 0), random(0, 0), CANVAS_SIZE)
    let monstera = new Monstera(random(-200, 200), random(-100, 100), CANVAS_SIZE)
    monsteras.push(monstera)
  }

  background(100)
  noLoop()
}

function draw(){
  monsteras.forEach(monstera => { 
    monstera.draw()
  });
}