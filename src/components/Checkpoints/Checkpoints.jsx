import { useState } from 'react';
import './Checkpoints.css';
import Reveal from '../Reveal/Reveal';
import { uiImage } from '../../utils/images';

// x, y: services.jpg 위의 버튼 위치(%)
const POINTS = [
    { id: 'deposit', label: '보증금', icon: 'fa-won-sign', x: 44, y: 44, title: '돌려받을 돈인가요?', text: '계약 전에 등기부등본으로 소유자와 근저당 등 앞선 권리를 확인하세요. 보증금을 돌려받는 조건과 시점도 계약서에 적어 둡니다.' },
    { id: 'fee', label: '관리비', icon: 'fa-receipt', x: 44, y: 11, title: '무엇이 포함되나요?', text: '수도, 전기, 가스, 인터넷, 청소비 중 무엇이 관리비에 들어가는지 확인하세요. 따로 내는 항목이 있으면 월 부담이 달라집니다.' },
    { id: 'option', label: '옵션', icon: 'fa-plug', x: 22, y: 68, title: '직접 작동해 보세요', text: '에어컨, 세탁기, 냉장고, 보일러를 켜 보고 고장이나 흠집은 사진으로 남겨 두면 퇴실할 때 다툼을 줄일 수 있습니다.' },
    { id: 'contract', label: '계약서', icon: 'fa-file-signature', x: 66, y: 55, title: '서명 전에 읽기', text: '계약 상대가 소유자 본인인지, 계약 기간, 중도 해지, 수리 책임, 특약 내용을 확인하세요.' },
    { id: 'date', label: '확정일자', icon: 'fa-stamp', x: 78, y: 34, title: '전입신고와 함께', text: '이사한 뒤 전입신고를 하고 확정일자를 받아 두세요. 보증금을 보호받는 데 필요한 절차입니다.' },
];

function Checkpoints() {
    const [active, setActive] = useState(POINTS[0].id);
    const point = POINTS.find((p) => p.id === active);

    return (
        <section className="section">
            <div className="wrap">
                <Reveal>
                    <p className="eyebrow">계약 체크 포인트</p>
                    <h2 className="title">방을 계약하기 전,<strong>이 다섯 가지만은 꼭.</strong></h2>
                </Reveal>
                <Reveal className="checkpoint-stage">
                    <div className="checkpoint-photo" style={uiImage('services', '#cbb59a', '#6f5e4e')}>
                        {POINTS.map((p) => (
                            <button type="button" key={p.id} className={p.id === active ? 'hotspot active' : 'hotspot'} aria-pressed={p.id === active}
                                style={{ left: `${p.x}%`, top: `${p.y}%` }} onClick={() => setActive(p.id)}>
                                <i className={`fa-solid ${p.icon}`} aria-hidden="true"></i><span>{p.label}</span>
                            </button>
                        ))}
                    </div>
                    <div className="checkpoint-card" aria-live="polite">
                        <p className="eyebrow">{point.label}</p>
                        <h3>{point.title}</h3>
                        <p>{point.text}</p>
                        <small>일반 안내이며 법률 자문이 아닙니다.</small>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default Checkpoints;
