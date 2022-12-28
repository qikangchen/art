class HeartBeat{

    CYCLE_LENGTH_IN_S = 0.5

    step_index = 0
    cycle_index = 0

    constructor(fps, cycles_amount){
        this.fps = fps
        this.cycles_amount = cycles_amount+cycles_amount-1

        this.cycle_step_amount = this.CYCLE_LENGTH_IN_S*fps
    }

    step(){
        this.step_index++

        if(this.step_index == this.cycle_step_amount){
            this.step_index = 0
            this.cycle_index++

            if(this.cycle_index == this.cycles_amount){
                this.cycle_index = 0 
            }
        }
    }

    getStepIndex(){
        return this.step_index
    }

    getMaxStepAmount(){
        return this.cycle_step_amount
    }

    getCycleIndex(){
        return this.cycle_index
    }
    
    getMaxCycleAmount(){
        return this.cycles_amount
    }
}