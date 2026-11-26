import './Locations.scss';
import Location from '../Location/Location';

function Locations({ rooms }) {
    return (
        <div className="App-main-locations">
            {rooms.map((room) => <Location key={room.id} logement={room} />)}
        </div>
    );
}

export default Locations;
