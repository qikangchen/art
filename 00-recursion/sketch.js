const BACKGROUND_COLOR = (50)
const CANVAS_SIZE = 2620
const FPS = 60    
const DEPTH = 6

let heartbeat
let rectCreator
let capturer

function setup() {
  frameRate(FPS)
  createCanvas(CANVAS_SIZE , CANVAS_SIZE)
  background(BACKGROUND_COLOR)

  heartbeat = new HeartBeat(FPS, DEPTH)
  rectCreator = new RectCreator(DEPTH)

  capturer = new CCapture({ format: 'png', framerate: FPS }) 
  // noLoop()
}

function draw() {
  // if(heartbeat.getCycleIndex() == 0 && heartbeat.getStepIndex() == 0){
  //   print("Start!")
  //   // capturer.start()
  // }

  // if(heartbeat.getCycleIndex() == heartbeat.getMaxCycleAmount()-1 && heartbeat.getStepIndex() == heartbeat.getMaxStepAmount()-1){
  //   noLoop()
  //   print("End!")
  //   capturer.stop()
  //   capturer.save()
  //   return
  // } 

  background(BACKGROUND_COLOR)
  rectCreator.draw(heartbeat)

  heartbeat.step()
  // capturer.capture(document.getElementById('defaultCanvas0'));
}
