import './style.css';

const Footer = () => {
    return (
        <div className="main-footer bg-dark">
            <div style={{display:'flex',justifyContent:'center', alignContent:'center', flexDirection: 'column',}}>
                <h5 className="text-center extra-center">Follow me!</h5>
                <div style={{justifyContent:'center'}}>
                    <i className="fab fa-facebook-square icon text-center"></i> 
                    <i className="fab fa-twitter-square icon"></i>
                </div>
            </div>
            <div style={{justifyContent:'flex-end'}}> 
                {/* <h3>Designed by</h3> */}
                <p style={{marginBottom: '0px', marginTop: '20px'}}> Copyright © 2021 Enmanuel Salcedo - Marvel's APIs</p>
            </div>
            <div>
                {/* EMPTY */}
            </div>
        </div>
    )
}

export default Footer;