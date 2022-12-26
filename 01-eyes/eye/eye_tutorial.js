class EyeTutorial extends Eye{

  constructor(x_index, y_index){
    super(x_index, y_index)
  }


  drawOrbit1() {
    push()
    fill(0, 0)
    stroke(0, 0, 0, 100)
    strokeWeight(2)
    circle(this.x, this.y, this.radius1 * 2)
    pop()
  }

  drawOrbit1BallSamePace(){
    this.theta = this.SPEED * frameCount * (1/FPS) 
    let x_position = this.x - this.radius1 * cos(this.theta)
    let y_position = this.y - this.radius1 * sin(this.theta)
    
    push()
    stroke(0, 0, 0)
    strokeWeight(11)
    point(x_position, y_position)
    pop()

  }

  drawOrbit1Ball(){
    let x_position = this.x - this.radius1 * cos(this.theta)
    let y_position = this.y - this.radius1 * sin(this.theta)

    push()
    stroke(0, 0, 0)
    strokeWeight(11)
    point(x_position, y_position)
    pop()
  }

  drawOrbit2Ball() {
    push()
    stroke(0, 0, 0)
    strokeWeight(8)
    point(this.x_position, this.y_position)
    pop()
  }

  drawPupilOuterFrame() {

    fill(0, 0)
    strokeWeight(2)
    circle(this.x_position, this.y_position, this.radius2 * 2)
  }
  
  drawEyeLidStatic() {
    let eye_opening = 0.4
    let ellipse_accuracy = 0.1

    strokeWeight(0)
    stroke(0)
    fill(0)
    this._drawUpperEyeLid(this.x, this.y, this.radius1, eye_opening, ellipse_accuracy)
    this._drawLowerEyeLid(this.x, this.y, this.radius1, eye_opening, ellipse_accuracy)
  }
}