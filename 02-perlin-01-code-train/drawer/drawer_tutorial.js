class DrawerTutorial extends Drawer{

    constructor(rows, cols, scale, force_field_noise_scale, noise_increment, z_noise_increment, particle_amount, max_speed, font){
        super(rows, cols, scale, force_field_noise_scale, noise_increment, z_noise_increment, particle_amount, max_speed)

        this.font = font
        textFont(this.font)
        textStyle(BOLD)
        textSize(25)

        this.render_background_once = false
        this.times = this.createTimeIntervals()
    }

    createTimeIntervals() {
        let v = Object.values(this.TIMES)
        let current_time = 0
        let times = []
        for (let i = 0; i < v.length; i++) {
            let t = v[i]
            current_time += t
            times.push(current_time)
        }
        
        return times
    }

    _createForceField(rows, cols, scale, force_field_noise_scale, noise_increment, z_noise_increment){
        return new ForceFieldTutorial(rows, cols, scale, force_field_noise_scale, noise_increment, z_noise_increment)
    }

    drawText(content){
        textAlign(CENTER)
        // strokeWeight(10)
        let bbox = this.font.textBounds(content, width*0.5, height*0.18, 25)
        fill(255)
        stroke(255)
        strokeWeight(15)
        rect(bbox.x, bbox.y, bbox.w, bbox.h)
        fill(0)
        text(content, width*0.5, height*0.18)

    }


    TIMES = {
        0: 2,
        1: 6,
        2: 6,
        3: 6,
        4: 6,
        5: 10,
    }

    draw(second, frame){
        this.force_field.update()

        if(second < this.times[0]){
            this.force_field.drawField()
            this.drawText('First we create a grid')
        }else if(second<this.times[1]){
            this.force_field.drawNoise()
            this.drawText('Then we fill the grid with "smooth" noise')
        }else if(second < this.times[2]){
            background(0)
            this.force_field.drawForceField()
            this.drawText('Map the the brightness to vectors\nto create a force field')
        }else if(second < this.times[3]){
            background(0)
            this.force_field.drawForceField()
            this.particles.updateAndDraw(5, 255)
            this.drawText('Place particles in this force field\nThey will follow the force')
        }else if(second < this.times[4]){
            background(0)
            this.particles.updateAndDraw(5, 255)
            this.drawText('Don\'t draw the force field anymore')
        }else if(second < this.times[5]){
            if(frame == 0 && !this.render_background_once){
                background(0)
                this.render_background_once = true
            }
            this.particles.updateAndDraw(1, 10)
            this.drawText('Particles will draw on the background')
        }else{
            return false
        }

        return true
    }
}