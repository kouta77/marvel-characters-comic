import React from 'react';
import './style.css';

class PopUp extends React.Component {
    constructor(props){
        super(props)
    }

    render () {
        return (
        <>
        </>)
    //     const {title, children, isDark, image} = this.props;
    //     let textColor = isDark? 'text-light' : 'text-dark';
    //     let bgColor = isDark? 'bg-dark' : 'bg-light';

    //     return(
    //         <div className='popup-full-screen'>
    //             <div className={'box ' + bgColor}>
    //                 <div className={'container top-content ' + textColor}>
    //                     <div className='container'>
    //                         <div className='popup-character-avatar' style={{backgroundImage: `url(${image})` }} />
    //                         <h3 style={{ top: '-40px', position: 'relative'}}>{title.toUpperCase()}</h3>
    //                     </div>
    //                     <p className='popup-description-text'>{`Bio:\n\nLorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.`}</p>
                        
    //                     <button className='btn text-danger' style={{alignSelf:'flex-start'}} onClick={ () => this.props.togglePopUp(false)} ><i className="fas fa-times" ></i></button>
    //                 </div>

    //                 <div className={'popup-content-body ' + textColor}>
    //                     <div className="bg-dark popup-footer" style={{width: '100%', position: 'relative'}}>
    //                         {children}
    //                     </div>
                        
    //                 </div>
    //             </div>
    //         </div>
    //     )
    }
}

export default PopUp;