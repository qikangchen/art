class Particle{

    colors = [
        [255, 182, 92],
        [214, 95, 71],
        [235, 66, 188],
        [121, 49, 212],
        [57, 106, 247],
    ]
    
    constructor(scale, index, particle_amount, max_speed){
        this.scale = scale

        let y_min = 0.1
        let y_max = 0.8
        let y = map(index, 0, particle_amount, y_min, y_max) 

        let mapping = map(y, y_min, y_max, 0, 1)
        if(mapping < 0.5){
            this.color = this.colors[0]
        }else{
            this.color = this.colors[1]
        }

        if(mapping < 0.02){
            this.color = this.colors[2]
            this.opacity = 20
        }else if(mapping > 0.98){
            this.color = this.colors[2]
            this.opacity = 20
        }else{
            this.opacity = 6
        }

        this.pos = createVector(width, y*height)
        this.pos_prev = this.pos.copy()

        this.max_speed = max_speed
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
        stroke(this.color[0], this.color[1], this.color[2], this.opacity)
        strokeWeight(2)
        line(this.pos_prev.x, this.pos_prev.y, this.pos.x, this.pos.y)
        // point(this.pos.x, this.pos.y)
    }

}