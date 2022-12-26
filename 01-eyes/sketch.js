const CAPTURE = false
const AMOUNT_ROOT = 17
const FPS = 60

let eye_matrix
let capturer

function setup() {
  frameRate(FPS)
  createCanvas(980, 980)

  if(CAPTURE){
    capturer = new CCapture({ format: 'png', framerate: FPS, verbose:true }) 
  }

  // eye_matrix = new EyeMatrixTutorial()
  eye_matrix = new EyeMatrix()
}

function draw(){
  if(CAPTURE & frameCount == 1){
    capturer.start()
    print("start")
  }
  // if(CAPTURE & frameCount == FPS*10){
  if(CAPTURE & frameCount == 565){
    print("end")
    noLoop()
    capturer.stop()
    capturer.save()
    return
  }

  drawEyes()

  if(CAPTURE){
    capturer.capture(document.getElementById('defaultCanvas0'));
  }
}

function drawEyes(){
  background(100)
  let second = floor(frameCount/FPS)
  // print(second, frameCount)
  eye_matrix.draw(second)
}