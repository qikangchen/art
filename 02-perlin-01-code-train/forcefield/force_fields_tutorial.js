class ForceFieldTutorial extends ForceField{

    constructor(rows, cols, scale, force_field_noise_scale, noise_increment, z_noise_increment){
        super(rows, cols, scale, force_field_noise_scale, noise_increment, z_noise_increment)
    }

    drawField(){
        strokeWeight(1)
        fill(100)
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                rect(x*this.scale, y*this.scale, this.scale, this.scale)
            }
        }
    }

    drawNoise(){
        strokeWeight(1)
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                fill(this.noise_field[y][x]*255)
                rect(x*this.scale, y*this.scale, this.scale, this.scale)
            }
        }
    }

    drawForceField() {
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let v = this.force_field[y][x]
                push()
                stroke(200, 150)
                strokeWeight(2)
                translate(x * this.scale, y * this.scale)
                rotate(v.heading())
                line(0, 0, this.scale, 0)
                pop()
            }
        }
    }

}