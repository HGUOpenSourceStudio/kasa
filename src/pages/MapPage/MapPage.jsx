import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import './MapPage.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import RegionFilter from '../../components/RegionFilter/RegionFilter';
import { formatPrice, useZoneFilter } from '../../utils/rooms';

// CRA 번들에서는 기본 마커 이미지 경로가 깨지므로 직접 지정한다.
const icon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

function MapPage() {
    const { selectedZones, setSelectedZones, filteredRooms } = useZoneFilter();
    const bounds = filteredRooms.map((room) => [room.lat, room.lng]);

    return (
        <div className="App-page">
            <header>
                <Navbar />
            </header>
            <main>
                <div className="map-toolbar">
                    <RegionFilter selectedZones={selectedZones} onChange={setSelectedZones} />
                    <Link to={{ pathname: '/', search: selectedZones.map((z) => `zone=${encodeURIComponent(z)}`).join('&') }}>목록으로</Link>
                </div>
                <p className="map-count">{filteredRooms.length}개의 방 · 위치는 예시 좌표입니다</p>
                {/* key: 필터가 바뀌면 선택한 방들이 모두 보이도록 지도를 다시 맞춘다. */}
                <MapContainer key={selectedZones.join()} className="room-map" bounds={bounds} boundsOptions={{ padding: [40, 40] }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {filteredRooms.map((room) => (
                        <Marker key={room.id} position={[room.lat, room.lng]} icon={icon} title={room.title}>
                            <Popup>
                                <strong>{room.title}</strong>
                                <br />
                                {formatPrice(room)}
                                <br />
                                <Link to={`/lodgement/${room.id}`}>상세 보기 →</Link>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </main>
            <Footer />
        </div>
    );
}

export default MapPage;
