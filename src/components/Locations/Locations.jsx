import './Locations.scss';
import Location from '../Location/Location';

function Locations({ rooms, includeFee }) {
    return (
        <div className="App-main-locations">
            {rooms.map((room) => <Location key={room.id} logement={room} includeFee={includeFee} />)}
        </div>
    );
}

export default Locations;
