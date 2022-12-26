class EyeMatrixTutorial extends EyeMatrix{

    constructor(seconds){
        super()
    }

    createEye(x_index, y_index){
        return new EyeTutorial(x_index, y_index)
    }

    _draw(eye, second){
        if(second < 1){
            eye.drawOrbit1()
        }else if(second < 3){
            eye.drawOrbit1()
            eye.drawOrbit1BallSamePace()
        }else if(second < 5){
            eye.drawOrbit1()
            eye.drawOrbit1Ball()
        }else if(second < 7){
            eye.drawOrbit1Ball()
        }else if(second < 9){
            eye.drawOrbit2Ball()
        }else if(second < 11){
            eye.drawOrbit2Ball()
            eye.drawPupilOuterFrame()
        }else if(second < 13){
            eye.drawEyeBall()
            eye.drawOrbit2Ball()
            eye.drawPupilOuterFrame()
        }else if(second < 15){
            eye.drawEyeBall()
            eye.drawPupil()
        }else if(second < 17){
            eye.drawEyeBall()
            eye.drawPupil()
            eye.drawEyeLidStatic()
        }else{
            eye.drawEyeBall()
            eye.drawPupil()
            eye.drawEyeLid()
        }
    }

}