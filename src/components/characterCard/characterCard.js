import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import VizSensor from 'react-visibility-sensor';
import './style.css';

const CharacterCard = props => {
    const [liked, setLiked] = useState(false);
    const [img, setImg] = useState();

    const toggleLike = like => {
        console.log(like);
        setLiked(like);
        if(like)
        localStorage.setItem(props.id, props.id);
        else
        localStorage.removeItem(props.id);
    }

    useEffect(()=>{
        if(localStorage.getItem(props.id)) setLiked(true);
    }, [])

    const setVisibleImgage = ( v ) => {
        if(v)
        setImg(props?.image);
    }

    return (
        <div className="col-lg-3 col-md-6 col-sm-12 ">                    
                <div className="card character-card-extra"//card-padding
                    style={{
                        margin: '30px',
                        height: '350px',
                        // minWidth: '200px',
                        backgroundSize: 'cover',
                        borderRadius: '5px 5px 5px 5px',
                        overflow: 'hidden',
                        // boxShadow: '0px 7px 25px rgb(0,0,0,0.4)',
                        border: '0px',
                    }}>
                <Link 
                    style={{
                        display:'flex',
                        textDecoration:'none',
                        width: '100%',
                        height: '140%'
                    }} to="/char-info" onClick={props.onClick}>
                        
                    <VizSensor onChange={ e => setVisibleImgage(e)}>   
                    {
                        props.image?
                        <img className="image-container" src={ img } alt="img" /> : <></>
                    }       
                    </VizSensor>

                    {/* style={{backgroundImage: `url(${props.image})`}} */}
                    </Link>
                    
                    <div className="card-body" style={{ backgroundColor: '#212529'}} >
                        <div style={{padding: '10px', justifyContent: 'flex-end'}} className="character-card-body">
                            <h6 className="card-title">{props.name}</h6>                        
                        </div>
                        
                        <div className="bottom-text"> 
                            <button className="btn" style={{ color: 'white'}} onClick={()=>toggleLike(!liked)} aria-label="Bookmark-item">
                            {
                                liked?
                                <i className="fas fa-bookmark" ></i> :
                                <i className="far fa-bookmark" ></i>
                            }
                            </button>
                            <p className="text-muted comics-text" >comics: {props.comicsCount? props.comicsCount : '--' }</p>
                        </div>
                    </div>
                </div>
            
        </div>
        
    )
}

export default CharacterCard;