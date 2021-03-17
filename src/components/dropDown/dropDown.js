import React from 'react';

const DropDown = ({title,currentValue, selectedCallback, items, isDark}) => {
    let skinTone = 'btn-light';
    
    if(isDark)
        skinTone = 'btn-dark';
    return (                        
    <div className="dropdown">
        <button className={"btn dropdown-toggle text-danger " + skinTone}
            id="OrderByMenu"
            aria-label="dropdown-item"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            {title}: { currentValue }
        </button>

        <ul className="dropdown-menu scrollable-menu" aria-labelledby="OrderByMenu">
            {items.map(item => {
            return (
                <li key={item.id}>
                    <button aria-label="dropdown-item" className="dropdown-item" onClick= { () => selectedCallback(item.name) } >
                    {item.name}
                    </button>
                </li> 
            )})}
        </ul>
    </div>
    )
}

export default DropDown;