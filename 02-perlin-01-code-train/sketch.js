FPS = 60
const SCALE = 10

const NOISE_INCREMENT = 0.1
const Z_NOISE_INCREMENT = 0.0003
const FORCE_FIELD_NOISE_SCALE = 4

const PARTICLE_AMOUNT = 300
const MAX_SPEED = 4

var cols, rows
let z_off = 0
let particles = []

function setup(){
  frameRate(FPS)
  createCanvas(600, 600)
  cols = floor(width/SCALE) + 1
  rows = floor(height/SCALE) + 1

  for (let i = 0; i < PARTICLE_AMOUNT; i++) {
    particles.push(new Particle(SCALE, MAX_SPEED))    
  }
  // noLoop()

  noiseSeed(0)
  background(0)
}

function draw(){
  // background(0)

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
