class Particle{

    
    constructor(scale, max_speed){
        this.scale = scale
        this.max_speed = max_speed

        this.reset()

        let colors = [
            [255, 182, 92],
            [214, 95, 71],
            [235, 66, 188],
            [121, 49, 212],
            // [57, 106, 247],
        ]
        this.color = random(colors)
    }

    reset(){
        this.pos = createVector(random(width), random(height))
        this.pos_prev = this.pos.copy()

        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)
    }

    applyForceField(force_field){
        let x = floor(this.pos.x / this.scale) 
        let y = floor(this.pos.y / this.scale) 

        let force = force_field[y][x]
        this.acceleration.set(force)
    }

    update(){
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.max_speed)

        this.updatePrevPosition()
        this.pos.add(this.velocity)

        this.edgeRedirection()
    }

    updatePrevPosition(){
        this.pos_prev.x = this.pos.x
        this.pos_prev.y = this.pos.y
    }

    edgeRedirection(){
        if(this.pos.y < 0){
            this.pos.y = height
            this.updatePrevPosition()
        }
        if(this.pos.y > height){
            this.pos.y = 0
            this.updatePrevPosition()
        }
        if(this.pos.x < 0){
            this.pos.x = width
            this.updatePrevPosition()
        }
        if(this.pos.x > width){
            this.pos.x = 0
            this.updatePrevPosition()
        }
    }

    draw(){
        stroke(this.color[0], this.color[1], this.color[2])
        strokeWeight(8)
        line(this.pos_prev.x, this.pos_prev.y, this.pos.x, this.pos.y)
    }

}