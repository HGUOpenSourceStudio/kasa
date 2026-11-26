import { useSearchParams } from 'react-router-dom';
import rooms from '../assets/data/logements.json';

export const ZONES = [...new Set(rooms.map((room) => room.zone))];

export const formatPrice = (room) => `보증금 ${room.deposit} / 월세 ${room.monthlyRent}`;

// 선택한 권역을 URL(?zone=)에 저장한다. 선택이 없으면 전체를 보여준다.
export function useZoneFilter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedZones = searchParams.getAll('zone').filter((zone) => ZONES.includes(zone));

    const setSelectedZones = (zones) => {
        setSearchParams(zones.map((zone) => ['zone', zone]), { replace: true });
    };

    const filteredRooms = selectedZones.length
        ? rooms.filter((room) => selectedZones.includes(room.zone))
        : rooms;

    return { selectedZones, setSelectedZones, filteredRooms };
}
