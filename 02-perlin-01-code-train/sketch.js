const CAPTURE = false
const FPS = 60
const SCALE = 10

const NOISE_INCREMENT = 0.1
const Z_NOISE_INCREMENT = 0.0003
const FORCE_FIELD_NOISE_SCALE = 4

const PARTICLE_AMOUNT = 300
const MAX_SPEED = 4

let font
let particles
let drawer

function preload(){
  font = loadFont('../fonts/SourceSansPro-Regular.ttf')
}

function setup(){
  frameRate(FPS)
  createCanvas(600, 600)
  cols = floor(width/SCALE) + 1
  rows = floor(height/SCALE) + 1

  drawer = new Drawer(rows, cols, SCALE, FORCE_FIELD_NOISE_SCALE, NOISE_INCREMENT, Z_NOISE_INCREMENT, PARTICLE_AMOUNT, MAX_SPEED)
  // drawer = new DrawerTutorial(rows, cols, SCALE, FORCE_FIELD_NOISE_SCALE, NOISE_INCREMENT, Z_NOISE_INCREMENT, PARTICLE_AMOUNT, MAX_SPEED, font)

  if(CAPTURE){
    capturer = new CCapture({ format: 'png', framerate: FPS, verbose:true }) 
  }

  noiseSeed(0)
  background(0)

  // noLoop()
}

function draw(){
  if(CAPTURE && frameCount == 1){
    capturer.start()
  }

  let second = floor(frameCount/FPS)
  let frame = frameCount % FPS
  // print(second, frame)
  let keep_going = drawer.draw(second, frame)

  if(keep_going == false){
    if(CAPTURE){
      noLoop()
      capturer.stop()
      capturer.save()
    }
    noLoop()
  }

  if(CAPTURE){
    capturer.capture(document.getElementById('defaultCanvas0'));
  }
}