import { useState } from 'react';
import './Closing.css';
import Reveal from '../Reveal/Reveal';
import { ISSUES_URL } from '../../utils/links';
import { prefersReducedMotion } from '../../utils/motion';
import { uiImage } from '../../utils/images';

function Closing() {
    const [failed, setFailed] = useState(false);
    return (
        <section className="closing" style={uiImage('closing', '#3b4560', '#14131a')}>
            {!failed && !prefersReducedMotion() && (
                <video autoPlay loop muted playsInline preload="none" aria-hidden="true" poster="/images/ui/closing.jpg" src="/videos/closing.mp4" onError={() => setFailed(true)} />
            )}
            <div className="closing-shade"></div>
            <Reveal className="closing-content">
                <h2><span>다음 방,</span><strong>같이 찾아봐요.</strong></h2>
                <p>궁금한 점이나 개선 아이디어를 남겨 주세요.</p>
                <a className="pill" href={ISSUES_URL} target="_blank" rel="noreferrer">문의하기</a>
            </Reveal>
        </section>
    );
}

export default Closing;
