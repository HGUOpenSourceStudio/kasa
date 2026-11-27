import './Reviews.css';
import Reveal from '../Reveal/Reveal';
import Slider from '../Slider/Slider';

// 화면 구성을 보여주기 위한 가상 후기. 실제 사용자 후기가 아니다.
const REVIEWS = [
    ['예시 사용자 A', '권역을 골라 보니 비교가 한결 쉬웠어요.'],
    ['예시 사용자 B', '관리비 포함 금액으로 바꿔 보니 실제 부담이 보였습니다.'],
    ['예시 사용자 C', '지도에서 위치를 먼저 확인할 수 있어 좋았어요.'],
    ['예시 사용자 D', '찜해 둔 방을 룸메이트와 함께 다시 봤습니다.'],
    ['예시 사용자 E', '옵션으로 걸러 보는 기능이 편리했어요.'],
    ['예시 사용자 F', '계약 전에 확인할 것들을 한 번 더 챙겼습니다.'],
];

function Reviews() {
    return (
        <section className="section tint">
            <div className="wrap">
                <Reveal>
                    <p className="eyebrow">후기 (예시)</p>
                    <h2 className="title">이런 후기를<strong>듣고 싶어요</strong></h2>
                    <p className="lead">아래 후기는 화면 구성을 위한 가상 문구입니다.</p>
                </Reveal>
                <Slider label="예시 후기">
                    {REVIEWS.map(([name, text]) => (
                        <figure className="review" key={name}>
                            <span className="badge">예시</span>
                            <blockquote>{text}</blockquote>
                            <figcaption>{name}</figcaption>
                        </figure>
                    ))}
                </Slider>
            </div>
        </section>
    );
}

export default Reviews;
