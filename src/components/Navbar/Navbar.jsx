import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss';
import './Navbar.css';

import logo from '../../assets/img/logo.svg';
import logoWhite from '../../assets/img/logo-white.svg';
import useScrolled from '../../hooks/useScrolled';
import { useFavorites } from '../../utils/favorites';
import { REPO_URL } from '../../utils/links';

// overlay: 홈에서만 사진 위에 투명하게 올라간다.
function Navbar({ overlay = false }) {
    const [open, setOpen] = useState(false);
    const scrolled = useScrolled();
    const { ids } = useFavorites();
    const clear = overlay && !scrolled && !open;

    return (
        <div className={`site-header ${overlay ? 'overlay' : ''} ${clear ? 'clear' : ''}`}>
            {!(overlay && scrolled) && (
                <div className="top-line">
                    <div className="wrap">
                        <a href={REPO_URL} target="_blank" rel="noreferrer"><i className="fa-brands fa-github" aria-hidden="true"></i> 팀 GitHub</a>
                        <Link to="/about">서비스 소개</Link>
                    </div>
                </div>
            )}
            <nav className="App-nav wrap">
                <Link className="App-nav-logo" to="/">
                    <img className="logo" src={clear ? logoWhite : logo} alt="Homez" />
                </Link>
                <button type="button" className="menu-toggle" aria-expanded={open} aria-label="메뉴" onClick={() => setOpen(!open)}>
                    <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true"></i>
                </button>
                <ul className={`App-nav-list ${open ? 'open' : ''}`}>
                    <li className="App-nav-list-link"><NavLink to="/" end>홈</NavLink></li>
                    <li className="App-nav-list-link"><NavLink to="/map">지도</NavLink></li>
                    <li className="App-nav-list-link"><NavLink to="/about">소개</NavLink></li>
                    <li className="App-nav-list-link">
                        <NavLink to="/favorites"><i className="fa-regular fa-heart" aria-hidden="true"></i> 찜 {ids.length > 0 && <b className="count">{ids.length}</b>}</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
