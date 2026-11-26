import './Support.css';
import { ISSUES_URL } from '../../utils/links';

function Support() {
    return (
        <a className="support" href={ISSUES_URL} target="_blank" rel="noreferrer">
            <i className="fa-regular fa-comment-dots" aria-hidden="true"></i>
            <span><b>문의하기</b>GitHub 이슈로 연결</span>
        </a>
    );
}

export default Support;
