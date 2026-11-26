import { StrictMode } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Lodgement from '../pages/Lodgement/Lodgement';
import Error404 from '../pages/Page404/Page404';
import Error from '../pages/Error/Error';
import MapPage from '../pages/MapPage/MapPage';

function RooterComponent() {
    return (
        <StrictMode>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} name="홈" errorElement={<Error />} />
                    <Route path="/map" element={<MapPage />} name="지도" errorElement={<Error />} />
                    <Route path="/about" element={<About />} name="소개" errorElement={<Error />} />
                    <Route path="/lodgement/:id" element={<Lodgement />} name="상세" errorElement={<Error />} />
                    <Route path="/error" element={<Error />} name="500" errorElement={<Error />} />
                    <Route path="*" element={<Error404 />} name="404" errorElement={<Error />} />
                </Routes>
            </Router>
        </StrictMode>
    );
};

export default RooterComponent;