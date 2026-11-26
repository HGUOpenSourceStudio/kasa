import { Component } from 'react';
import './Page404.scss';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

class Page404 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="App-page">
                <header>
                    <Navbar></Navbar>
                </header>
                <main>
                    <div className="App-main-content">
                        <h1 className="App-main-page-title">404</h1>
                        <p className="App-main-page-subtitle">페이지를 찾을 수 없습니다.</p>
                        <a className="App-main-page-back-button" href="/" >홈으로 돌아가기</a>
                    </div>
                </main>
                <Footer></Footer>
            </div>
        );
    }
}

export default Page404;
