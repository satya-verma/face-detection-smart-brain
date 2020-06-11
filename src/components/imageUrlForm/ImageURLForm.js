import React from 'react';

const ImageURLForm = () => {
    return (
        <div className="pa3 tc">
            <p className="pa1 fw7 f4 ">{'This Magic Brain will detect faces in your pictures'}</p>
            <input type="text" placeholder="link" className="pa2 w-40  input-reset ba outline-0 tracked br2 bg-white hover-bg-black hover-white " />
            <button type="submit" className="pa2 ph3 ml2 bg-black white outline-0 ba br1 dim ">Submit</button>
        </div>
    );
}

export default ImageURLForm;