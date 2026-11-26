import { useRef, useState } from 'react';
import './Hero.css';
import { prefersReducedMotion } from '../../utils/motion';
import { uiImage } from '../../utils/images';

function Hero({ children }) {
    const video = useRef(null);
    const [paused, setPaused] = useState(false);
    const [failed, setFailed] = useState(false);
    const showVideo = !prefersReducedMotion() && !failed;

    const togglePlay = () => {
        if (paused) video.current?.play()?.catch?.(() => {});
        else video.current?.pause();
        setPaused(!paused);
    };

    return (
        <section className="hero" style={uiImage('hero', '#6b5a4a', '#1f1e1c')}>
            {showVideo && (
                <video ref={video} className="hero-video" autoPlay loop muted playsInline aria-hidden="true"
                    poster="/images/ui/hero.jpg" src="/videos/hero.mp4" onError={() => setFailed(true)} />
            )}
            <div className="hero-shade"></div>
            <div className="hero-content wrap">
                <h1><span>내 하루가 시작되는 곳,</span><strong>자취방은 Homez</strong></h1>
                <p>보증금, 월세, 관리비를 한눈에. 한동대 인근의 방을 조건에 맞춰 비교해 보세요.</p>
                {children}
            </div>
            <span className="badge hero-credit">AI 생성 예시 영상</span>
            {showVideo && (
                <button type="button" className="hero-toggle" onClick={togglePlay} aria-label={paused ? '배경 영상 재생' : '배경 영상 정지'}>
                    <i className={`fa-solid ${paused ? 'fa-play' : 'fa-pause'}`} aria-hidden="true"></i>
                </button>
            )}
        </section>
    );
}

export default Hero;
