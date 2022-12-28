class Connection{

    constructor(x1, y1, x2, y2){
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
    }

    draw(heartbeat, is_animated){

        let x_delta = this.x2-this.x1
        let y_delta = this.y2-this.y1

        let progress = 1
        if(is_animated){
            progress = heartbeat.getStepIndex()/heartbeat.getMaxStepAmount()
        }

        line(
            this.x1,
            this.y1,
            this.x1 + progress*x_delta,
            this.y1 + progress*y_delta
        )
    }


}