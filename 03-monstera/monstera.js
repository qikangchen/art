class Monstera{
  constructor(x, y, canvas_size){
    this.x = x
    this.y = y
    this.canvas_size = canvas_size
  }

  draw(){

    push()

    let rotation_y = HALF_PI * 0.9 * this.x / (this.canvas_size/2)
    print(rotation_y)
    translate(this.x, this.y, 0)
    rotateY(rotation_y)
    // rotateY(HALF_PI)

    stroke(0, 150, 0)
    strokeWeight(4)
    fill(50, 220, 100)

    let path_creator = new PathCreator(0, 0)
    beginShape()
        // vertex(this.x, this.y)
        vertex(0, 0)
        path_creator.createVertexBrokenTangent(-5, -40, 10, 20, -10, 0)
        path_creator.createVertex(-50+random(-10,10), -50, 30, -10)
        path_creator.createVertex(-80+random(-10,10), 20, 5, -40)
        path_creator.createVertex(-30+random(-10,10), 85, -20, -10)
        path_creator.createVertex(0, 100, -5, -10)

        path_creator.createVertexBrokenTangent(30, 85, -15, 10, 5, -10)
        path_creator.createVertex(70+random(-10,10), 20, -5, 40)
        path_creator.createVertex(50+random(-10,10), -50, 30, 10)
        path_creator.createVertex(10, -40, 10, -20)
        path_creator.createVertex(0, 0, 10, 0)

    endShape()

    beginShape()
      vertex(0, 0)
      quadraticVertex(
        5, 0,
        0, 100
    )
    endShape()

    pop()
  }

}
