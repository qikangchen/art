class Particles{

    constructor(force_field, particle_amount, scale, max_speed){
        this.force_field = force_field

        this.particles = []
        for (let i = 0; i < particle_amount; i++) {
            this.particles.push(new Particle(scale, max_speed))    
        }
    }

    updateAndDraw(stroke_weight, alpha){
        for (let i = 0; i < this.particles.length; i++) {
          let particle = this.particles[i]
          particle.applyForceField(this.force_field.getForceField())
          particle.update()
          particle.draw(stroke_weight, alpha)
        }
    }
}