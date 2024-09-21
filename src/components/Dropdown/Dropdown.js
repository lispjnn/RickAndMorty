import React from 'react';
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

