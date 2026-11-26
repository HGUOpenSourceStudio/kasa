import { Component } from 'react';
import logo from '../../assets/img/logo-white.svg';
import './Footer.scss';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        return (
            <footer className="App-footer">
                <div className="App-footer-logo">
                    <img className="logo" src={logo} alt="Homez" />
                </div>
                <div className="App-footer-description">
                    <p>© 2026 구해줘 홈즈 · Based on Kasa (MIT)</p>
                </div>
            </footer>
        );
    }
}

export default Footer;
