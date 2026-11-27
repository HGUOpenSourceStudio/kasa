import { useState } from 'react';
import './ZoneMap.css';
import Reveal from '../Reveal/Reveal';
import { rooms, ZONES } from '../../utils/rooms';

// 실제 축척이 아닌 개략도. 좌표는 480x420 그림 기준.
const SPOTS = {
    '한동대 앞': { x: 170, y: 90, image: 'zone-handong', angle: -35, note: '캠퍼스까지 가까운 생활권' },
    '양덕동': { x: 245, y: 235, image: 'zone-yangdeok', angle: 15, note: '상가와 편의시설이 모인 주거지' },
    '장성동': { x: 205, y: 325, image: 'zone-jangseong', angle: 190, note: '비교적 저렴한 원룸이 있는 동네' },
};
const coast = (y) => 300 + Math.sin(y / 48) * 42 + (y > 280 ? (y - 280) * 0.35 : 0);
const DOTS = [];
for (let y = 12; y < 410; y += 11) {
    for (let x = 12; x < coast(y); x += 11) DOTS.push([x, y]);
}

function ZoneMap({ onSelect }) {
    const [zone, setZone] = useState(ZONES[0]);
    const spot = SPOTS[zone];
    const count = rooms.filter((r) => r.zone === zone).length;

    return (
        <section className="section tint">
            <div className="wrap zonemap">
                <Reveal>
                    <p className="eyebrow">우리가 다루는 동네</p>
                    <h2 className="title">포항에서<strong>내 생활권 고르기</strong></h2>
                    <p className="lead">세 권역 중 하나를 골라 방을 살펴보세요.</p>
                    <button type="button" className="zone-card" onClick={() => onSelect(zone)}
                        style={{ backgroundImage: `linear-gradient(180deg, transparent 40%, rgb(0 0 0 / .75)), url(/images/ui/${spot.image}.jpg), linear-gradient(135deg, #b9a48c, #5e5044)` }}>
                        <span className="badge">AI 생성 예시 이미지</span>
                        <span className="zone-card-text"><b>{zone}</b>{spot.note} · 방 {count}개</span>
                        <span className="zone-go" aria-hidden="true">↗</span>
                    </button>
                </Reveal>
                <Reveal className="zone-canvas">
                    <svg viewBox="0 0 480 420" aria-hidden="true">
                        {DOTS.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.1" />)}
                        <text x="410" y="200">영일만</text>
                    </svg>
                    {ZONES.map((z) => (
                        <button type="button" key={z} className={z === zone ? 'zone-pin active' : 'zone-pin'} aria-pressed={z === zone}
                            style={{ left: `${(SPOTS[z].x / 480) * 100}%`, top: `${(SPOTS[z].y / 420) * 100}%` }} onClick={() => setZone(z)}>{z}</button>
                    ))}
                    <div className="compass" aria-hidden="true"><span>N</span><i style={{ transform: `rotate(${spot.angle}deg)` }}></i></div>
                    <p className="zone-note">개략도이며 실제 위치·거리와 다릅니다.</p>
                </Reveal>
            </div>
        </section>
    );
}

export default ZoneMap;
