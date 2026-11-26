import { useState } from 'react';
import './Compare.css';
import Reveal from '../Reveal/Reveal';
import { ZONES, zoneAverages } from '../../utils/rooms';
import { uiImage } from '../../utils/images';

function Compare() {
    const [position, setPosition] = useState(38);
    const [zone, setZone] = useState(ZONES[0]);
    const avg = zoneAverages(zone);

    return (
        <section className="section">
            <div className="wrap compare">
                <Reveal>
                    <p className="eyebrow">계약 전에 확인</p>
                    <h2 className="title">사진만 보지 말고<strong>시세부터 확인하세요.</strong></h2>
                    <p className="lead">손잡이를 움직이면 방 사진 뒤에 권역별 평균 금액이 나타납니다.</p>
                    <div className="compare-zones" role="group" aria-label="비교할 권역">
                        {ZONES.map((z) => <button type="button" key={z} className={z === zone ? 'pill' : 'pill ghost'} aria-pressed={z === zone} onClick={() => setZone(z)}>{z}</button>)}
                    </div>
                </Reveal>
                <Reveal className="compare-frame">
                    <div className="compare-data" style={uiImage('compare', '#d9c7b0', '#8c7763')}>
                        <div className="compare-card">
                            <span className="badge">예시 데이터 기준</span>
                            <h3>{zone} 평균</h3>
                            <dl>
                                <div><dt>보증금</dt><dd>{avg.deposit}만원</dd></div>
                                <div><dt>월세</dt><dd>{avg.monthlyRent}만원</dd></div>
                                <div><dt>관리비</dt><dd>{avg.maintenanceFee}만원</dd></div>
                            </dl>
                            <p>예시 매물 {avg.count}건의 평균이며 실제 시세가 아닙니다.</p>
                        </div>
                    </div>
                    <div className="compare-photo" style={{ ...uiImage('compare', '#d9c7b0', '#8c7763'), clipPath: `inset(0 ${100 - position}% 0 0)` }}></div>
                    <div className="compare-handle" style={{ left: `${position}%` }} aria-hidden="true"><i className="fa-solid fa-left-right"></i></div>
                    <input type="range" min="0" max="100" value={position} aria-label="사진과 평균 금액 비교" onChange={(e) => setPosition(Number(e.target.value))} />
                </Reveal>
            </div>
        </section>
    );
}

export default Compare;
