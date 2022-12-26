class EyeMatrix{

    constructor(){
        this.eyes = []
        this.#createEyeMatrix() 
    }

    #createEyeMatrix() {
        for (let x_index = 0; x_index < AMOUNT_ROOT; x_index++) {
            for (let y_index = 0; y_index < AMOUNT_ROOT; y_index++) {
                this.eyes.push(this.createEye(x_index, y_index))
            }
        }
    }

    createEye(x_index, y_index){
        return new Eye(x_index, y_index)
    }

    draw(second){
        for (let i = 0; i < AMOUNT_ROOT**2; i++) {
            let eye = this.eyes[i]
            eye.update()

            this._draw(eye, second)
        } 
    }

    _draw(eye, second){
        eye.drawEyeBall()
        eye.drawPupil()
        eye.drawEyeLid()
    }
}
