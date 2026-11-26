import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo-white.svg';
import './Footer.css';
import { ZONES } from '../../utils/rooms';
import { ISSUES_URL, REPO_URL } from '../../utils/links';

function Footer() {
    return (
        <footer className="site-footer">
            <div className="wrap footer-grid">
                <div>
                    <img src={logo} alt="Homez" width="140" />
                    <p>대학가 자취방을 한눈에 비교하는<br />학생 팀 프로젝트</p>
                </div>
                <div>
                    <h2>둘러보기</h2>
                    <Link to="/">전체 방</Link><Link to="/map">지도</Link><Link to="/favorites">찜한 방</Link>
                </div>
                <div>
                    <h2>지역</h2>
                    {ZONES.map((z) => <Link key={z} to={`/?zone=${encodeURIComponent(z)}`}>{z}</Link>)}
                </div>
                <div>
                    <h2>팀 구해줘 홈즈</h2>
                    <Link to="/about">소개</Link>
                    <a href={REPO_URL} target="_blank" rel="noreferrer">GitHub</a>
                    <a href={ISSUES_URL} target="_blank" rel="noreferrer">문의하기</a>
                </div>
            </div>
            <p className="wrap copyright">© 2026 구해줘 홈즈 · Based on Kasa (MIT) · 매물·후기는 예시이며 배경 영상과 사진은 AI 생성 이미지입니다.</p>
        </footer>
    );
}

export default Footer;
