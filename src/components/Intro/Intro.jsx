import { useEffect, useState } from 'react';
import './Intro.css';
import logoWhite from '../../assets/img/logo-white.svg';
import { prefersReducedMotion } from '../../utils/motion';

const KEY = 'homez:intro';

const seen = () => {
    try { return window.sessionStorage.getItem(KEY) === '1'; } catch { return true; }
};

// 브라우저 세션당 한 번, 1.5초. 클릭하면 건너뛴다.
function Intro() {
    const [show, setShow] = useState(() => !seen() && !prefersReducedMotion());

    useEffect(() => {
        if (!show) return undefined;
        const timer = setTimeout(() => setShow(false), 1500);
        return () => clearTimeout(timer);
    }, [show]);

    useEffect(() => {
        try { window.sessionStorage.setItem(KEY, '1'); } catch { /* 저장이 막혀도 동작 */ }
    }, []);

    if (!show) return null;
    return (
        <button type="button" className="intro" aria-label="인트로 건너뛰기" onClick={() => setShow(false)}>
            <img src={logoWhite} alt="Homez" />
            <span>대학가 자취방 탐색</span>
        </button>
    );
}

export default Intro;
