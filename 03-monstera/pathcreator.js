class PathCreator{

    constructor(x, y){
        this.x = x
        this.y = y

        this.#setPrev(0, 0, 0, 0)
    }

    #setPrev(x, y, tangent_x, tangent_y){
        this.prev = {
            x: x,
            y: y,
            tangent: {
                x: tangent_x,
                y: tangent_y,
            }
        }
    }


    #set(x, y, tangent_x, tangent_y){

        if(this.current != undefined){
            this.#setPrev(
                this.current.x,
                this.current.y,
                this.current.tangent.x,
                this.current.tangent.y
            )
        }

        this.current = {
            x: x,
            y: y,
            tangent: {
                x: tangent_x,
                y: tangent_y,
            }
        }
    }

    createVertex(x, y, tangent_x, tangent_y){
        this.#set(x, y, tangent_x, tangent_y)

        let tangent = this.#createMirrorTangent()
        this.#createVertex(tangent)
    }

    createVertexBrokenTangent(x, y, tangent2_x, tangent2_y, tangent1_x, tangent1_y){
        this.#set(x, y, tangent2_x, tangent2_y)

        let tangent = {
            x: tangent1_x, 
            y: tangent1_y
        }
        this.#createVertex(tangent)
    }


    #createVertex(tangent1){
        let tangent2 = this.current.tangent

        let c1x = this.x + this.prev.x + tangent1.x
        let c1y = this.y + this.prev.y + tangent1.y

        let c2x = this.x + this.current.x + tangent2.x
        let c2y = this.y + this.current.y + tangent2.y

        let x = this.x + this.current.x
        let y = this.y + this.current.y
        // print(tangent1)
        // print(tangent2)

        // print(
        //     "prev: ", this.prev,
        //     "\ncurrent: ", this.current,
        //     "\nc1: ", c1x, c1y,
        //     "\nc1: ", tangent1.x, tangent1.y,
        //     "\nc2: ", c2x, c2y, 
        //     "\nc2: ", tangent2.x, tangent2.y, 
        //     "\nxy: ", x, y
        // )
        return bezierVertex(
            c1x, c1y,
            c2x, c2y, 
            x, y
            // this.x+tangent1.x, this.y+tangent1.y,
            // this.x+x+tangent2.x, this.y+y+tangent2.y,
            // this.x+x, this.y+y,
        )
    }

    #createMirrorTangent(){
        return {
            x: -this.prev.tangent.x,
            y: -this.prev.tangent.y
        }
    }


}