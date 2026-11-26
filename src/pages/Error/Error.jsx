import './Error.scss';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function ErrorPage(props) {

    return (
        <div className="App-page">
            <header>
                <Navbar></Navbar>
            </header>
            <main>
                <div className="App-main-content">
                    <h1 className="App-main-page-title">500</h1>
                    <p className="App-main-page-subtitle">오류가 발생했습니다.</p>
                    <a className="App-main-page-back-button" href="/" >홈으로 돌아가기</a>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default ErrorPage;
