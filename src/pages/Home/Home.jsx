import './Home.scss';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Banner/Banner';
import Locations from '../../components/Locations/Locations';
import Footer from '../../components/Footer/Footer';
import RegionFilter from '../../components/RegionFilter/RegionFilter';
import MapIcon from '../../components/MapIcon/MapIcon';
import { useZoneFilter } from '../../utils/rooms';

import HomeBannerBackground from '../../assets/img/home_banner.png';

function Home() {
    const { selectedZones, setSelectedZones, filteredRooms } = useZoneFilter();

    return (
        <div className="App-page">
            <header>
                <Navbar />
                <Banner backgroundImage={HomeBannerBackground} textTitle="대학가 자취방, 한눈에 비교하세요" />
            </header>
            <main>
                <div className="home-toolbar">
                    <RegionFilter selectedZones={selectedZones} onChange={setSelectedZones} />
                    <MapIcon />
                </div>
                <p className="home-count">{filteredRooms.length}개의 방 · 금액 단위: 만원</p>
                <Locations rooms={filteredRooms} />
            </main>
            <Footer />
        </div>
    );
}

export default Home;
