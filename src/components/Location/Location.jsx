import { Link } from 'react-router-dom';
import './Location.scss';
import './Location.css';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { formatPrice } from '../../utils/rooms';

// room-N.jpg가 있으면 그 사진을, 없으면 아래 겹의 기본 그림을 보여준다.
export const roomBackground = (room) => {
    const n = room.cover.match(/room-(\d+)/)?.[1];
    return n ? `url(/images/ui/room-${n}.jpg), url(${room.cover})` : `url(${room.cover})`;
};

function Location({ logement, includeFee = false }) {
    return (
        <article className="room-card">
            <Link className="App-main-location" style={{ backgroundImage: roomBackground(logement) }} to={`/lodgement/${logement.id}`}>
                <div className="App-main-location-overlay"></div>
                <span className="badge room-type">{logement.tags[0]}</span>
                <div className="location-info">
                    <h3>{logement.title}</h3>
                    <p>{formatPrice(logement, includeFee)}</p>
                </div>
            </Link>
            <FavoriteButton id={logement.id} title={logement.title} className="room-favorite" />
        </article>
    );
}

export default Location;
