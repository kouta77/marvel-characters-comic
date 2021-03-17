import "./style.css";
import {useState} from 'react';

const NavHeader = () => {
    const [activeButton, setActiveButton] = useState(localStorage.getItem('navitem'));

    const changeButtonActive = tag => {
        localStorage.setItem('navitem', tag);
        setActiveButton(tag);
    }

    return  (
        <nav className="navbar navbar-nopadding navbar-expand-lg fixed-top navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="logo-container">
                    <a className="navbar-brand marvel-logo" href="/">MARVEL</a>
                    <p className="subtitle-text" style={{color: "gray"}}>Database</p>
                </div>

                <button className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navToggle"
                        aria-controls="navToggle"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navToggle">
                    <ul className="navbar-nav mb-2 mb-lg-0" >
                        <li className="nav-item">
                            <a className={
                                (activeButton==='characters')? 'nav-link active' : 'nav-link'}
                                href="/characters"
                                id="chara-button"
                                onClick={ () => changeButtonActive('characters')}>Characters</a>
                        </li>
                        <li className="nav-item">
                            <a className={
                                (activeButton==='comics')? 'nav-link active' : 'nav-link'}
                                href="/comics"
                                id="comics-button"
                                onClick={ () => changeButtonActive('comics')} >Comics</a>
                        </li>
                    </ul>
                </div>

            </div>

                <div className="d-none d-lg-flex user-menu">
                    <p>User</p>
                    <i style={{color: 'white'}} className="fas fa-user"></i>
                </div>
        </nav>
    )
}

export default NavHeader;