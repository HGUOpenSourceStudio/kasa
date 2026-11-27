import { ZONES } from '../../utils/rooms';
import './RegionFilter.css';

function RegionFilter({ selectedZones, onChange }) {
    const toggle = (zone) => {
        onChange(selectedZones.includes(zone)
            ? selectedZones.filter((z) => z !== zone)
            : [...selectedZones, zone]);
    };

    return (
        <fieldset className="region-filter">
            <legend>지역 선택</legend>
            {ZONES.map((zone) => (
                <label key={zone} className={selectedZones.includes(zone) ? 'region-chip checked' : 'region-chip'}>
                    <input type="checkbox" checked={selectedZones.includes(zone)} onChange={() => toggle(zone)} />
                    {zone}
                </label>
            ))}
        </fieldset>
    );
}

export default RegionFilter;
