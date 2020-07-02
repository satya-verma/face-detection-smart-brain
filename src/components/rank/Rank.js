import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div className="tc">
            <p className="f3 mt0 white">{`${name} Your Image Count Is`}</p>
            <p className="f2 mt0 mb0 white">{entries}</p>
        </div>
    );
}

export default Rank;