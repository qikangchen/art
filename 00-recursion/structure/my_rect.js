class MyRect{
    
    PHASE_1_LENGTH = 0.4
    PHASE_2_LENGTH = 0.4

    constructor(x, y, size, corner_type){
        this.x = x
        this.y = y
        this.size = size
        this.corner_type = corner_type
    }

    draw(heartbeat, is_animated){

        if(is_animated && this.corner_type != undefined){
            this.animate(heartbeat)
        }else{
            rect(this.x, this.y, this.size, this.size)
        }

    }

    animate(heartbeat) {
        let progress = heartbeat.getStepIndex() / heartbeat.getMaxStepAmount()

        if (this.isPhase1(progress)) {
            let growth = progress * (1/this.PHASE_1_LENGTH) * this.size

            if (this.corner_type == CORNER_TYPE.TOP_LEFT) {
                line(this.x, this.y, this.x + growth, this.y)
                line(this.x, this.y, this.x, this.y + growth)
            }else if (this.corner_type == CORNER_TYPE.TOP_RIGHT) {
                line(this.x + this.size, this.y, this.x + this.size - growth, this.y)
                line(this.x + this.size, this.y, this.x + this.size, this.y + growth)
            }else if (this.corner_type == CORNER_TYPE.BOTTOM_LEFT) {
                line(this.x, this.y + this.size, this.x, this.y + this.size - growth)
                line(this.x, this.y + this.size, this.x + growth, this.y + this.size)
            }else if (this.corner_type == CORNER_TYPE.BOTTOM_RIGHT) {
                line(this.x + this.size, this.y + this.size, this.x + this.size - growth, this.y + this.size)
                line(this.x + this.size, this.y + this.size, this.x + this.size, this.y + this.size - growth)
            }
        }else if(this.isPhase2(progress)){
            let growth = (progress - this.PHASE_1_LENGTH) * (1/this.PHASE_2_LENGTH) * this.size

            if (this.corner_type == CORNER_TYPE.TOP_LEFT) {
                line(this.x, this.y, this.x + this.size, this.y)
                line(this.x, this.y, this.x, this.y + this.size)

                line(this.x + this.size, this.y, this.x + this.size, this.y + growth)
                line(this.x, this.y + this.size, this.x + growth, this.y + this.size)
            }else if (this.corner_type == CORNER_TYPE.TOP_RIGHT) {
                line(this.x + this.size, this.y, this.x, this.y)
                line(this.x + this.size, this.y, this.x + this.size, this.y + this.size)

                line(this.x, this.y, this.x, this.y + growth)
                line(this.x + this.size, this.y + this.size, this.x + this.size - growth, this.y + this.size)
            }else if (this.corner_type == CORNER_TYPE.BOTTOM_LEFT) {
                line(this.x, this.y + this.size, this.x, this.y)
                line(this.x, this.y + this.size, this.x + this.size, this.y + this.size)

                line(this.x, this.y, this.x + growth, this.y)
                line(this.x + this.size, this.y + this.size, this.x + this.size, this.y + this.size - growth)
            }else if (this.corner_type == CORNER_TYPE.BOTTOM_RIGHT) {
                line(this.x + this.size, this.y + this.size, this.x, this.y + this.size)
                line(this.x + this.size, this.y + this.size, this.x + this.size, this.y)

                let growth = (progress - 0.5) * 2 * this.size
                line(this.x, this.y + this.size, this.x, this.y + this.size - growth)
                line(this.x + this.size, this.y, this.x + this.size - growth, this.y)
            }
        }else{
            rect(this.x, this.y, this.size, this.size)
        }
   }

    isPhase1(progress) {
        return progress <= this.PHASE_1_LENGTH
    }
    isPhase2(progress){
        return progress <= this.PHASE_1_LENGTH + this.PHASE_2_LENGTH
    }
}