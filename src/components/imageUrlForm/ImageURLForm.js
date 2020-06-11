import React from 'react';
import './ImageUrlForm.css'

const ImageURLForm = () => {
    return (
        <div className="pa3 ">
            <p className="pa1 fw7 f4">{'This Smart Brain will detect faces in your pictures'}</p>
            <div className="shadow-5 pa3 form tc" style={{ margin: '0 20vw' }}>
                <input type="text" placeholder="image-url" className="pa2 w-80  input-reset ba outline-0 tracked bg-white hover-bg-black hover-white " />
                <button type="submit" className="pa2 ph3 bg-purple white outline-0 ba grow ">Detect</button>
            </div>
        </div>
    );
}

export default ImageURLForm;