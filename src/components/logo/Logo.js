import React from 'react';
import Tilt from 'react-tilt';
import brain from '../logo/brain.png'
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt3">
            <Tilt className="Tilt br3 shadow-2" options={{ max: 55 }} style={{ height: 130, width: 140, marginTop: '-100px' }} >
                <div className="Tilt-inner">
                    <img className="pa3" alt='logo' src={brain}/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;