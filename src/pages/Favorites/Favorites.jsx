import { Link } from 'react-router-dom';
import './Favorites.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Locations from '../../components/Locations/Locations';
import { useFavorites } from '../../utils/favorites';
import { rooms } from '../../utils/rooms';

function Favorites() {
    const { ids } = useFavorites();
    const list = rooms.filter((r) => ids.includes(r.id));

    return (
        <div className="App-page">
            <header><Navbar /></header>
            <main>
                <h1 className="title">찜한 방 <strong>{list.length}개</strong></h1>
                <p className="lead">찜 목록은 이 브라우저에만 저장됩니다.</p>
                {list.length > 0
                    ? <Locations rooms={list} />
                    : <div className="favorites-empty"><p>아직 찜한 방이 없습니다.</p><Link className="pill" to="/">방 둘러보기</Link></div>}
            </main>
            <Footer />
        </div>
    );
}

export default Favorites;
