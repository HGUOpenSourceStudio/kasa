import { useSearchParams } from 'react-router-dom';
import rooms from '../assets/data/logements.json';

export { rooms };
export const ZONES = [...new Set(rooms.map((r) => r.zone))];
export const TYPES = [...new Set(rooms.map((r) => r.tags[0]))];
export const OPTIONS = [...new Set(rooms.flatMap((r) => r.options))];

export const monthlyCost = (room, includeFee) => room.monthlyRent + (includeFee ? room.maintenanceFee : 0);

export const formatPrice = (room, includeFee = false) =>
    `보증금 ${room.deposit} / ${includeFee ? '월세+관리비' : '월세'} ${monthlyCost(room, includeFee)}`;

const positive = (value) => {
    const n = Number(value);
    return Number.isFinite(n) && n > 0 ? n : null;
};

// URL에서 검색 조건을 읽는다. 알 수 없는 값은 무시한다.
export function parseFilters(params) {
    return {
        zones: params.getAll('zone').filter((z) => ZONES.includes(z)),
        type: TYPES.includes(params.get('type')) ? params.get('type') : '',
        maxDeposit: positive(params.get('maxDeposit')),
        maxRent: positive(params.get('maxRent')),
        options: params.getAll('opt').filter((o) => OPTIONS.includes(o)),
        includeFee: params.get('fee') === '1',
    };
}

export function toSearchParams({ zones, type, maxDeposit, maxRent, options, includeFee }) {
    const entries = [
        ...zones.map((z) => ['zone', z]),
        ...(type ? [['type', type]] : []),
        ...(maxDeposit ? [['maxDeposit', String(maxDeposit)]] : []),
        ...(maxRent ? [['maxRent', String(maxRent)]] : []),
        ...options.map((o) => ['opt', o]),
        ...(includeFee ? [['fee', '1']] : []),
    ];
    return new URLSearchParams(entries);
}

export function filterRooms(list, f) {
    return list.filter((r) =>
        (!f.zones.length || f.zones.includes(r.zone))
        && (!f.type || r.tags[0] === f.type)
        && (!f.maxDeposit || r.deposit <= f.maxDeposit)
        && (!f.maxRent || monthlyCost(r, f.includeFee) <= f.maxRent)
        && f.options.every((o) => r.options.includes(o)));
}

export function zoneAverages(zone) {
    const list = rooms.filter((r) => r.zone === zone);
    const avg = (key) => Math.round(list.reduce((sum, r) => sum + r[key], 0) / list.length);
    return { count: list.length, deposit: avg('deposit'), monthlyRent: avg('monthlyRent'), maintenanceFee: avg('maintenanceFee') };
}

export function useRoomFilter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const filters = parseFilters(searchParams);
    const setFilters = (patch) => setSearchParams(toSearchParams({ ...filters, ...patch }), { replace: true });
    const resetFilters = () => setSearchParams({}, { replace: true });
    return {
        filters,
        setFilters,
        resetFilters,
        filteredRooms: filterRooms(rooms, filters),
        query: toSearchParams(filters).toString(),
    };
}
