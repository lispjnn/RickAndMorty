import React from 'react';
import PropTypes from 'prop-types';
import './Dropdown.css';

export default function Dropdown({ state, setState, options, icon }){
    return (
        <div className="dropdown">
            <button className="dropdownButton">
                <i className={icon}></i>
            </button>
            <div className="dropdown-content">
                {options.map(option => (
                    <div key={option} onClick={() => setState(option)}>
                        {option}
                    </div>
                ))}
            </div>
        </div>
    )
}

Dropdown.propTypes = {
    state: PropTypes.string.isRequired, 
    setState: PropTypes.func.isRequired, 
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    icon: PropTypes.string.isRequired,
};