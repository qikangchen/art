CAPTURE = false
FPS = 60
const SCALE = 5

const NOISE_INCREMENT = 0.0008
const Z_NOISE_INCREMENT = 0.000
const FORCE_FIELD_NOISE_SCALE = 4

const PARTICLE_AMOUNT = 3000
const MAX_SPEED = 4

var cols, rows
let z_off = 0
let particles = []

let SEEDS = [2223, 0, 2, 8, 9 , 13, 54, 2340, 2323]

function setup(){
  frameRate(FPS)
  createCanvas(1200, 1200)
  cols = floor(width/SCALE) + 1
  rows = floor(height/SCALE) + 1

  for (let i = 0; i < PARTICLE_AMOUNT; i++) {
    particles.push(new Particle(SCALE, MAX_SPEED))    
  }

  let seed = 2223
  noiseSeed(seed)
  randomSeed(seed)

  background(57, 106, 247)

  capturer = new CCapture({ format: 'png', framerate: FPS}) 
}

let seed_index = 0
let hold = true
function draw(){
  if(CAPTURE && frameCount == 1) {
    capturer.start()
  }

  if(frameCount == 1 || frameCount % 30 == 0){
    let seed = SEEDS[seed_index]
    noiseSeed(seed)
    randomSeed(seed)
    print(seed_index, seed)
    if(hold == false){
      seed_index++
    }else{
      background(57, 106, 247)
    }
    hold = !hold

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      particle.reset()
    }

  }
  if(seed_index == SEEDS.length ){
    print("end")
    noLoop()
    if(CAPTURE){
      capturer.stop()
      capturer.save()
    }
   return
  }

  if(!hold){
    drawArt()
  }
  if(CAPTURE){
    capturer.capture(document.getElementById('defaultCanvas0'));
  }
}

function drawArt() {
  let force_field = createForceField()

  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i]
    particle.applyForceField(force_field)
    particle.update()
    particle.draw()
  }
}

function createForceField() {
  let force_field = new Array(rows)
  let y_off = 0
  for (let y = 0; y < rows; y++) {
    force_field[y] = new Array(cols)
    let x_off = 0
    for (let x = 0; x < cols; x++) {
      let n = noise(x_off, y_off, z_off)
      let angle =  n * TWO_PI * FORCE_FIELD_NOISE_SCALE
      let v = p5.Vector.fromAngle(angle)
      v.setMag(3)

      // drawNoise(x, y, n)
      // // wForceField(x, y, v)

      force_field[y][x] = v
      x_off += NOISE_INCREMENT
    }
    y_off += NOISE_INCREMENT
    z_off += Z_NOISE_INCREMENT
  }

  return force_field
}

function drawNoise(x, y, n){
  fill(n*255)
  strokeWeight(0.1)
  rect(x*SCALE, y*SCALE, SCALE, SCALE)
}

function drawForceField(x, y, v) {
  push()
  stroke(200, 100)
  strokeWeight(2)
  translate(x * SCALE, y * SCALE)
  rotate(v.heading())
  line(0, 0, SCALE, 0)
  pop()
}
