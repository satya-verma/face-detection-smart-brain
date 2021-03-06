import React from 'react';
import 'tachyons';

const Navigation = ({ onRouteChange }) => {
    return (
        <nav onClick={() => onRouteChange('signin')} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p className="f4 fw7 dim link black pointer underline pa3 ba mr4 mt3">Sign Out</p>
        </nav>
    );
}

export default Navigation;