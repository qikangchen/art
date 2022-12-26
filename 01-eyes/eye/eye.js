class Eye{

  SPEED = 4
  SHIFT = 0.5

  EYE_SIZE = 50
  EYE_CLOSING_MIN = 0.2
  EYE_CLOSING_MAX = 0.7

  constructor(x_index, y_index){
    this.x_index = x_index
    this.y_index = y_index
  }

  update(){
    let t_delta = this.SHIFT * (this.x_index + this.y_index)
    this.theta = this.SPEED * frameCount * (1/FPS) + t_delta

    let margin = this.EYE_SIZE
    let gap = this.EYE_SIZE/10
    this.x = margin + this.x_index * (this.EYE_SIZE + gap)
    this.y = margin + this.y_index * (this.EYE_SIZE + gap) 

    this.x_position = this.x - (this.radius1 - this.radius2) * cos(this.theta)
    this.y_position = this.y - (this.radius1 - this.radius2) * sin(this.theta)

    this.radius1 = this.EYE_SIZE/2
    this.radius2 = this.EYE_SIZE/2 * 0.6
    this.radius3 = map(cos(this.theta), -1, 1, this.radius2*0.7, this.radius2*0.3)
  }

  drawEyeBall() {
    stroke(0)
    fill(200)
    strokeWeight(2)
    circle(this.x, this.y, this.radius1 * 2)
  }

  drawPupil() {
    fill(0, 0)
    strokeWeight(2)
    circle(this.x_position, this.y_position, this.radius2 * 2)

    fill(0, 0, 0, 255)
    circle(this.x_position, this.y_position, this.radius3 * 2)
  }

  drawEyeLid() {
    let eye_opening = map(cos(this.theta), -1, 1, this.EYE_CLOSING_MIN, this.EYE_CLOSING_MAX)
    let ellipse_accuracy = 0.1

    strokeWeight(0)
    stroke(0)
    fill(0)
    this._drawUpperEyeLid(this.x, this.y, this.radius1, eye_opening, ellipse_accuracy)
    this._drawLowerEyeLid(this.x, this.y, this.radius1, eye_opening, ellipse_accuracy)
  }

  _drawUpperEyeLid(x, y, radius1, eye_opening, ellipse_accuracy) {
    beginShape()
    for (let t = 0; t < PI; t += ellipse_accuracy) {
      let xe = cos(t) * radius1 + x
      let ye = -sin(t) * radius1 + y
      vertex(xe, ye)
    }
    for (let t = PI; t > 0; t -= ellipse_accuracy) {
      let xe = cos(t) * radius1 + x
      let ye = -sin(t) * (radius1 - radius1 * eye_opening) + y
      vertex(xe, ye)
    }
    endShape()
  }

  _drawLowerEyeLid(x, y, radius1, eye_opening, ellipse_accuracy) {
    beginShape()
    for (let t = 0; t < PI; t += ellipse_accuracy) {
      let xe = cos(t) * radius1 + x
      let ye = sin(t) * radius1 + y
      vertex(xe, ye)
    }
    for (let t = PI; t > 0; t -= ellipse_accuracy) {
      let xe = cos(t) * radius1 + x
      let ye = sin(t) * (radius1 - radius1 * eye_opening) + y
      vertex(xe, ye)
    }
    endShape()
  }
}