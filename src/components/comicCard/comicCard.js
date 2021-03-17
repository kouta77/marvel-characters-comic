import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './ComicStyle.css';

const ComicCard = props => {
    const [liked, setLiked] = useState(false);

    const toggleLike = like => {
        setLiked(like);
        
        if(like)
            localStorage.setItem(props.id, props.id);
        else
            localStorage.removeItem(props.id);
    }

    useEffect(()=>{
        if(localStorage.getItem(props.id)) setLiked(true);
    }, [])

    return (
        <div className="col-lg-3 col-md-6 col-sm-12g">
            <div className="card comic-card-extra" style={{
                        marginRight:'25px',
                        marginLeft:'2px',
                        backgroundImage: `url(${props.image})`,
                        marginBottom: '50px',
                        height: '350px',
                        // maxWidth: '230px',
                        borderRadius: '10px 10px 10px 10px',
                        overflow: 'hidden',
                        border: '0px',
                        backgroundRepeat: 'no-repeat',
                    }} >
                    <div className="gradient" style={{color:'white'}}>  
                    <Link style={{
                                    textDecoration:'none',
                                    width: '100%',
                                    height: '100%',
                                }}
                                to="/comic-info"
                                onClick={props.onClick}
                     >

                    <div style={{height:'70%', justifyContent:'flex-start'}} /> 
                    </Link>

                        { !props.noLike?
                            <div style={{padding: '10px'}}>


                            <div style={{padding: '5px', justifyContent: 'flex-end'}} className="character-card-body">
                                <h6 className="text-truncate">{props.name}</h6>                        
                            </div>

                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                <p className="card-subtitle text-muted" >Issue #: {props.issueNumber? props.issueNumber : '--' }</p>
                                <button
                                    aria-label="Bookmark-comic"
                                    className="btn"
                                    onClick={()=> toggleLike(!liked)}>
                                    {
                                    liked?
                                    <i className="fas fa-bookmark" style={{color: 'red'}}></i> :
                                    <i className="far fa-bookmark" style={{color: 'red'}}></i>
                                    }
                                </button>
                            </div> </div>:
                            <div>
                                <h6 className="card-title" >{props.name}</h6>
                            </div>
                            }
                    </div>
                </div>
            </div>
    )
}

export default ComicCard;

