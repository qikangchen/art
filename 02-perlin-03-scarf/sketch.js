CAPTURE = false
FPS = 60
const SCALE = 10

const NOISE_INCREMENT = 0.005
// const Z_NOISE_INCREMENT = 0.000023
// const Z_NOISE_INCREMENT = 0.000019

// const Z_NOISE_INCREMENT = 0.000012
const Z_NOISE_INCREMENT = 0.000015 // guter abschluss
const FORCE_FIELD_NOISE_SCALE = 4

const PARTICLE_AMOUNT = 4000
const MAX_SPEED = 1

var cols, rows
let z_off = 0
let particles = []

function setup(){
  frameRate(FPS)
  createCanvas(1200, 800)
  cols = floor(width/SCALE) + 1
  rows = floor(height/SCALE) + 1

  for (let i = 0; i < PARTICLE_AMOUNT; i++) {
    particles.push(new Particle(SCALE, i, PARTICLE_AMOUNT, MAX_SPEED))    
  }
  // noLoop()

  capturer = new CCapture({ format: 'png', framerate: FPS}) 

  noiseSeed(1)
  // background(57, 106, 247, 180)
  background(40, 76, 173)
}

function draw(){
  // print(frameCount)

  if(CAPTURE && frameCount == 1){
    capturer.start()
  }

  if(CAPTURE && frameCount == 2600){
    print("end")
    noLoop()
    capturer.stop()
    capturer.save()
    return
  }

  drawStructure()

  if(CAPTURE){
    capturer.capture(document.getElementById('defaultCanvas0'));
  }
}

function drawStructure() {
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
      v.mag(1)

      // drawNoise(x, y, n)
      // drawForceField(x, y, v)

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
  // stroke(200, 100)
  stroke(200, 255)
  translate(x * SCALE, y * SCALE)
  rotate(v.heading())
  strokeWeight(1)
  line(0, 0, SCALE, 0)
  strokeWeight(3)
  point(0,0)
  pop()
}
