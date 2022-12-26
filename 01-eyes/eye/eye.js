class Eye{

  SPEED = 10
  SHIFT = 0.5

  EYE_SIZE = 50
  EYE_CLOSING_MIN = 0.2
  EYE_CLOSING_MAX = 0.8

  constructor(x_index, y_index){
    this.x_index = x_index
    this.y_index = y_index
  }

  draw(){
    let t_delta = this.SHIFT * (this.x_index + this.y_index)
    let theta = this.SPEED * frameCount * (1/FPS) + t_delta

    let margin = this.EYE_SIZE
    let gap = this.EYE_SIZE/10
    let x = margin + this.x_index * (this.EYE_SIZE + gap)
    let y = margin + this.y_index * (this.EYE_SIZE + gap) 

    let radius1 = this.EYE_SIZE/2
    let radius2 = this.EYE_SIZE/2 * 0.6
    let radius3 = map(cos(theta), -1, 1, radius2*0.7, radius2*0.2)

    this.drawEyeBall(x, y, radius1)
    this.drawPupil(x, y, radius1, radius2, radius3, theta)
    this.drawEyeLid(x, y, radius1, theta)
  }

  drawEyeBall(x, y, radius1) {
    stroke(0)
    fill(200)
    strokeWeight(2)
    circle(x, y, radius1 * 2)
  }

  drawPupil(x, y, radius1, radius2, radius3, theta) {
    let x_position = x - (radius1 - radius2) * cos(theta)
    let y_position = y - (radius1 - radius2) * sin(theta)

    fill(0, 0)
    strokeWeight(2)
    circle(x_position, y_position, radius2 * 2)

    fill(0)
    circle(x_position, y_position, radius3 * 2)
  }

  drawEyeLid(x, y, radius1, theta) {
    let eye_opening = map(cos(theta), -1, 1, this.EYE_CLOSING_MIN, this.EYE_CLOSING_MAX)
    let ellipse_accuracy = 0.1

    strokeWeight(0)
    stroke(0)
    fill(0)
    this.drawUpperEyeLid(x, y, radius1, eye_opening, ellipse_accuracy)
    this.drawLowerEyeLid(x, y, radius1, eye_opening, ellipse_accuracy)
  }

  drawUpperEyeLid(x, y, radius1, eye_opening, ellipse_accuracy) {
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

  drawLowerEyeLid(x, y, radius1, eye_opening, ellipse_accuracy) {
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