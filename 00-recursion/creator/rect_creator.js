class RectCreator{

    creation = []
    
    constructor(depth){
        this.depth = depth

        for(let i=0; i<depth+depth-1; i++){
            this.creation.push([])
        }

        this.create({
            x: 20, 
            y: 20, 
            size: 900, 
            corner_type: undefined,
            corner_x: undefined,
            corner_y: undefined,
            iteration: depth
        })
    }

    create({x, y, size, corner_type, corner_x, corner_y, iteration}={}){

        if(iteration == 0){
            return
        }

        
        this.addConnection(iteration, corner_type, corner_x, corner_y, x, y, size)
        this.addRect(iteration, x, y, size, corner_type)

        this.addNewRects(size, x, y, iteration)
    }

    addConnection(iteration, corner_type, corner_x, corner_y, x, y, size) {
        let index_connection = (iteration - 1) * 2 + 1
        let c = this.creation[index_connection]

        if (corner_type == CORNER_TYPE.TOP_LEFT) {
            c.push(new Connection(corner_x, corner_y, x, y))
        } else if (corner_type == CORNER_TYPE.TOP_RIGHT) {
            c.push(new Connection(corner_x, corner_y, x + size, y))
        } else if (corner_type == CORNER_TYPE.BOTTOM_LEFT) {
            c.push(new Connection(corner_x, corner_y, x, y + size))
        } else if (corner_type == CORNER_TYPE.BOTTOM_RIGHT) {
            c.push(new Connection(corner_x, corner_y, x + size, y + size))
        }
    }

    addRect(iteration, x, y, size, corner_type) {
        let index_rect = (iteration - 1) * 2
        let my_rect = new MyRect(x, y, size, corner_type)
        this.creation[index_rect].push(my_rect)
    }

    addNewRects(size, x, y, iteration) {
        let new_size = size * 0.4
        let x_offset = 120
        let y_offset = 120
        let gap = size - 20

        this.create({
            x: x + x_offset,
            y: y + y_offset,
            size: new_size,
            corner_type: CORNER_TYPE.TOP_LEFT,
            corner_x: x,
            corner_y: y,
            iteration: iteration - 1
        })
        this.create({
            x: x + x_offset + gap + new_size,
            y: y + y_offset,
            size: new_size,
            corner_type: CORNER_TYPE.TOP_RIGHT,
            corner_x: x + size,
            corner_y: y,
            iteration: iteration - 1
        })
        this.create({
            x: x + x_offset,
            y: y + y_offset + gap + new_size,
            size: new_size,
            corner_type: CORNER_TYPE.BOTTOM_LEFT,
            corner_x: x,
            corner_y: y + size,
            iteration: iteration - 1
        })
        this.create({
            x: x + x_offset + gap + new_size,
            y: y + y_offset + gap + new_size,
            size: new_size,
            corner_type: CORNER_TYPE.BOTTOM_RIGHT,
            corner_x: x + size,
            corner_y: y + size,
            iteration: iteration - 1
        })
    }

    draw(heartbeat){
        fill(0, 0)
        
        let reverse_cycle_index = this.creation.length - heartbeat.cycle_index - 1
        // print(this.creation.length, reverse_cycle_index)
        for(let i=reverse_cycle_index; i<this.creation.length; i++){

            let current_level = this.creation[i]
            let reverse_i = this.creation.length - i - 1

            let stroke_color = 255 - 17*reverse_i
            let stroke_weight = 12 - 1*reverse_i

            stroke(stroke_color)
            strokeWeight(stroke_weight)

            let animate = false
            if(i == reverse_cycle_index){
                animate = true
                // print("animate!")
            }
            current_level.forEach(element => {
                element.draw(heartbeat, animate)
            });
        }
    }

}