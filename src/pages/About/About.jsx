import { Component } from 'react';
import './About.scss';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Banner/Banner';
import Collapse from '../../components/Collapse/Collapse';
import Footer from '../../components/Footer/Footer';

import AboutBannerBackground from '../../assets/img/about_banner.png';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="App-page">
                <header>
                    <Navbar></Navbar>
                    <Banner backgroundImage={AboutBannerBackground} textTitle={''}></Banner>
                </header>
                <main>
                    <div className="App-collapses-container">
                        <Collapse title={'서비스 소개'} text={'한동대 인근 자취방의 보증금, 월세, 관리비를 한눈에 비교하는 학생 팀 프로젝트입니다.'}></Collapse>
                        <Collapse title={'지역 필터'} text={'원하는 권역을 여러 개 골라 비교할 수 있습니다.'}></Collapse>
                        <Collapse title={'지도 탐색'} text={'지도에서 방의 위치를 확인하고 상세 페이지로 이동할 수 있습니다.'}></Collapse>
                        <Collapse title={'주의'} text={'표시되는 매물은 과제용 예시 데이터이며 실제 매물이 아닙니다.'}></Collapse>
                    </div>
                </main>
                <Footer></Footer>
            </div>
        );
    }
}

export default About;
