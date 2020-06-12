import React from 'react';

const FaceRecognition = ({imageSource}) =>{
    return(
        <div className="pa3 ma3 dib shadow-4 tc" >
            <img src={imageSource} alt="img" width='600px' height='auto'/>
        </div>
    );
}

export default FaceRecognition;