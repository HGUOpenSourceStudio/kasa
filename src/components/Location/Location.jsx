import { Link } from 'react-router-dom';
import './Location.scss';
import './Location.css';
import { formatPrice } from '../../utils/rooms';

function Location({ logement }) {
    return (
        <Link className="App-main-location" style={{ backgroundImage: `url(${logement.cover})` }} to={`/lodgement/${logement.id}`}>
            <div className="App-main-location-overlay"></div>
            <div className="location-info">
                <h2>{logement.title}</h2>
                <p>{formatPrice(logement)}</p>
            </div>
        </Link>
    );
}

export default Location;
