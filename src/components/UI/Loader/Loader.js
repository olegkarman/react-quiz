import React from 'react';
import classes from './Loader.css';

const Loader = props => {
    return (
        <div className={classes.Center}>
            <div className={classes.Loader}></div>
        </div>
    )
}

export default Loader;