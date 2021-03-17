import React, {useState} from 'react';
import './ComicStyle.css';

const ComicImage = props => {

    return (
        <div className="card comic-card-padding" style={{backgroundImage: `url(${props.image})` }}>

        <div className="gradient" >
            <div className="comic-card-body" >
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                </div>
            </div>
        </div>

        </div>
    )
}

export default ComicImage;