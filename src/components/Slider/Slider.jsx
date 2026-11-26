import { useRef } from 'react';
import './Slider.css';

// scroll-snap 기반 가로 슬라이드. 손가락 스크롤과 버튼을 모두 지원한다.
function Slider({ label, children }) {
    const track = useRef(null);
    const move = (direction) => track.current?.scrollBy?.({ left: direction * track.current.clientWidth * 0.8, behavior: 'smooth' });

    return (
        <div className="slider">
            <div className="slider-buttons">
                <button type="button" aria-label={`${label} 이전`} onClick={() => move(-1)}><i className="fa-solid fa-arrow-left" aria-hidden="true"></i></button>
                <button type="button" aria-label={`${label} 다음`} onClick={() => move(1)}><i className="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
            </div>
            <div className="slider-track" ref={track} role="group" aria-label={label} tabIndex={0}>{children}</div>
        </div>
    );
}

export default Slider;
