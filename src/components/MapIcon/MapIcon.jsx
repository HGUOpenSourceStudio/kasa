import { Link, useLocation } from 'react-router-dom';
import './MapIcon.css';

// 현재 필터(?zone=)를 유지한 채 지도 페이지로 이동한다.
function MapIcon() {
    const { search } = useLocation();

    return (
        <Link className="map-icon" to={`/map${search}`}>
            <i className="fa-solid fa-map-location-dot" aria-hidden="true"></i>
            지도
        </Link>
    );
}

export default MapIcon;
