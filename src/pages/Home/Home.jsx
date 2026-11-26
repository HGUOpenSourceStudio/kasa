import { useRef } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Intro from '../../components/Intro/Intro';
import Hero from '../../components/Hero/Hero';
import SearchBar from '../../components/SearchBar/SearchBar';
import Locations from '../../components/Locations/Locations';
import Location from '../../components/Location/Location';
import MapIcon from '../../components/MapIcon/MapIcon';
import Reveal from '../../components/Reveal/Reveal';
import Compare from '../../components/Compare/Compare';
import ZoneMap from '../../components/ZoneMap/ZoneMap';
import Slider from '../../components/Slider/Slider';
import Checkpoints from '../../components/Checkpoints/Checkpoints';
import Reviews from '../../components/Reviews/Reviews';
import Closing from '../../components/Closing/Closing';
import Support from '../../components/Support/Support';
import { rooms, useRoomFilter } from '../../utils/rooms';
import { prefersReducedMotion } from '../../utils/motion';

const recommended = rooms.filter((r) => Number(r.rating) >= 4);
const newest = [...rooms].sort((a, b) => b.builtYear - a.builtYear).slice(0, 6);

function Home() {
    const { filters, setFilters, resetFilters, filteredRooms } = useRoomFilter();
    const results = useRef(null);
    const goToResults = () => results.current?.scrollIntoView?.({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    const chooseZone = (zone) => { setFilters({ zones: [zone] }); goToResults(); };

    return (
        <div className="home">
            <Intro />
            <Navbar overlay />
            <main>
                <Hero>
                    <SearchBar filters={filters} onChange={setFilters} onReset={resetFilters} onSearch={goToResults} count={filteredRooms.length} />
                </Hero>

                <section className="section results" ref={results} aria-label="검색 결과">
                    <div className="wrap">
                        <div className="section-head">
                            <div>
                                <p className="eyebrow">검색 결과</p>
                                <h2 className="title">조건에 맞는<strong>{filteredRooms.length}개의 방</strong></h2>
                                <p className="lead">금액 단위: 만원 · 모두 예시 매물입니다.</p>
                            </div>
                            <MapIcon />
                        </div>
                        {filteredRooms.length > 0
                            ? <Locations rooms={filteredRooms} includeFee={filters.includeFee} />
                            : (
                                <div className="empty">
                                    <p>조건에 맞는 방이 없습니다.</p>
                                    <button type="button" className="pill" onClick={resetFilters}>조건 초기화</button>
                                </div>
                            )}
                    </div>
                </section>

                <Compare />
                <ZoneMap onSelect={chooseZone} />

                <section className="section">
                    <div className="wrap">
                        <Reveal><p className="eyebrow">추천</p><h2 className="title">눈여겨볼<strong>추천 자취방</strong></h2></Reveal>
                        <Slider label="추천 자취방">
                            {recommended.map((r) => <Location key={r.id} logement={r} includeFee={filters.includeFee} />)}
                        </Slider>
                    </div>
                </section>

                <Checkpoints />

                <section className="section tint">
                    <div className="wrap">
                        <Reveal><p className="eyebrow">신축</p><h2 className="title">새로 지은<strong>깨끗한 방</strong></h2></Reveal>
                        <Slider label="신축 방">
                            {newest.map((r) => (
                                <div key={r.id}>
                                    <Location logement={r} includeFee={filters.includeFee} />
                                    <p className="built">{r.builtYear}년 준공 (예시) · {r.zone}</p>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </section>

                <Reviews />
                <Closing />
            </main>
            <Footer />
            <Support />
        </div>
    );
}

export default Home;
