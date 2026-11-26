import { useState } from 'react';
import './SearchBar.css';
import RegionFilter from '../RegionFilter/RegionFilter';
import { OPTIONS, TYPES } from '../../utils/rooms';

const DEPOSITS = [200, 300, 500, 700, 1000];
const RENTS = [35, 40, 45, 50, 60];

function SearchBar({ filters, onChange, onReset, onSearch, count }) {
    const [advanced, setAdvanced] = useState(filters.options.length > 0);
    const toggleOption = (option) => onChange({
        options: filters.options.includes(option)
            ? filters.options.filter((o) => o !== option)
            : [...filters.options, option],
    });
    const select = (label, key, items, render) => (
        <label className="field">
            <span>{label}</span>
            <select value={filters[key] || ''} onChange={(e) => onChange({ [key]: key === 'type' ? e.target.value : Number(e.target.value) || null })}>
                <option value="">전체</option>
                {/* URL에서 온 목록 밖의 값도 선택 상태로 보여준다. */}
                {[...new Set([...items, ...(filters[key] ? [filters[key]] : [])])].map((v) => <option key={v} value={v}>{render(v)}</option>)}
            </select>
        </label>
    );

    return (
        <form className="search" onSubmit={(e) => { e.preventDefault(); onSearch(); }}>
            <div className="search-zones"><RegionFilter selectedZones={filters.zones} onChange={(zones) => onChange({ zones })} /></div>
            <div className="search-bar">
                {select('종류', 'type', TYPES, (v) => v)}
                {select('보증금 (만원)', 'maxDeposit', DEPOSITS, (v) => `${v} 이하`)}
                {select(filters.includeFee ? '월세+관리비 (만원)' : '월세 (만원)', 'maxRent', RENTS, (v) => `${v} 이하`)}
                <button type="submit" className="search-submit"><i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i> {count}개 방 보기</button>
            </div>
            <div className="search-extra">
                <button type="button" className="link-button" aria-expanded={advanced} onClick={() => setAdvanced(!advanced)}>
                    <i className="fa-solid fa-sliders" aria-hidden="true"></i> 상세 검색{filters.options.length > 0 && ` (${filters.options.length})`}
                </button>
                <label className="switch">
                    <input type="checkbox" role="switch" checked={filters.includeFee} onChange={(e) => onChange({ includeFee: e.target.checked })} />
                    관리비 포함 금액으로 보기
                </label>
                <button type="button" className="link-button" onClick={onReset}>초기화</button>
            </div>
            {advanced && (
                <fieldset className="search-options">
                    <legend>선택한 옵션을 모두 갖춘 방</legend>
                    {OPTIONS.map((o) => (
                        <label key={o}><input type="checkbox" checked={filters.options.includes(o)} onChange={() => toggleOption(o)} /> {o}</label>
                    ))}
                </fieldset>
            )}
        </form>
    );
}

export default SearchBar;
