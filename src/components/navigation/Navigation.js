import React from 'react';
import 'tachyons';

const Navigation = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p className="f4 fw7 dim link black pointer underline pa3">Sign Out</p>
        </nav>
    );
}

export default Navigation;