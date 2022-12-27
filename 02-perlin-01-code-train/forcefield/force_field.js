class ForceField{

    z_off = 0

    constructor(rows, cols, scale, force_field_noise_scale, noise_increment, z_noise_increment){
        this.rows = rows
        this.cols = cols
        this.scale = scale

        this.force_field_noise_scale = force_field_noise_scale
        this.noise_increment = noise_increment
        this.z_noise_increment = z_noise_increment
    }

    update() {
        let noise_field = new Array(this.rows)
        let force_field = new Array(this.rows)

        let y_off = 0
        for (let y = 0; y < rows; y++) {
            noise_field[y] = new Array(this.cols)
            force_field[y] = new Array(this.cols)

            let x_off = 0
            for (let x = 0; x < this.cols; x++) {
                let n = noise(x_off, y_off, this.z_off)
                let angle =  n * TWO_PI * this.force_field_noise_scale
                let v = p5.Vector.fromAngle(angle)
                v.mag(1)

                noise_field[y][x] = n
                force_field[y][x] = v
                x_off += this.noise_increment
            }
            y_off += this.noise_increment
            this.z_off += this.z_noise_increment
        }

        this.force_field = force_field
        this.noise_field = noise_field
    }

    getForceField(){
        return this.force_field
    }


}