class Drawer{

    constructor(rows, cols, scale, force_field_noise_scale, noise_increment, z_noise_increment, particle_amount, max_speed){
        this.force_field = this._createForceField(rows, cols, scale, force_field_noise_scale, noise_increment, z_noise_increment)
        this.particles = new Particles(this.force_field, particle_amount, scale, max_speed)
    }

    _createForceField(rows, cols, scale, force_field_noise_scale, noise_increment, z_noise_increment){
        return new ForceField(rows, cols, scale, force_field_noise_scale, noise_increment, z_noise_increment)
    }

    draw(second, frame){
        this.force_field.update()
        this.particles.updateAndDraw(1, 5)
    
        if(second == 48){
            return false
        }

        return true
    }

}